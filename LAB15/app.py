from datetime import date
from pathlib import Path
from typing import List, Tuple

import streamlit as st

from groq_client import GroqAPIError, chat_completion, load_api_key
from rag_utils import build_knowledge_base, extract_text_from_upload, retrieve_relevant_chunks, summarize_sources


APP_TITLE = "CoursePilot AI"
DEFAULT_MODEL = "llama-3.3-70b-versatile"
SYSTEM_PROMPT = """You are CoursePilot AI, a course project assistant built for students.
Use the provided study material whenever it exists.
If the answer is not supported by the uploaded notes, say that clearly before giving a best-effort general explanation.
Keep answers clear, accurate, and classroom-friendly."""


def initialize_state() -> None:
    st.session_state.setdefault("documents", [])
    st.session_state.setdefault("knowledge_base", [])
    st.session_state.setdefault("messages", [])
    st.session_state.setdefault("last_sources", [])


def load_sample_document() -> Tuple[str, str]:
    sample_path = Path(__file__).parent / "data" / "sample_course_notes.txt"
    return sample_path.name, sample_path.read_text(encoding="utf-8")


def reset_chat() -> None:
    st.session_state["messages"] = []
    st.session_state["last_sources"] = []


def ingest_documents(uploaded_files, include_sample: bool) -> None:
    documents: List[Tuple[str, str]] = []

    if include_sample:
        documents.append(load_sample_document())

    for uploaded_file in uploaded_files:
        text = extract_text_from_upload(uploaded_file)
        documents.append((uploaded_file.name, text))

    st.session_state["documents"] = documents
    st.session_state["knowledge_base"] = build_knowledge_base(documents)
    reset_chat()


def call_llm(prompt: str, api_key: str, model: str, temperature: float, max_tokens: int) -> str:
    return chat_completion(
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        api_key=api_key,
        model=model,
        temperature=temperature,
        max_tokens=max_tokens,
    )


def build_chat_prompt(question: str, context_chunks) -> str:
    context_text = "\n\n".join(
        f"[{chunk['id']} | {chunk['source']}]\n{chunk['text']}" for chunk in context_chunks
    )
    if not context_text:
        context_text = "No uploaded study materials were provided."

    return f"""Answer the student's question.

Student question:
{question}

Relevant study materials:
{context_text}

Instructions:
1. Answer in a helpful academic tone.
2. Mention when the answer comes from the notes versus general knowledge.
3. End with a short 'Key takeaway' line."""


def build_summary_prompt(topic: str, context_chunks, style: str) -> str:
    context_text = "\n\n".join(
        f"[{chunk['id']} | {chunk['source']}]\n{chunk['text']}" for chunk in context_chunks
    )
    return f"""Create a {style.lower()} summary for the topic below.

Topic:
{topic}

Study materials:
{context_text or 'No study materials were provided. Use general knowledge and say so clearly.'}

Requirements:
- Start with a 2-3 sentence overview.
- Add bullet points for the major concepts.
- End with three revision tips."""


def build_quiz_prompt(topic: str, context_chunks, count: int, difficulty: str, question_type: str) -> str:
    context_text = "\n\n".join(
        f"[{chunk['id']} | {chunk['source']}]\n{chunk['text']}" for chunk in context_chunks
    )
    return f"""Generate a {difficulty.lower()} quiz on the topic below.

Topic:
{topic}

Study materials:
{context_text or 'No study materials were provided. Use general knowledge and label that clearly.'}

Requirements:
- Create {count} {question_type.lower()} questions.
- After each question, provide the correct answer.
- Add a one-line explanation for each answer.
- Format everything as clean markdown."""


def build_planner_prompt(course_name: str, exam_date: date, daily_hours: float, topics: str, weak_areas: str) -> str:
    return f"""Create a practical exam study plan.

Course name: {course_name}
Exam date: {exam_date.isoformat()}
Available study time per day: {daily_hours} hours
Topics to cover:
{topics}

Weak areas:
{weak_areas or 'Not specified'}

Requirements:
- Provide a day-wise study plan from today until the exam.
- Prioritize weaker topics earlier and revisit them later.
- Include revision blocks, practice questions, and one rest buffer.
- End with an exam-week checklist."""


def sidebar() -> Tuple[str, str, float, int]:
    with st.sidebar:
        st.header("Configuration")
        user_key = st.text_input("Groq API Key", value="", type="password", help="Stored only for this session.")
        model = st.text_input("Groq Llama Model", value=DEFAULT_MODEL)
        temperature = st.slider("Temperature", min_value=0.0, max_value=1.0, value=0.3, step=0.1)
        max_tokens = st.slider("Max Output Tokens", min_value=200, max_value=1500, value=800, step=100)

        st.divider()
        st.subheader("Knowledge Base")
        include_sample = st.checkbox("Load sample course notes", value=True)
        uploaded_files = st.file_uploader(
            "Upload notes (.pdf, .txt, .md, .py, .csv)",
            type=["pdf", "txt", "md", "py", "csv"],
            accept_multiple_files=True,
        )

        if st.button("Process Notes", use_container_width=True):
            try:
                ingest_documents(uploaded_files or [], include_sample)
                st.success(
                    f"Indexed {len(st.session_state['documents'])} document(s) into "
                    f"{len(st.session_state['knowledge_base'])} chunks."
                )
            except Exception as exc:  # noqa: BLE001
                st.error(f"Failed to process notes: {exc}")

        if st.button("Clear Chat", use_container_width=True):
            reset_chat()

        doc_count = len(st.session_state["documents"])
        chunk_count = len(st.session_state["knowledge_base"])
        st.caption(f"Loaded documents: {doc_count}")
        st.caption(f"Indexed chunks: {chunk_count}")

    api_key = load_api_key(user_key)
    return api_key, model.strip(), temperature, max_tokens


