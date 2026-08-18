from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.schemas.meeting import MeetingCreate, MeetingUpdate
from app.services.meeting_service import (
    create_meeting,
    get_meetings,
    get_meeting,
    update_meeting,
    delete_meeting,
)

router = APIRouter(
    prefix="/meetings",
    tags=["Meetings"]
)


@router.post("/")
def add_meeting(
    meeting: MeetingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_meeting(db, meeting)


@router.get("/")
def all_meetings(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_meetings(db)


@router.get("/{meeting_id}")
def single_meeting(
    meeting_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    meeting = get_meeting(db, meeting_id)

    if meeting is None:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return meeting


@router.put("/{meeting_id}")
def edit_meeting(
    meeting_id: int,
    meeting: MeetingUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated = update_meeting(db, meeting_id, meeting)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return updated


@router.delete("/{meeting_id}")
def remove_meeting(
    meeting_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted = delete_meeting(db, meeting_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return deleted