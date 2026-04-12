import os
from typing import Dict, List, Optional

import requests


GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"


class GroqAPIError(RuntimeError):
    """Raised when the Groq API returns an invalid or unsuccessful response."""


def load_api_key(user_supplied_key: Optional[str] = None) -> str:
    api_key = user_supplied_key or os.getenv("GROQ_API_KEY", "")
    if not api_key:
        raise GroqAPIError(
            "Missing Groq API key. Set GROQ_API_KEY in your environment or enter it in the app sidebar."
        )
    return api_key


def chat_completion(
    *,
    messages: List[Dict[str, str]],
    api_key: str,
    model: str,
    temperature: float = 0.3,
    max_tokens: int = 800,
    timeout: int = 60,
) -> str:
    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }
    response = requests.post(
        GROQ_API_URL,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=timeout,
    )

    if response.status_code != 200:
        detail = response.text.strip() or "No response body returned."
        raise GroqAPIError(f"Groq API request failed with status {response.status_code}: {detail}")

    data = response.json()
    choices = data.get("choices", [])
    if not choices:
        raise GroqAPIError("Groq API response did not contain any choices.")

    message = choices[0].get("message", {})
    content = message.get("content", "").strip()
    if not content:
        raise GroqAPIError("Groq API response was empty.")

    return content