def render_chat_tab(api_key: str, model: str, temperature: float, max_tokens: int) -> None:
    st.subheader("Chat with Notes")
    st.write("Ask questions about uploaded course material or use the sample notes for a quick demo.")

    for message in st.session_state["messages"]:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    question = st.chat_input("Ask a question about your course notes")
    if not question:
        return

    st.session_state["messages"].append({"role": "user", "content": question})
    with st.chat_message("user"):
        st.markdown(question)

    context_chunks = retrieve_relevant_chunks(question, st.session_state["knowledge_base"], top_k=4)
    prompt = build_chat_prompt(question, context_chunks)

    with st.chat_message("assistant"):
        try:
            with st.spinner("Generating answer with Groq Llama..."):
                answer = call_llm(prompt, api_key, model, temperature, max_tokens)
            st.markdown(answer)
            st.session_state["messages"].append({"role": "assistant", "content": answer})
            st.session_state["last_sources"] = context_chunks
        except GroqAPIError as exc:
            st.error(str(exc))

    if st.session_state["last_sources"]:
        with st.expander("Retrieved Sources", expanded=False):
            st.markdown(summarize_sources(st.session_state["last_sources"]))


def render_summary_tab(api_key: str, model: str, temperature: float, max_tokens: int) -> None:
    st.subheader("Smart Summary")
    topic = st.text_input("Topic or chapter name", value="Supervised Learning")
    style = st.selectbox("Summary Style", options=["Concise", "Detailed", "Revision"])

    if st.button("Generate Summary", use_container_width=True):
        context_chunks = retrieve_relevant_chunks(topic, st.session_state["knowledge_base"], top_k=5)
        prompt = build_summary_prompt(topic, context_chunks, style)
        try:
            with st.spinner("Building summary..."):
                response = call_llm(prompt, api_key, model, temperature, max_tokens)
            st.markdown(response)
            if context_chunks:
                with st.expander("Sources used"):
                    st.markdown(summarize_sources(context_chunks))
        except GroqAPIError as exc:
            st.error(str(exc))


def render_quiz_tab(api_key: str, model: str, temperature: float, max_tokens: int) -> None:
    st.subheader("Quiz Builder")
    topic = st.text_input("Quiz topic", value="Neural Networks", key="quiz_topic")
    count = st.slider("Number of Questions", min_value=3, max_value=10, value=5)
    difficulty = st.selectbox("Difficulty", options=["Beginner", "Intermediate", "Advanced"])
    question_type = st.selectbox("Question Type", options=["Multiple-choice", "Short-answer"])

    if st.button("Generate Quiz", use_container_width=True):
        context_chunks = retrieve_relevant_chunks(topic, st.session_state["knowledge_base"], top_k=5)
        prompt = build_quiz_prompt(topic, context_chunks, count, difficulty, question_type)
        try:
            with st.spinner("Creating quiz..."):
                response = call_llm(prompt, api_key, model, temperature, max_tokens)
            st.markdown(response)
            if context_chunks:
                with st.expander("Sources used"):
                    st.markdown(summarize_sources(context_chunks))
        except GroqAPIError as exc:
            st.error(str(exc))


def render_planner_tab(api_key: str, model: str, temperature: float, max_tokens: int) -> None:
    st.subheader("Study Planner")
    course_name = st.text_input("Course Name", value="Introduction to Machine Learning")
    exam_date = st.date_input("Exam Date", value=date.today())
    daily_hours = st.slider("Study Hours Per Day", min_value=0.5, max_value=8.0, value=2.0, step=0.5)
    topics = st.text_area(
        "Topics to Cover",
        value="Linear Regression\nDecision Trees\nModel Evaluation\nBias-Variance Tradeoff\nNeural Networks",
        height=150,
    )
    weak_areas = st.text_area("Weak Areas", value="Model evaluation metrics and backpropagation", height=100)

    if st.button("Generate Study Plan", use_container_width=True):
        prompt = build_planner_prompt(course_name, exam_date, daily_hours, topics, weak_areas)
        try:
            with st.spinner("Preparing study plan..."):
                response = call_llm(prompt, api_key, model, temperature, max_tokens)
            st.markdown(response)
        except GroqAPIError as exc:
            st.error(str(exc))


def main() -> None:
    st.set_page_config(page_title=APP_TITLE, page_icon=":mortar_board:", layout="wide")
    initialize_state()

    st.title(APP_TITLE)
    st.caption("Lab 15 course project: Groq-hosted Llama + Streamlit for note-grounded academic assistance.")

    try:
        api_key, model, temperature, max_tokens = sidebar()
    except GroqAPIError as exc:
        st.warning(str(exc))
        st.stop()

    tabs = st.tabs(["Chat", "Summary", "Quiz", "Study Planner"])
    with tabs[0]:
        render_chat_tab(api_key, model, temperature, max_tokens)
    with tabs[1]:
        render_summary_tab(api_key, model, temperature, max_tokens)
    with tabs[2]:
        render_quiz_tab(api_key, model, temperature, max_tokens)
    with tabs[3]:
        render_planner_tab(api_key, model, temperature, max_tokens)


if __name__ == "__main__":
    main()
