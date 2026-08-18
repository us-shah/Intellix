from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user

from app.schemas.newsletter import (
    NewsletterCreate,
    NewsletterUpdate
)

from app.services.newsletter_service import (
    create_newsletter,
    get_newsletters,
    get_newsletter,
    update_newsletter,
    delete_newsletter
)

router = APIRouter(
    prefix="/newsletter",
    tags=["Newsletter"]
)


@router.post("/")
def add_newsletter(
    newsletter: NewsletterCreate,
    current_user=Depends(get_current_user)
):
    return create_newsletter(newsletter)


@router.get("/")
def all_newsletters(
    current_user=Depends(get_current_user)
):
    return get_newsletters()


@router.get("/{subscriber_id}")
def single_newsletter(
    subscriber_id: int,
    current_user=Depends(get_current_user)
):
    return get_newsletter(subscriber_id)


@router.put("/{subscriber_id}")
def edit_newsletter(
    subscriber_id: int,
    newsletter: NewsletterUpdate,
    current_user=Depends(get_current_user)
):
    return update_newsletter(subscriber_id, newsletter)


@router.delete("/{subscriber_id}")
def remove_newsletter(
    subscriber_id: int,
    current_user=Depends(get_current_user)
):
    return delete_newsletter(subscriber_id)