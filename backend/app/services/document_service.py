from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.document import Document
from app.schemas.document import DocumentCreate, DocumentUpdate


def create_document(data: DocumentCreate):
    db: Session = SessionLocal()

    document = Document(**data.dict())

    db.add(document)
    db.commit()
    db.refresh(document)

    db.close()

    return document


def get_documents():
    db = SessionLocal()

    documents = db.query(Document).all()

    db.close()

    return documents


def get_document(document_id: int):
    db = SessionLocal()

    document = db.query(Document).filter(
        Document.DocumentID == document_id
    ).first()

    db.close()

    return document


def update_document(document_id: int, data: DocumentUpdate):
    db = SessionLocal()

    document = db.query(Document).filter(
        Document.DocumentID == document_id
    ).first()

    if not document:
        db.close()
        return {"message": "Document not found"}

    for key, value in data.dict().items():
        setattr(document, key, value)

    db.commit()
    db.refresh(document)

    db.close()

    return document


def delete_document(document_id: int):
    db = SessionLocal()

    document = db.query(Document).filter(
        Document.DocumentID == document_id
    ).first()

    if not document:
        db.close()
        return {"message": "Document not found"}

    db.delete(document)
    db.commit()

    db.close()

    return {"message": "Document deleted successfully"}