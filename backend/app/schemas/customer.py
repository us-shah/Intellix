from pydantic import BaseModel
from typing import Optional


class CustomerCreate(BaseModel):
    FirstName: str
    LastName: Optional[str] = None
    Email: Optional[str] = None
    Phone: Optional[str] = None
    Address: Optional[str] = None
    City: Optional[str] = None
    Country: Optional[str] = None
    CompanyID: Optional[int] = None


class CustomerUpdate(BaseModel):
    FirstName: Optional[str] = None
    LastName: Optional[str] = None
    Email: Optional[str] = None
    Phone: Optional[str] = None
    Address: Optional[str] = None
    City: Optional[str] = None
    Country: Optional[str] = None
    CompanyID: Optional[int] = None