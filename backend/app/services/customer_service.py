from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.schemas.customer import CustomerCreate, CustomerUpdate


def create_customer(db: Session, customer: CustomerCreate):
    new_customer = Customer(**customer.dict())

    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)

    return new_customer


def get_customers(db: Session):
    return db.query(Customer).all()


def get_customer(db: Session, customer_id: int):
    return (
        db.query(Customer)
        .filter(Customer.CustomerID == customer_id)
        .first()
    )


def update_customer(
    db: Session,
    customer_id: int,
    customer: CustomerUpdate
):
    existing = (
        db.query(Customer)
        .filter(Customer.CustomerID == customer_id)
        .first()
    )

    if not existing:
        return None

    for key, value in customer.dict(exclude_unset=True).items():
        setattr(existing, key, value)

    db.commit()
    db.refresh(existing)

    return existing


def delete_customer(
    db: Session,
    customer_id: int
):
    existing = (
        db.query(Customer)
        .filter(Customer.CustomerID == customer_id)
        .first()
    )

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Customer deleted successfully"}
    