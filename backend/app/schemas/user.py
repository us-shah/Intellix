from pydantic import BaseModel, EmailStr
from typing import Optional


class UserRegister(BaseModel):
    FullName: str
    Email: EmailStr
    Phone: Optional[str] = None
    Password: str


class UserLogin(BaseModel):
    Email: EmailStr
    Password: str


class UserResponse(BaseModel):
    UserID: int
    FullName: str
    Email: EmailStr
    Phone: Optional[str]
    RoleID: int
    IsActive: bool

    class Config:
        from_attributes = True
    

class UserCreate(BaseModel):
    FullName: str
    Email: EmailStr
    Phone: Optional[str] = None
    Password: str
    RoleID: int


class UserUpdate(BaseModel):
    FullName: str
    Email: EmailStr
    Phone: Optional[str] = None
    RoleID: int
    IsActive: bool


class UserListResponse(BaseModel):
    UserID: int
    FullName: str
    Email: EmailStr
    Phone: Optional[str]
    RoleID: int
    IsActive: bool

    class Config:
        from_attributes = True