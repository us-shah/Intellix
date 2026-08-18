from sqlalchemy.orm import Session

from app.models.activity_log import ActivityLog
from app.schemas.activity_log import ActivityLogCreate, ActivityLogUpdate


def create_activity(db: Session, activity: ActivityLogCreate):
    new_activity = ActivityLog(
        UserID=activity.UserID,
        Action=activity.Action,
        TableName=activity.TableName,
        RecordID=activity.RecordID
    )

    db.add(new_activity)
    db.commit()
    db.refresh(new_activity)

    return new_activity


def get_activities(db: Session):
    return db.query(ActivityLog).all()


def get_activity(db: Session, activity_id: int):
    return db.query(ActivityLog).filter(
        ActivityLog.ActivityID == activity_id
    ).first()


def update_activity(db: Session, activity_id: int, activity: ActivityLogUpdate):
    existing = db.query(ActivityLog).filter(
        ActivityLog.ActivityID == activity_id
    ).first()

    if not existing:
        return None

    existing.UserID = activity.UserID
    existing.Action = activity.Action
    existing.TableName = activity.TableName
    existing.RecordID = activity.RecordID

    db.commit()
    db.refresh(existing)

    return existing


def delete_activity(db: Session, activity_id: int):
    existing = db.query(ActivityLog).filter(
        ActivityLog.ActivityID == activity_id
    ).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Activity deleted successfully"}