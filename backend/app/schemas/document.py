from pydantic import BaseModel
from datetime import datetime


class DocumentBase(BaseModel):
    FileName: str
    OriginalName: str
    FileType: str
    FileSize: int
    FilePath: str
    UploadedBy: int


class DocumentCreate(DocumentBase):
    pass


class DocumentUpdate(DocumentBase):
    pass


class DocumentResponse(DocumentBase):
    DocumentID: int
    CreatedAt: datetime

    class Config:
        from_attributes = True