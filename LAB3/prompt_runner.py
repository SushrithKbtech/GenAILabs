import os
import textwrap
from dotenv import load_dotenv
from groq import Groq

# ----------------------------
# Setup
# ----------------------------
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY not found. Add it to your .env file.")

client = Groq(api_key=GROQ_API_KEY)

DEFAULT_MODEL = "llama-3.3-70b-versatile"


SYSTEM_PROMPT = """
You are Arjun Rao, a senior full-stack engineer and GenAI systems architect with 10+ years of production experience.

Core mindset:
- Correctness over cleverness
- Systems over snippets
- Explicit trade-offs over magic abstractions
- Production reality over demos

Rules:
- Never hallucinate APIs, citations, or benchmarks.
- If missing info, state assumptions explicitly.
- Think deeply internally; DO NOT reveal chain-of-thought.
- Instead provide: answer, concise reasoning summary, trade-offs, failure modes, production checklist.
""".strip()


# ----------------------------
# Prompt Patterns
# ----------------------------
REFINER_PROMPT = """
QUESTION REFINEMENT MODE:
1) Restate the problem in 1-2 lines.
2) Extract requirements (functional + non-functional).
3) Identify missing critical info (max 2 questions).
4) If user doesn't answer, proceed with explicit assumptions.

Return output in this exact format:
Restated problem:
Requirements:
Missing info (max 2 questions):
Assumptions (if needed):
RGC Prompt (final):
""".strip()


TEACH_AND_ASK_PROMPT = """
TEACH-AND-ASK MODE:
1) Provide 2-3 key options/facts that affect the design.
2) Ask 1-2 targeted questions that decide the correct choice.
3) Give a default recommendation if unanswered, with assumptions.

Output:
Key options:
Default recommendation:
Questions (max 2):
""".strip()


VERIFIER_PROMPT = """
COGNITIVE VERIFIER MODE:
Check the answer for:
1) Requirement coverage
2) Incorrect claims / missing assumptions
3) Security risks
4) Edge cases (at least 3)
5) Scalability/performance risks
6) Test plan adequacy

Output ONLY:
Verifier Notes:
- ...
Fix Suggestions:
- ...
""".strip()


REASONING_VISIBILITY_PROMPT = """
REASONING VISIBILITY MODE (no chain-of-thought):
Do NOT show hidden step-by-step reasoning.

Instead output:
- Key reasoning summary (3-6 bullets)
- Decision checklist
- Verification plan

Then provide final answer in this format:
Answer:
Reasoning Summary:
Trade-offs:
Failure Modes:
Production Checklist:
""".strip()


TABULAR_INSTRUCTION = """
Also include a comparison table with columns:
Option | Complexity | Latency | Cost | Dev Time | Failure Modes | Best When
Then recommend one option.
""".strip()


FILL_IN_THE_BLANK = """
FILL-IN-THE-BLANK REQUEST TEMPLATE:

TASK: ________
STACK: ________
SCALE (MAU/QPS): ________
LATENCY TARGET: ________
COST SENSITIVE? (yes/no): ________
SECURITY/COMPLIANCE: ________
DATA SOURCES: ________
NON-GOALS: ________

OUTPUT REQUIRED: ________
""".strip()


# ----------------------------
# Groq call helper
# ----------------------------
def ask_groq(prompt: str, model: str = DEFAULT_MODEL, temperature: float = 0.2) -> str:
    """Single chat completion call."""
    resp = client.chat.completions.create(
        model=model,
        temperature=temperature,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
    )
    return resp.choices[0].message.content


# ----------------------------
# Prompting modes: zero / one / few
# ----------------------------
def zero_shot(task: str) -> str:
    return f"{REASONING_VISIBILITY_PROMPT}\n\nTask:\n{task}".strip()


def one_shot(task: str) -> str:
    return f"""
You will follow the style of this example.

EXAMPLE INPUT:
Design an auth system for a SaaS app.
Constraints: 100k MAU, React + Node + Postgres, SOC2-lite.

EXAMPLE OUTPUT:
Answer:
Use session cookies with rotating refresh tokens, server-side session store, and RBAC.
Reasoning Summary:
Cookies reduce token leakage; server-side sessions allow revocation; rotation limits exposure.
Trade-offs:
More infrastructure than pure JWT; better security.
Failure Modes:
CSRF if not protected; session store outages.
Production Checklist:
Secure cookie flags, CSRF tokens, rotation, audit logs, alerts.

NOW DO THIS TASK:
{task}

Use the same output format.
""".strip()


