from pydantic import BaseModel
from datetime import datetime


class JobBase(BaseModel):
    Title: str
    Department: str
    Location: str
    EmploymentType: str
    Salary: str
    Description: str
    Requirements: str
    Status: str = "Open"


class JobCreate(JobBase):
    pass


class JobUpdate(JobBase):
    pass


class JobResponse(JobBase):
    JobID: int
    CreatedAt: datetime

    class Config:
        from_attributes = True