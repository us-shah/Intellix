from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.schemas.customer import CustomerCreate, CustomerUpdate
from app.services.customer_service import (
    create_customer,
    get_customers,
    get_customer,
    update_customer,
    delete_customer,
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.post("/")
def add_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_customer(db, customer)


@router.get("/")
def all_customers(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_customers(db)


@router.get("/{customer_id}")
def single_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    customer = get_customer(db, customer_id)

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


@router.put("/{customer_id}")
def edit_customer(
    customer_id: int,
    customer: CustomerUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated = update_customer(db, customer_id, customer)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return updated


@router.delete("/{customer_id}")
def remove_customer(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted = delete_customer(db, customer_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return deleted