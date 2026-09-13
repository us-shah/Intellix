from pydantic import BaseModel


class NotificationCreate(BaseModel):
    UserID: int
    Title: str
    Message: str
    IsRead: bool = False


class NotificationUpdate(BaseModel):
    UserID: int
    Title: str
    Message: str
    IsRead: bool