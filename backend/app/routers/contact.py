from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.schemas.contact import ContactCreate, ContactUpdate

from app.services.contact_service import (
    create_contact,
    get_contacts,
    get_contact,
    update_contact,
    delete_contact
)

router = APIRouter(
    prefix="/contacts",
    tags=["Contacts"]
)


@router.post("/")
def add_contact(
    contact: ContactCreate,
    current_user=Depends(get_current_user)
):
    return create_contact(contact)


@router.get("/")
def all_contacts(
    current_user=Depends(get_current_user)
):
    return get_contacts()


@router.get("/{contact_id}")
def single_contact(
    contact_id: int,
    current_user=Depends(get_current_user)
):
    return get_contact(contact_id)


@router.put("/{contact_id}")
def edit_contact(
    contact_id: int,
    contact: ContactUpdate,
    current_user=Depends(get_current_user)
):
    return update_contact(contact_id, contact)


@router.delete("/{contact_id}")
def remove_contact(
    contact_id: int,
    current_user=Depends(get_current_user)
):
    return delete_contact(contact_id)