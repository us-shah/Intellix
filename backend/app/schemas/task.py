from pydantic import BaseModel
from datetime import datetime


class TaskCreate(BaseModel):
    Title: str
    Description: str
    AssignedTo: int
    Priority: str
    Status: str
    DueDate: datetime


class TaskUpdate(BaseModel):
    Title: str
    Description: str
    AssignedTo: int
    Priority: str
    Status: str
    DueDate: datetime