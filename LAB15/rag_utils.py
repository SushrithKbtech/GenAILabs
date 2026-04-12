import math
import re
from collections import Counter
from io import BytesIO
from pathlib import Path
from typing import Dict, Iterable, List, Sequence, Tuple

from pypdf import PdfReader


STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "how",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "that",
    "the",
    "this",
    "to",
    "was",
    "were",
    "what",
    "when",
    "where",
    "which",
    "who",
    "why",
    "with",
}


def normalize_text(text: str) -> str:
    text = text.replace("\r\n", "\n")
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def tokenize(text: str) -> List[str]:
    return [
        token
        for token in re.findall(r"[a-zA-Z0-9]+", text.lower())
        if token not in STOPWORDS and len(token) > 1
    ]


def chunk_text(text: str, chunk_size: int = 900, overlap: int = 150) -> List[str]:
    cleaned = normalize_text(text)
    if not cleaned:
        return []

    chunks: List[str] = []
    start = 0
    while start < len(cleaned):
        end = min(len(cleaned), start + chunk_size)
        slice_text = cleaned[start:end]
        if end < len(cleaned):
            last_break = max(slice_text.rfind("\n"), slice_text.rfind(". "), slice_text.rfind(" "))
            if last_break > chunk_size // 2:
                end = start + last_break + 1
                slice_text = cleaned[start:end]
        chunks.append(slice_text.strip())
        if end >= len(cleaned):
            break
        start = max(end - overlap, start + 1)

    return [chunk for chunk in chunks if chunk]


def extract_text_from_upload(uploaded_file) -> str:
    suffix = Path(uploaded_file.name).suffix.lower()
    raw = uploaded_file.getvalue()

    if suffix in {".txt", ".md", ".py", ".csv"}:
        return raw.decode("utf-8", errors="ignore")

    if suffix == ".pdf":
        reader = PdfReader(BytesIO(raw))
        pages = [page.extract_text() or "" for page in reader.pages]
        return "\n".join(pages)

    raise ValueError(f"Unsupported file format: {suffix or 'unknown'}")


def build_knowledge_base(documents: Sequence[Tuple[str, str]]) -> List[Dict[str, object]]:
    chunks: List[Dict[str, object]] = []
    for source_name, text in documents:
        for index, chunk in enumerate(chunk_text(text), start=1):
            token_counts = Counter(tokenize(chunk))
            chunks.append(
                {
                    "id": f"{Path(source_name).stem}-{index}",
                    "source": source_name,
                    "text": chunk,
                    "token_counts": token_counts,
                    "length": max(sum(token_counts.values()), 1),
                }
            )
    return chunks


def score_chunk(query_terms: Iterable[str], chunk: Dict[str, object], doc_freq: Dict[str, int], total_docs: int) -> float:
    token_counts: Counter = chunk["token_counts"]  # type: ignore[assignment]
    score = 0.0
    for term in query_terms:
        tf = token_counts.get(term, 0)
        if not tf:
            continue
        idf = math.log((total_docs + 1) / (1 + doc_freq.get(term, 0))) + 1
        score += (tf / chunk["length"]) * idf  # type: ignore[index]
    return score


def retrieve_relevant_chunks(query: str, chunks: Sequence[Dict[str, object]], top_k: int = 4) -> List[Dict[str, object]]:
    query_terms = tokenize(query)
    if not query_terms or not chunks:
        return []

    doc_freq: Dict[str, int] = {}
    for chunk in chunks:
        for token in set(chunk["token_counts"].keys()):  # type: ignore[index]
            doc_freq[token] = doc_freq.get(token, 0) + 1

    scored = []
    for chunk in chunks:
        score = score_chunk(query_terms, chunk, doc_freq, len(chunks))
        if score > 0:
            scored.append((score, chunk))

    scored.sort(key=lambda item: item[0], reverse=True)
    return [chunk for _, chunk in scored[:top_k]]


def summarize_sources(chunks: Sequence[Dict[str, object]]) -> str:
    if not chunks:
        return "No source material retrieved."

    lines = []
    for chunk in chunks:
        preview = chunk["text"][:240].strip().replace("\n", " ")
        if len(chunk["text"]) > 240:
            preview += "..."
        lines.append(f"- {chunk['id']} ({chunk['source']}): {preview}")
    return "\n".join(lines)
