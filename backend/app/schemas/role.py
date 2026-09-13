from pydantic import BaseModel
from datetime import datetime


class RoleBase(BaseModel):
    RoleName: str
    Description: str


class RoleCreate(RoleBase):
    pass


class RoleUpdate(RoleBase):
    pass


class RoleResponse(RoleBase):
    RoleID: int
    CreatedAt: datetime

    class Config:
        from_attributes = True