from typing import Optional
from pydantic import BaseModel, Field

class KnowledgeCreate(BaseModel):
    Title: str
    Content: str = Field(min_length=20)
    SourceType: str = "text"
    SourceURL: Optional[str] = None
    OrganizationID: Optional[int] = None

class ChatRequest(BaseModel):
    message: str = Field(min_length=2, max_length=8000)
    conversation_id: Optional[int] = None
    organization_id: Optional[int] = None
    top_k: int = Field(default=5, ge=1, le=12)

class ChatSource(BaseModel):
    document_id: int
    title: str
    chunk_id: int
    excerpt: str
    score: float

class ChatResponse(BaseModel):
    conversation_id: int
    answer: str
    sources: list[ChatSource]
    provider: str
