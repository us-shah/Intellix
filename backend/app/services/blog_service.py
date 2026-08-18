from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.blog import Blog
from app.schemas.blog import BlogCreate, BlogUpdate


def create_blog(data: BlogCreate):
    db: Session = SessionLocal()

    blog = Blog(**data.dict())

    db.add(blog)
    db.commit()
    db.refresh(blog)

    db.close()

    return blog


def get_blogs():
    db = SessionLocal()

    blogs = db.query(Blog).all()

    db.close()

    return blogs


def get_blog(blog_id: int):
    db = SessionLocal()

    blog = db.query(Blog).filter(
        Blog.BlogID == blog_id
    ).first()

    db.close()

    return blog


def update_blog(blog_id: int, data: BlogUpdate):
    db = SessionLocal()

    blog = db.query(Blog).filter(
        Blog.BlogID == blog_id
    ).first()

    if not blog:
        db.close()
        return {"message": "Blog not found"}

    for key, value in data.dict().items():
        setattr(blog, key, value)

    db.commit()
    db.refresh(blog)

    db.close()

    return blog


def delete_blog(blog_id: int):
    db = SessionLocal()

    blog = db.query(Blog).filter(
        Blog.BlogID == blog_id
    ).first()

    if not blog:
        db.close()
        return {"message": "Blog not found"}

    db.delete(blog)
    db.commit()

    db.close()

    return {"message": "Blog deleted successfully"}