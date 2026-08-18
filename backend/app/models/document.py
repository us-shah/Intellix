from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Document(Base):
    __tablename__ = "Documents"

    DocumentID = Column(Integer, primary_key=True, index=True)

    FileName = Column(String(255), nullable=False)

    OriginalName = Column(String(255), nullable=False)

    FileType = Column(String(100))

    FileSize = Column(Integer)

    FilePath = Column(String(500))

    UploadedBy = Column(Integer)

    CreatedAt = Column(DateTime, server_default=func.now())