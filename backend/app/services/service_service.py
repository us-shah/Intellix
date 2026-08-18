from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceUpdate


def create_service(data: ServiceCreate):
    db: Session = SessionLocal()

    service = Service(**data.dict())

    db.add(service)
    db.commit()
    db.refresh(service)

    db.close()

    return service


def get_services():
    db = SessionLocal()

    services = db.query(Service).all()

    db.close()

    return services


def get_service(service_id: int):
    db = SessionLocal()

    service = db.query(Service).filter(
        Service.ServiceID == service_id
    ).first()

    db.close()

    return service


def update_service(service_id: int, data: ServiceUpdate):
    db = SessionLocal()

    service = db.query(Service).filter(
        Service.ServiceID == service_id
    ).first()

    if not service:
        db.close()
        return {"message": "Service not found"}

    for key, value in data.dict().items():
        setattr(service, key, value)

    db.commit()
    db.refresh(service)

    db.close()

    return service


def delete_service(service_id: int):
    db = SessionLocal()

    service = db.query(Service).filter(
        Service.ServiceID == service_id
    ).first()

    if not service:
        db.close()
        return {"message": "Service not found"}

    db.delete(service)
    db.commit()

    db.close()

    return {"message": "Service deleted successfully"}