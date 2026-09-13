from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.core.database import Base


class Setting(Base):
    __tablename__ = "Settings"

    SettingID = Column(Integer, primary_key=True, index=True)

    SettingKey = Column(String(150), unique=True, nullable=False)

    SettingValue = Column(Text)

    Category = Column(String(100))

    Description = Column(String(300))

    UpdatedAt = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )