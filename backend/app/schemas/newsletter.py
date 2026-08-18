from pydantic import BaseModel
from datetime import datetime


class NewsletterCreate(BaseModel):
    Email: str


class NewsletterUpdate(BaseModel):
    Email: str


class NewsletterResponse(BaseModel):
    SubscriberID: int
    Email: str
    CreatedAt: datetime

    class Config:
        from_attributes = True