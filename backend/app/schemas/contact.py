from pydantic import BaseModel
from datetime import datetime


class ContactBase(BaseModel):
    FullName: str
    Email: str
    Phone: str
    Subject: str
    Message: str
    Status: str = "New"


class ContactCreate(ContactBase):
    pass


class ContactUpdate(ContactBase):
    pass


class ContactResponse(ContactBase):
    ContactID: int
    CreatedAt: datetime

    class Config:
        from_attributes = True