from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.core.database import get_db
from app.models.enterprise import AIConversation, AIMessage, KnowledgeDocument
from app.schemas.ai import ChatRequest, ChatResponse, KnowledgeCreate
from app.services.ai_service import answer_question, ingest_document

router = APIRouter(prefix="/ai", tags=["AI & Knowledge"])

def uid(payload):
    value = payload.get("user_id")
    if value is None: raise HTTPException(401, "Token has no user_id")
    return int(value)

@router.get("/knowledge")
def list_knowledge(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return db.query(KnowledgeDocument).filter(KnowledgeDocument.IsActive == True).order_by(KnowledgeDocument.CreatedAt.desc()).all()  # noqa: E712

@router.post("/knowledge")
def add_knowledge(data: KnowledgeCreate, db: Session = Depends(get_db), current=Depends(get_current_user)):
    return ingest_document(db, data.Title, data.Content, data.SourceType, data.SourceURL, data.OrganizationID, uid(current))

@router.delete("/knowledge/{document_id}")
def delete_knowledge(document_id: int, db: Session = Depends(get_db), current=Depends(get_current_user)):
    item = db.get(KnowledgeDocument, document_id)
    if not item: raise HTTPException(404, "Knowledge document not found")
    item.IsActive = False; db.commit(); return {"success": True}

@router.post("/chat", response_model=ChatResponse)
async def chat(data: ChatRequest, db: Session = Depends(get_db), current=Depends(get_current_user)):
    return await answer_question(db, data.message, uid(current), data.organization_id, data.conversation_id, data.top_k)

@router.get("/conversations")
def conversations(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return db.query(AIConversation).filter(AIConversation.UserID == uid(current)).order_by(AIConversation.CreatedAt.desc()).all()

@router.get("/conversations/{conversation_id}/messages")
def messages(conversation_id: int, db: Session = Depends(get_db), current=Depends(get_current_user)):
    conversation = db.get(AIConversation, conversation_id)
    if not conversation or conversation.UserID != uid(current): raise HTTPException(404, "Conversation not found")
    return db.query(AIMessage).filter(AIMessage.ConversationID == conversation_id).order_by(AIMessage.MessageID).all()
