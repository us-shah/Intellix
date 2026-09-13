from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.newsletter import Newsletter
from app.schemas.newsletter import NewsletterCreate, NewsletterUpdate


def create_newsletter(data: NewsletterCreate):
    db: Session = SessionLocal()

    subscriber = Newsletter(**data.dict())

    db.add(subscriber)
    db.commit()
    db.refresh(subscriber)

    db.close()

    return subscriber


def get_newsletters():
    db = SessionLocal()

    data = db.query(Newsletter).all()

    db.close()

    return data


def get_newsletter(subscriber_id: int):
    db = SessionLocal()

    data = db.query(Newsletter).filter(
        Newsletter.SubscriberID == subscriber_id
    ).first()

    db.close()

    return data


def update_newsletter(subscriber_id: int, data: NewsletterUpdate):
    db = SessionLocal()

    subscriber = db.query(Newsletter).filter(
        Newsletter.SubscriberID == subscriber_id
    ).first()

    if not subscriber:
        db.close()
        return {"message": "Subscriber not found"}

    subscriber.Email = data.Email

    db.commit()
    db.refresh(subscriber)

    db.close()

    return subscriber


def delete_newsletter(subscriber_id: int):
    db = SessionLocal()

    subscriber = db.query(Newsletter).filter(
        Newsletter.SubscriberID == subscriber_id
    ).first()

    if not subscriber:
        db.close()
        return {"message": "Subscriber not found"}

    db.delete(subscriber)
    db.commit()

    db.close()

    return {"message": "Subscriber deleted successfully"}