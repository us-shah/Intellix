from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.auth.dependencies import get_current_user

from app.schemas.company import CompanyCreate, CompanyUpdate
from app.services.company_service import (
    create_company,
    get_companies,
    get_company,
    update_company,
    delete_company,
)

router = APIRouter(
    prefix="/companies",
    tags=["Companies"]
)
from app.models.company import Company

@router.get("/debug")
def debug_companies(db: Session = Depends(get_db)):
    companies = db.query(Company).all()

    return {
        "count": len(companies),
        "data": companies
    }

@router.post("/")
def add_company(
    company: CompanyCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_company(db, company)


@router.get("/")
def all_companies(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_companies(db)


@router.get("/{company_id}")
def single_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    company = get_company(db, company_id)

    if company is None:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    return company


@router.put("/{company_id}")
def edit_company(
    company_id: int,
    company: CompanyUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    updated = update_company(db, company_id, company)

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    return updated


@router.delete("/{company_id}")
def remove_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    deleted = delete_company(db, company_id)

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    return deleted
