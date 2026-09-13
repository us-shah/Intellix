from sqlalchemy.orm import Session

from app.models.company import Company
from app.schemas.company import CompanyCreate, CompanyUpdate


def create_company(db: Session, company: CompanyCreate):
    new_company = Company(
        CompanyName=company.CompanyName,
        Industry=company.Industry,
        Website=company.Website,
        Email=company.Email,
        Phone=company.Phone,
        Address=company.Address,
        City=company.City,
        Country=company.Country
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return new_company


def get_companies(db: Session):
    return db.query(Company).all()


def get_company(db: Session, company_id: int):
    return db.query(Company).filter(
        Company.CompanyID == company_id
    ).first()


def update_company(db: Session, company_id: int, company: CompanyUpdate):
    existing = db.query(Company).filter(
        Company.CompanyID == company_id
    ).first()

    if not existing:
        return None

    existing.CompanyName = company.CompanyName
    existing.Industry = company.Industry
    existing.Website = company.Website
    existing.Email = company.Email
    existing.Phone = company.Phone
    existing.Address = company.Address
    existing.City = company.City
    existing.Country = company.Country

    db.commit()
    db.refresh(existing)

    return existing


def delete_company(db: Session, company_id: int):
    existing = db.query(Company).filter(
        Company.CompanyID == company_id
    ).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Company deleted successfully"}