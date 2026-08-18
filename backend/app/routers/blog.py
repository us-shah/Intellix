from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user

from app.schemas.blog import BlogCreate, BlogUpdate

from app.services.blog_service import (
    create_blog,
    get_blogs,
    get_blog,
    update_blog,
    delete_blog
)

router = APIRouter(
    prefix="/blogs",
    tags=["Blogs"]
)


@router.post("/")
def add_blog(
    blog: BlogCreate,
    current_user=Depends(get_current_user)
):
    return create_blog(blog)


@router.get("/")
def all_blogs(
    current_user=Depends(get_current_user)
):
    return get_blogs()


@router.get("/{blog_id}")
def single_blog(
    blog_id: int,
    current_user=Depends(get_current_user)
):
    return get_blog(blog_id)


@router.put("/{blog_id}")
def edit_blog(
    blog_id: int,
    blog: BlogUpdate,
    current_user=Depends(get_current_user)
):
    return update_blog(blog_id, blog)


@router.delete("/{blog_id}")
def remove_blog(
    blog_id: int,
    current_user=Depends(get_current_user)
):
    return delete_blog(blog_id)