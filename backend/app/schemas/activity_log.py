from pydantic import BaseModel


class ActivityLogCreate(BaseModel):
    UserID: int
    Action: str
    TableName: str
    RecordID: int


class ActivityLogUpdate(BaseModel):
    UserID: int
    Action: str
    TableName: str
    RecordID: int