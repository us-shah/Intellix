from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class SettingBase(BaseModel):
    SettingKey: str
    SettingValue: str
    Category: str
    Description: Optional[str] = None


class SettingCreate(SettingBase):
    pass


class SettingUpdate(BaseModel):
    SettingKey: Optional[str] = None
    SettingValue: Optional[str] = None
    Category: Optional[str] = None
    Description: Optional[str] = None


class SettingResponse(SettingBase):
    SettingID: int
    UpdatedAt: datetime

    class Config:
        from_attributes = True