def few_shot(task: str) -> str:
    return f"""
Follow the format and rigor of these examples.

EXAMPLE 1 INPUT:
Review adding caching to an API.
EXAMPLE 1 OUTPUT:
Answer:
Cache GET endpoints with TTL and explicit invalidation.
Reasoning Summary:
High hit-rate reduces DB load.
Trade-offs:
Potential staleness.
Failure Modes:
Stampede, stale reads.
Production Checklist:
Locking, metrics, fallback.

EXAMPLE 2 INPUT:
Design file upload pipeline.
EXAMPLE 2 OUTPUT:
Answer:
Signed URLs + async processing + virus scanning.
Reasoning Summary:
Offload bandwidth; isolate processing.
Trade-offs:
More components.
Failure Modes:
Orphan files, backlog.
Production Checklist:
Retries, DLQ, quotas, alerts.

NOW DO THIS TASK:
{task}

Use the same output format.
""".strip()


# ----------------------------
# Pretty printing
# ----------------------------
def print_section(title: str, content: str):
    print("\n" + "=" * 72)
    print(title)
    print("=" * 72)
    print(content.strip() + "\n")


# ----------------------------
# Main workflow
# ----------------------------
def run_pipeline(
    raw_request: str,
    refine: bool = True,
    teach_ask: bool = True,
    include_table: bool = True,
    verify: bool = True,
    mode: str = "few",
    model: str = DEFAULT_MODEL,
):
    results = {"refined": None, "teach_ask": None, "answer": None, "verifier": None}

    # Step 1: Refine
    task_for_answer = raw_request
    if refine:
        refined = ask_groq(f"{REFINER_PROMPT}\n\nUser request:\n{raw_request}", model=model, temperature=0.1)
        results["refined"] = refined
        task_for_answer = refined

    # Step 2: Teach + Ask
    if teach_ask:
        teach = ask_groq(f"{TEACH_AND_ASK_PROMPT}\n\nContext:\n{task_for_answer}", model=model, temperature=0.2)
        results["teach_ask"] = teach

    # Step 3: Answer
    final_task = task_for_answer + ("\n\n" + TABULAR_INSTRUCTION if include_table else "")

    if mode == "one":
        prompt = one_shot(final_task)
    elif mode == "zero":
        prompt = zero_shot(final_task)
    else:
        prompt = few_shot(final_task)

    answer = ask_groq(prompt, model=model, temperature=0.2)
    results["answer"] = answer

    # Step 4: Verify
    if verify:
        verifier = ask_groq(f"{VERIFIER_PROMPT}\n\nAnswer to verify:\n{answer}", model=model, temperature=0.1)
        results["verifier"] = verifier

    return results


# ----------------------------
# Tiny CLI so you don't edit code
# ----------------------------
def main():
    print("\nGroq Prompt Runner (Refine → Teach/Ask → Answer → Verify)")
    print("-" * 60)
    raw = input("Paste your request (or press Enter for example): ").strip()
    if not raw:
        raw = "Build a RAG chatbot for my college ERP. It should answer student questions and cite sources."

    print("\nChoose prompting mode:")
    print("  1) zero-shot (fast)")
    print("  2) one-shot (format imitation)")
    print("  3) few-shot (strong steering)")
    choice = input("Enter 1/2/3 (default 3): ").strip() or "3"
    mode = {"1": "zero", "2": "one", "3": "few"}.get(choice, "few")

    out = run_pipeline(
        raw_request=raw,
        refine=True,
        teach_ask=True,
        include_table=True,
        verify=True,
        mode=mode,
        model=DEFAULT_MODEL,
    )

    if out["refined"]:
        print_section("REFINED SPEC", out["refined"])
    if out["teach_ask"]:
        print_section("TEACH + ASK", out["teach_ask"])
    print_section("ANSWER", out["answer"])
    if out["verifier"]:
        print_section("VERIFIER", out["verifier"])

    print("Done.")


if __name__ == "__main__":
    main()
