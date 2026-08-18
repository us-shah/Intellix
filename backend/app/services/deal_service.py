from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.deal import Deal


def _payload(model, *, exclude_unset: bool = False):
    if hasattr(model, "model_dump"):
        return model.model_dump(exclude_unset=exclude_unset)
    return model.dict(exclude_unset=exclude_unset)


def _serialize(item: Deal):
    return {
        "DealID": item.DealID,
        "CustomerID": item.CustomerID,
        "Title": item.Title,
        "Amount": item.Amount,
        "Stage": item.Stage,
        "ExpectedDate": item.ExpectedDate,
        "AssignedTo": item.AssignedTo,
        "CreatedAt": item.CreatedAt,
    }


def create_deal(deal):
    db: Session = SessionLocal()
    try:
        item = Deal(**_payload(deal))
        db.add(item)
        db.commit()
        db.refresh(item)
        return {"message": "Deal created successfully", "DealID": item.DealID}
    finally:
        db.close()


def get_deals():
    db: Session = SessionLocal()
    try:
        return [_serialize(item) for item in db.query(Deal).order_by(Deal.DealID.desc()).all()]
    finally:
        db.close()


def get_deal(deal_id: int):
    db: Session = SessionLocal()
    try:
        item = db.get(Deal, deal_id)
        return _serialize(item) if item else {"message": "Deal not found"}
    finally:
        db.close()


def update_deal(deal_id: int, deal):
    db: Session = SessionLocal()
    try:
        item = db.get(Deal, deal_id)
        if item is None:
            return {"message": "Deal not found"}
        for key, value in _payload(deal, exclude_unset=True).items():
            setattr(item, key, value)
        db.commit()
        return {"message": "Deal updated successfully"}
    finally:
        db.close()


def delete_deal(deal_id: int):
    db: Session = SessionLocal()
    try:
        item = db.get(Deal, deal_id)
        if item is None:
            return {"message": "Deal not found"}
        db.delete(item)
        db.commit()
        return {"message": "Deal deleted successfully"}
    finally:
        db.close()
