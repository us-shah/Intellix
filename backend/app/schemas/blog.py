from pydantic import BaseModel
from datetime import datetime


class BlogBase(BaseModel):
    Title: str
    Slug: str
    Summary: str
    Content: str
    Image: str
    Author: str
    Status: str = "Draft"


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BlogBase):
    pass


class BlogResponse(BlogBase):
    BlogID: int
    CreatedAt: datetime

    class Config:
        from_attributes = True