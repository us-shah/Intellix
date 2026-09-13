from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.core.database import get_db
from app.models.enterprise import Department, Employee, Expense, Invoice, LeaveRequest, Organization, SupportTicket
from app.schemas.enterprise import DepartmentCreate, EmployeeCreate, ExpenseCreate, InvoiceCreate, LeaveCreate, LeaveStatusUpdate, OrganizationCreate, TicketCreate, TicketUpdate

router = APIRouter(prefix="/enterprise", tags=["Enterprise"])

def uid(payload):
    return int(payload.get("user_id") or 0)

@router.get("/overview")
def overview(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return {
        "organizations": db.query(Organization).count(), "departments": db.query(Department).count(),
        "employees": db.query(Employee).count(), "open_leaves": db.query(LeaveRequest).filter(LeaveRequest.Status == "pending").count(),
        "invoices": db.query(Invoice).count(), "expenses": db.query(Expense).count(),
        "open_tickets": db.query(SupportTicket).filter(SupportTicket.Status != "closed").count(),
    }

@router.get("/organizations")
def organizations(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return db.query(Organization).order_by(Organization.Name).all()

@router.post("/organizations")
def create_organization(data: OrganizationCreate, db: Session = Depends(get_db), current=Depends(get_current_user)):
    if db.query(Organization).filter(Organization.Slug == data.Slug).first():
        raise HTTPException(409, "Organization slug already exists")
    item = Organization(**data.model_dump()); db.add(item); db.commit(); db.refresh(item); return item

@router.get("/departments")
def departments(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return db.query(Department).order_by(Department.Name).all()

@router.post("/departments")
def create_department(data: DepartmentCreate, db: Session = Depends(get_db), current=Depends(get_current_user)):
    item = Department(**data.model_dump()); db.add(item); db.commit(); db.refresh(item); return item

@router.get("/employees")
def employees(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return db.query(Employee).order_by(Employee.EmployeeID.desc()).all()

@router.post("/employees")
def create_employee(data: EmployeeCreate, db: Session = Depends(get_db), current=Depends(get_current_user)):
    if db.query(Employee).filter(Employee.EmployeeCode == data.EmployeeCode).first():
        raise HTTPException(409, "Employee code already exists")
    item = Employee(**data.model_dump()); db.add(item); db.commit(); db.refresh(item); return item

@router.get("/leaves")
def leaves(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return db.query(LeaveRequest).order_by(LeaveRequest.CreatedAt.desc()).all()

@router.post("/leaves")
def create_leave(data: LeaveCreate, db: Session = Depends(get_db), current=Depends(get_current_user)):
    item = LeaveRequest(**data.model_dump()); db.add(item); db.commit(); db.refresh(item); return item

@router.put("/leaves/{leave_id}/status")
def leave_status(leave_id: int, data: LeaveStatusUpdate, db: Session = Depends(get_db), current=Depends(get_current_user)):
    item = db.get(LeaveRequest, leave_id)
    if not item: raise HTTPException(404, "Leave request not found")
    item.Status = data.Status; item.ApprovedBy = uid(current) or None; db.commit(); db.refresh(item); return item

@router.get("/invoices")
def invoices(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return db.query(Invoice).order_by(Invoice.CreatedAt.desc()).all()

@router.post("/invoices")
def create_invoice(data: InvoiceCreate, db: Session = Depends(get_db), current=Depends(get_current_user)):
    if db.query(Invoice).filter(Invoice.InvoiceNumber == data.InvoiceNumber).first():
        raise HTTPException(409, "Invoice number already exists")
    values = data.model_dump()
    if values["TotalAmount"] == 0: values["TotalAmount"] = values["Subtotal"] + values["TaxAmount"]
    item = Invoice(**values); db.add(item); db.commit(); db.refresh(item); return item

@router.get("/expenses")
def expenses(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return db.query(Expense).order_by(Expense.ExpenseDate.desc()).all()

@router.post("/expenses")
def create_expense(data: ExpenseCreate, db: Session = Depends(get_db), current=Depends(get_current_user)):
    item = Expense(**data.model_dump(), CreatedBy=uid(current) or None); db.add(item); db.commit(); db.refresh(item); return item

@router.get("/tickets")
def tickets(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return db.query(SupportTicket).order_by(SupportTicket.UpdatedAt.desc()).all()

@router.post("/tickets")
def create_ticket(data: TicketCreate, db: Session = Depends(get_db), current=Depends(get_current_user)):
    user_id = uid(current)
    if not user_id: raise HTTPException(401, "Token has no user_id")
    item = SupportTicket(**data.model_dump(), CreatedBy=user_id); db.add(item); db.commit(); db.refresh(item); return item

@router.put("/tickets/{ticket_id}")
def update_ticket(ticket_id: int, data: TicketUpdate, db: Session = Depends(get_db), current=Depends(get_current_user)):
    item = db.get(SupportTicket, ticket_id)
    if not item: raise HTTPException(404, "Ticket not found")
    for key, value in data.model_dump(exclude_none=True).items(): setattr(item, key, value)
    db.commit(); db.refresh(item); return item
