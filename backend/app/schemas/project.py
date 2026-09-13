from pydantic import BaseModel
from datetime import datetime


class ProjectBase(BaseModel):
    ProjectName: str
    Description: str
    CustomerID: int
    ManagerID: int
    Status: str
    StartDate: datetime
    EndDate: datetime


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    ProjectID: int
    CreatedAt: datetime

    class Config:
        from_attributes = True