from pydantic import BaseModel
from datetime import datetime


class MeetingCreate(BaseModel):
    CustomerID: int
    Title: str
    MeetingDate: datetime
    Location: str
    Description: str
    CreatedBy: int


class MeetingUpdate(BaseModel):
    CustomerID: int
    Title: str
    MeetingDate: datetime
    Location: str
    Description: str
    CreatedBy: int