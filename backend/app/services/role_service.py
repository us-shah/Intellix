from sqlalchemy.orm import Session

from app.models.role import Role
from app.schemas.role import RoleCreate, RoleUpdate


def create_role(db: Session, role: RoleCreate):
    new_role = Role(
        RoleName=role.RoleName,
        Description=role.Description
    )

    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role


def get_roles(db: Session):
    return db.query(Role).all()


def get_role(db: Session, role_id: int):
    return db.query(Role).filter(Role.RoleID == role_id).first()


def update_role(db: Session, role_id: int, role: RoleUpdate):
    existing = db.query(Role).filter(Role.RoleID == role_id).first()

    if not existing:
        return None

    existing.RoleName = role.RoleName
    existing.Description = role.Description

    db.commit()
    db.refresh(existing)

    return existing


def delete_role(db: Session, role_id: int):
    existing = db.query(Role).filter(Role.RoleID == role_id).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Role deleted successfully"}