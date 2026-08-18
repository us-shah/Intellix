from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate


def create_contact(data: ContactCreate):
    db: Session = SessionLocal()

    contact = Contact(**data.dict())

    db.add(contact)
    db.commit()
    db.refresh(contact)

    db.close()

    return contact


def get_contacts():
    db = SessionLocal()

    contacts = db.query(Contact).all()

    db.close()

    return contacts


def get_contact(contact_id: int):
    db = SessionLocal()

    contact = db.query(Contact).filter(
        Contact.ContactID == contact_id
    ).first()

    db.close()

    return contact


def update_contact(contact_id: int, data: ContactUpdate):
    db = SessionLocal()

    contact = db.query(Contact).filter(
        Contact.ContactID == contact_id
    ).first()

    if not contact:
        db.close()
        return {"message": "Contact not found"}

    for key, value in data.dict().items():
        setattr(contact, key, value)

    db.commit()
    db.refresh(contact)

    db.close()

    return contact


def delete_contact(contact_id: int):
    db = SessionLocal()

    contact = db.query(Contact).filter(
        Contact.ContactID == contact_id
    ).first()

    if not contact:
        db.close()
        return {"message": "Contact not found"}

    db.delete(contact)
    db.commit()

    db.close()

    return {"message": "Contact deleted successfully"}