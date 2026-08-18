from pydantic import BaseModel


class CompanyCreate(BaseModel):
    CompanyName: str
    Industry: str
    Website: str
    Email: str
    Phone: str
    Address: str
    City: str
    Country: str


class CompanyUpdate(BaseModel):
    CompanyName: str
    Industry: str
    Website: str
    Email: str
    Phone: str
    Address: str
    City: str
    Country: str