from pydantic import BaseModel


class NoteCreate(BaseModel):
    CustomerID: int | None = None
    LeadID: int | None = None
    DealID: int | None = None
    NoteText: str
    CreatedBy: int


class NoteUpdate(BaseModel):
    CustomerID: int | None = None
    LeadID: int | None = None
    DealID: int | None = None
    NoteText: str
    CreatedBy: int