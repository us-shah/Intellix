from pydantic import BaseModel, EmailStr
from typing import Optional

class StudentRegistration(BaseModel):
    FullName: str
    Email: EmailStr
    Phone: Optional[str] = None
    Password: str

class ClientRegistration(StudentRegistration):
    CompanyName: str
    Industry: Optional[str] = None
    Website: Optional[str] = None

class ProfileUpdate(BaseModel):
    FullName: str
    Phone: Optional[str] = None
