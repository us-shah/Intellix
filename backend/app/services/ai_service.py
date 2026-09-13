import json
import os
import re

import httpx
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.enterprise import (
    AIConversation,
    AIMessage,
    KnowledgeChunk,
    KnowledgeDocument,
)


def split_text(text: str, chunk_size: int = 1200, overlap: int = 180) -> list[str]:
    clean = re.sub(r"\s+", " ", text).strip()
    if not clean:
        return []

    chunks: list[str] = []
    start = 0
    while start < len(clean):
        end = min(len(clean), start + chunk_size)
        if end < len(clean):
            boundary = clean.rfind(" ", start, end)
            if boundary > start + chunk_size // 2:
                end = boundary
        chunk = clean[start:end].strip()
        if chunk:
            chunks.append(chunk)
        if end >= len(clean):
            break
        start = max(start + 1, end - overlap)
    return chunks


def ingest_document(
    db: Session,
    title: str,
    content: str,
    source_type: str,
    source_url: str | None,
    organization_id: int | None,
    user_id: int | None,
):
    document = KnowledgeDocument(
        Title=title,
        Content=content,
        SourceType=source_type,
        SourceURL=source_url,
        OrganizationID=organization_id,
        CreatedBy=user_id,
    )
    db.add(document)
    db.flush()

    for index, chunk in enumerate(split_text(content)):
        db.add(
            KnowledgeChunk(
                KnowledgeDocumentID=document.KnowledgeDocumentID,
                OrganizationID=organization_id,
                ChunkIndex=index,
                Content=chunk,
                TokenEstimate=max(1, len(chunk) // 4),
            )
        )

    db.commit()
    db.refresh(document)
    return document


def _terms(query: str) -> list[str]:
    stop_words = {
        "the", "a", "an", "is", "are", "to", "of", "in", "for",
        "and", "or", "what", "how", "can", "i", "we", "tell", "me", "about",
    }
    terms = re.findall(r"[a-zA-Z0-9_]{3,}", query.lower())
    return [term for term in terms if term not in stop_words][:12]


def retrieve(db: Session, query: str, organization_id: int | None, top_k: int):
    terms = _terms(query)
    q = (
        db.query(KnowledgeChunk, KnowledgeDocument)
        .join(
            KnowledgeDocument,
            KnowledgeDocument.KnowledgeDocumentID == KnowledgeChunk.KnowledgeDocumentID,
        )
        .filter(KnowledgeDocument.IsActive == True)  # noqa: E712
    )

    if organization_id is not None:
        q = q.filter(
            or_(
                KnowledgeChunk.OrganizationID == organization_id,
                KnowledgeChunk.OrganizationID.is_(None),
            )
        )

    if terms:
        q = q.filter(
            or_(*[KnowledgeChunk.Content.ilike(f"%{term}%") for term in terms])
        )

    rows = q.limit(100).all()
    scored = []
    for chunk, document in rows:
        lower_content = (chunk.Content or "").lower()
        score = sum(lower_content.count(term) for term in terms)
        if score or not terms:
            scored.append((float(score), chunk, document))

    scored.sort(key=lambda item: item[0], reverse=True)
    return scored[:top_k]


async def _call_llm(question: str, context: str) -> tuple[str, str]:
    api_key = os.getenv("LLM_API_KEY", "").strip()
    base_url = os.getenv("LLM_BASE_URL", "https://api.openai.com/v1").strip().rstrip("/")
    model = os.getenv("LLM_MODEL", "gpt-4.1-mini").strip()

    if not api_key:
        return "", "local-rag"

    prompt = f"""
You are Intellix AI, the enterprise assistant for Intellix.
Use the supplied knowledge context when relevant.
Do not invent Intellix-specific facts.
If the context is insufficient, say so clearly.

KNOWLEDGE CONTEXT:
{context or "No relevant company knowledge found."}

USER QUESTION:
{question}
""".strip()

    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(60.0, connect=15.0)) as client:
            response = await client.post(
                f"{base_url}/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": model,
                    "messages": [
                        {"role": "system", "content": "You are Intellix AI, an enterprise assistant."},
                        {"role": "user", "content": prompt},
                    ],
                    "temperature": 0.2,
                },
            )

            if response.status_code >= 400:
                print("[INTELLIX AI] Provider error:", response.status_code, response.text[:1000])
                return "", "local-rag"

            data = response.json()
            choices = data.get("choices", [])
            if not choices:
                return "", "local-rag"

            answer = choices[0].get("message", {}).get("content", "").strip()
            return (answer, model) if answer else ("", "local-rag")

    except (httpx.TimeoutException, httpx.RequestError) as exc:
        print("[INTELLIX AI] Provider connection error:", str(exc))
        return "", "local-rag"
    except Exception as exc:
        print("[INTELLIX AI] Unexpected provider error:", repr(exc))
        return "", "local-rag"


async def answer_question(
    db: Session,
    question: str,
    user_id: int,
    organization_id: int | None,
    conversation_id: int | None,
    top_k: int,
):
    rows = retrieve(db, question, organization_id, top_k)

    sources = [
        {
            "document_id": document.KnowledgeDocumentID,
            "title": document.Title,
            "chunk_id": chunk.KnowledgeChunkID,
            "excerpt": chunk.Content[:400],
            "score": score,
        }
        for score, chunk, document in rows
    ]

    context = "\n\n".join(
        f"[SOURCE {index + 1}]\nTitle: {document.Title}\nContent: {chunk.Content}"
        for index, (_, chunk, document) in enumerate(rows)
    )

    answer, provider = await _call_llm(question, context)

    if not answer:
        provider = "local-rag"
        if rows:
            answer = "Based on the Intellix knowledge base:\n" + "\n".join(
                f"\n• {document.Title}: {chunk.Content[:700]}"
                for _, chunk, document in rows[:3]
            )
        else:
            answer = (
                "I could not find enough relevant information in the Intellix knowledge base. "
                "Please add more knowledge documents or configure an external LLM provider."
            )

    conversation = db.get(AIConversation, conversation_id) if conversation_id else None
    if conversation is not None and conversation.UserID != user_id:
        conversation = None

    if conversation is None:
        conversation = AIConversation(
            UserID=user_id,
            OrganizationID=organization_id,
            Title=question[:120],
        )
        db.add(conversation)
        db.flush()

    db.add(AIMessage(ConversationID=conversation.ConversationID, Role="user", Content=question))
    db.add(
        AIMessage(
            ConversationID=conversation.ConversationID,
            Role="assistant",
            Content=answer,
            SourcesJSON=json.dumps(sources, ensure_ascii=False),
        )
    )
    db.commit()

    return {
        "conversation_id": conversation.ConversationID,
        "answer": answer,
        "sources": sources,
        "provider": provider,
    }
