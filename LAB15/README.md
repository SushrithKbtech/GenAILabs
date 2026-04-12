# LAB15: CoursePilot AI

`LAB15` is a course project built with **Streamlit** on the front end and **Llama on Groq** as the LLM backend.

The app is designed for students who want to:

- upload class notes or PDFs
- chat with their notes
- generate topic summaries
- create quizzes
- build an exam study plan

## Features

- Groq-hosted Llama integration using the OpenAI-compatible Groq API
- note-grounded Q&A with lightweight local retrieval
- summary generator for any topic or chapter
- quiz builder with adjustable difficulty and question type
- study planner based on exam date, topics, and weak areas
- sample course notes for quick demo without uploading files

## Project Structure

```text
LAB15/
|-- app.py
|-- groq_client.py
|-- rag_utils.py
|-- requirements.txt
|-- .env.example
|-- data/
|   `-- sample_course_notes.txt
`-- README.md
```

## Setup

1. Open a terminal in `LAB15`.
2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Create an environment file from `.env.example` or export the key directly:

```powershell
$env:GROQ_API_KEY="your_groq_api_key_here"
```

4. Run the Streamlit app:

```powershell
streamlit run app.py
```

## Suggested Demo Flow

1. Start the app and keep `Load sample course notes` enabled.
2. Click `Process Notes`.
3. Ask a question in the `Chat` tab such as `Explain overfitting and underfitting`.
4. Generate a summary for `Supervised Learning`.
5. Create a quiz on `Neural Networks`.
6. Build a study plan for your exam date.

## Notes

- Supported uploads: `.pdf`, `.txt`, `.md`, `.py`, `.csv`
- The retrieval layer is intentionally lightweight so the lab stays easy to run
- You can change the Groq model name in the sidebar if you want to test a different Llama model

## GitHub Steps

If this folder is not already in a git repository, initialize one from the repo root:

```powershell
git init
git add LAB15
git commit -m "Add LAB15 Groq Llama Streamlit course project"
```

Then create a GitHub repository and push:

```powershell
git branch -M main
git remote add origin https://github.com/<your-username>/GenAILabs-main.git
git push -u origin main
```
