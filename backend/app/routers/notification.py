from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.schemas.notification import NotificationCreate, NotificationUpdate
from app.services.notification_service import (
    create_notification,
    get_notifications,
    get_notification,
    update_notification,
    delete_notification,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.post("/")
def add_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_notification(db, notification)


@router.get("/")
def all_notifications(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_notifications(db)


@router.get("/{notification_id}")
def single_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    notification = get_notification(db, notification_id)

    if notification is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return notification


@router.put("/{notification_id}")
def edit_notification(
    notification_id: int,
    notification: NotificationUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated = update_notification(db, notification_id, notification)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return updated


@router.delete("/{notification_id}")
def remove_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted = delete_notification(db, notification_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return deleted