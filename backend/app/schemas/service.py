from pydantic import BaseModel
from datetime import datetime


class ServiceBase(BaseModel):
    ServiceName: str
    Description: str
    Icon: str
    Status: str


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(ServiceBase):
    pass


class ServiceResponse(ServiceBase):
    ServiceID: int
    CreatedAt: datetime

    class Config:
        from_attributes = True