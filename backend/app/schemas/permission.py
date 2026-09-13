from pydantic import BaseModel
from typing import Optional

class PermissionCreate(BaseModel):
    Code: str
    Name: str
    Description: Optional[str] = None

class PermissionResponse(PermissionCreate):
    PermissionID: int
    class Config:
        from_attributes = True

class RolePermissionAssign(BaseModel):
    PermissionIDs: list[int]
