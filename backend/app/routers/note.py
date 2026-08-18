from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.schemas.note import NoteCreate, NoteUpdate
from app.services.note_service import (
    create_note,
    get_notes,
    get_note,
    update_note,
    delete_note,
)

router = APIRouter(
    prefix="/notes",
    tags=["Notes"]
)


@router.post("/")
def add_note(
    note: NoteCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_note(db, note)


@router.get("/")
def all_notes(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_notes(db)


@router.get("/{note_id}")
def single_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    note = get_note(db, note_id)

    if note is None:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    return note


@router.put("/{note_id}")
def edit_note(
    note_id: int,
    note: NoteUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated = update_note(db, note_id, note)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    return updated


@router.delete("/{note_id}")
def remove_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted = delete_note(db, note_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Note not found"
        )

    return deleted