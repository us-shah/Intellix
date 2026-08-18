from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class DealCreate(BaseModel):

    CustomerID: int

    Title: str

    Amount: float

    Stage: Optional[str] = "New"

    ExpectedDate: Optional[datetime] = None

    AssignedTo: Optional[int] = None


class DealUpdate(BaseModel):

    CustomerID: int

    Title: str

    Amount: float

    Stage: Optional[str] = None

    ExpectedDate: Optional[datetime] = None

    AssignedTo: Optional[int] = None