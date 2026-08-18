from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.lead import Lead


def _payload(model, *, exclude_unset: bool = False):
    if hasattr(model, "model_dump"):
        return model.model_dump(exclude_unset=exclude_unset)
    return model.dict(exclude_unset=exclude_unset)


def create_lead(lead):
    db: Session = SessionLocal()
    try:
        item = Lead(**_payload(lead))
        db.add(item)
        db.commit()
        db.refresh(item)
        return {"message": "Lead created successfully", "LeadID": item.LeadID}
    finally:
        db.close()


def get_leads():
    db: Session = SessionLocal()
    try:
        rows = db.query(Lead).order_by(Lead.LeadID.desc()).all()
        return [
            {
                "LeadID": item.LeadID,
                "FullName": item.FullName,
                "Email": item.Email,
                "Phone": item.Phone,
                "Source": item.Source,
                "Status": item.Status,
                "CompanyID": item.CompanyID,
                "AssignedTo": item.AssignedTo,
                "CreatedAt": item.CreatedAt,
            }
            for item in rows
        ]
    finally:
        db.close()


def get_lead(lead_id):
    db: Session = SessionLocal()
    try:
        item = db.get(Lead, lead_id)
        if item is None:
            return {"message": "Lead not found"}
        return {
            "LeadID": item.LeadID,
            "FullName": item.FullName,
            "Email": item.Email,
            "Phone": item.Phone,
            "Source": item.Source,
            "Status": item.Status,
            "CreatedAt": item.CreatedAt,
        }
    finally:
        db.close()


def update_lead(lead_id, lead):
    db: Session = SessionLocal()
    try:
        item = db.get(Lead, lead_id)
        if item is None:
            return {"message": "Lead not found"}
        data = _payload(lead, exclude_unset=True)
        if not data:
            return {"message": "Nothing to update"}
        for key, value in data.items():
            setattr(item, key, value)
        db.commit()
        return {"message": "Lead updated successfully"}
    finally:
        db.close()


def delete_lead(lead_id):
    db: Session = SessionLocal()
    try:
        item = db.get(Lead, lead_id)
        if item is None:
            return {"message": "Lead not found"}
        db.delete(item)
        db.commit()
        return {"message": "Lead deleted successfully"}
    finally:
        db.close()
