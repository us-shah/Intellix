from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.setting import Setting
from app.schemas.setting import (
    SettingCreate,
    SettingUpdate
)


def create_setting(data: SettingCreate):
    db: Session = SessionLocal()

    setting = Setting(**data.dict())

    db.add(setting)
    db.commit()
    db.refresh(setting)

    db.close()

    return setting


def get_settings():
    db = SessionLocal()

    settings = db.query(Setting).all()

    db.close()

    return settings


def get_setting(setting_id: int):
    db = SessionLocal()

    setting = db.query(Setting).filter(
        Setting.SettingID == setting_id
    ).first()

    db.close()

    return setting


def update_setting(setting_id: int, data: SettingUpdate):
    db = SessionLocal()

    setting = db.query(Setting).filter(
        Setting.SettingID == setting_id
    ).first()

    if not setting:
        db.close()
        return {"message": "Setting not found"}

    for key, value in data.dict().items():
        setattr(setting, key, value)

    db.commit()
    db.refresh(setting)

    db.close()

    return setting


def delete_setting(setting_id: int):
    db = SessionLocal()

    setting = db.query(Setting).filter(
        Setting.SettingID == setting_id
    ).first()

    if not setting:
        db.close()
        return {"message": "Setting not found"}

    db.delete(setting)
    db.commit()

    db.close()

    return {"message": "Setting deleted successfully"}