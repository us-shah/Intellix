from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.schemas.activity_log import ActivityLogCreate, ActivityLogUpdate
from app.services.activity_log_service import (
    create_activity,
    get_activities,
    get_activity,
    update_activity,
    delete_activity,
)

router = APIRouter(
    prefix="/activity-logs",
    tags=["Activity Logs"]
)


@router.post("/")
def add_activity(
    activity: ActivityLogCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_activity(db, activity)


@router.get("/")
def all_activities(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_activities(db)


@router.get("/{activity_id}")
def single_activity(
    activity_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    activity = get_activity(db, activity_id)

    if activity is None:
        raise HTTPException(
            status_code=404,
            detail="Activity not found"
        )

    return activity


@router.put("/{activity_id}")
def edit_activity(
    activity_id: int,
    activity: ActivityLogUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated = update_activity(db, activity_id, activity)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Activity not found"
        )

    return updated


@router.delete("/{activity_id}")
def remove_activity(
    activity_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted = delete_activity(db, activity_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Activity not found"
        )

    return deleted