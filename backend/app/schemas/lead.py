from pydantic import BaseModel

class LeadCreate(BaseModel):
    FullName: str
    Email: str
    Phone: str
    Source: str
    Status: str


class LeadUpdate(BaseModel):
    FullName: str | None = None
    Email: str | None = None
    Phone: str | None = None
    Source: str | None = None
    Status: str | None = None