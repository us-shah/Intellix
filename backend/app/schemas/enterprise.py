from datetime import datetime
from decimal import Decimal
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field

class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

class OrganizationCreate(BaseModel):
    Name: str
    Slug: str
    Industry: Optional[str] = None
    Website: Optional[str] = None

class OrganizationOut(ORMModel, OrganizationCreate):
    OrganizationID: int
    IsActive: bool

class DepartmentCreate(BaseModel):
    OrganizationID: Optional[int] = None
    Name: str
    Description: Optional[str] = None
    ManagerUserID: Optional[int] = None

class EmployeeCreate(BaseModel):
    OrganizationID: Optional[int] = None
    UserID: Optional[int] = None
    DepartmentID: Optional[int] = None
    EmployeeCode: str
    JobTitle: Optional[str] = None
    EmploymentType: str = "full_time"
    HireDate: Optional[datetime] = None
    Salary: Decimal = Decimal("0")
    Status: str = "active"

class LeaveCreate(BaseModel):
    EmployeeID: int
    LeaveType: str
    StartDate: datetime
    EndDate: datetime
    Reason: Optional[str] = None

class LeaveStatusUpdate(BaseModel):
    Status: str = Field(pattern="^(pending|approved|rejected|cancelled)$")

class InvoiceCreate(BaseModel):
    OrganizationID: Optional[int] = None
    CustomerID: Optional[int] = None
    ClientUserID: Optional[int] = None
    InvoiceNumber: str
    Currency: str = "PKR"
    Subtotal: Decimal = Decimal("0")
    TaxAmount: Decimal = Decimal("0")
    TotalAmount: Decimal = Decimal("0")
    PaidAmount: Decimal = Decimal("0")
    Status: str = "draft"
    DueDate: Optional[datetime] = None
    Notes: Optional[str] = None

class ExpenseCreate(BaseModel):
    OrganizationID: Optional[int] = None
    Category: str
    Description: Optional[str] = None
    Amount: Decimal
    Currency: str = "PKR"
    ExpenseDate: datetime
    Status: str = "approved"

class TicketCreate(BaseModel):
    OrganizationID: Optional[int] = None
    Subject: str
    Description: str
    Priority: str = "medium"

class TicketUpdate(BaseModel):
    AssignedTo: Optional[int] = None
    Priority: Optional[str] = None
    Status: Optional[str] = None
