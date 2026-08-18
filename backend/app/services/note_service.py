from sqlalchemy.orm import Session

from app.models.note import Note
from app.schemas.note import NoteCreate, NoteUpdate


def create_note(db: Session, note: NoteCreate):
    new_note = Note(
        CustomerID=note.CustomerID,
        LeadID=note.LeadID,
        DealID=note.DealID,
        NoteText=note.NoteText,
        CreatedBy=note.CreatedBy
    )

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return new_note


def get_notes(db: Session):
    return db.query(Note).all()


def get_note(db: Session, note_id: int):
    return db.query(Note).filter(Note.NoteID == note_id).first()


def update_note(db: Session, note_id: int, note: NoteUpdate):
    existing = db.query(Note).filter(Note.NoteID == note_id).first()

    if not existing:
        return None

    existing.CustomerID = note.CustomerID
    existing.LeadID = note.LeadID
    existing.DealID = note.DealID
    existing.NoteText = note.NoteText
    existing.CreatedBy = note.CreatedBy

    db.commit()
    db.refresh(existing)

    return existing


def delete_note(db: Session, note_id: int):
    existing = db.query(Note).filter(Note.NoteID == note_id).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Note deleted successfully"}