from sqlalchemy.orm import Session

from app.models.notification import Notification
from app.schemas.notification import NotificationCreate, NotificationUpdate


def create_notification(db: Session, notification: NotificationCreate):
    new_notification = Notification(
        UserID=notification.UserID,
        Title=notification.Title,
        Message=notification.Message,
        IsRead=notification.IsRead
    )

    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)

    return new_notification


def get_notifications(db: Session):
    return db.query(Notification).all()


def get_notification(db: Session, notification_id: int):
    return db.query(Notification).filter(
        Notification.NotificationID == notification_id
    ).first()


def update_notification(db: Session, notification_id: int, notification: NotificationUpdate):
    existing = db.query(Notification).filter(
        Notification.NotificationID == notification_id
    ).first()

    if not existing:
        return None

    existing.UserID = notification.UserID
    existing.Title = notification.Title
    existing.Message = notification.Message
    existing.IsRead = notification.IsRead

    db.commit()
    db.refresh(existing)

    return existing


def delete_notification(db: Session, notification_id: int):
    existing = db.query(Notification).filter(
        Notification.NotificationID == notification_id
    ).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Notification deleted successfully"}