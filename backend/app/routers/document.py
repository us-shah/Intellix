from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user

from app.schemas.document import (
    DocumentCreate,
    DocumentUpdate
)

from app.services.document_service import (
    create_document,
    get_documents,
    get_document,
    update_document,
    delete_document
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post("/")
def add_document(
    document: DocumentCreate,
    current_user=Depends(get_current_user)
):
    return create_document(document)


@router.get("/")
def all_documents(
    current_user=Depends(get_current_user)
):
    return get_documents()


@router.get("/{document_id}")
def single_document(
    document_id: int,
    current_user=Depends(get_current_user)
):
    return get_document(document_id)


@router.put("/{document_id}")
def edit_document(
    document_id: int,
    document: DocumentUpdate,
    current_user=Depends(get_current_user)
):
    return update_document(document_id, document)


@router.delete("/{document_id}")
def remove_document(
    document_id: int,
    current_user=Depends(get_current_user)
):
    return delete_document(document_id)