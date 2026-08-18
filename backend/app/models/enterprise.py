from sqlalchemy import Boolean, Column, DateTime, DECIMAL, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func
from app.core.database import Base


class Organization(Base):
    __tablename__ = "Organizations"
    OrganizationID = Column(Integer, primary_key=True, index=True)
    Name = Column(String(180), nullable=False)
    Slug = Column(String(180), unique=True, nullable=False)
    Industry = Column(String(120))
    Website = Column(String(255))
    IsActive = Column(Boolean, default=True)
    CreatedAt = Column(DateTime, server_default=func.now())


class Department(Base):
    __tablename__ = "Departments"
    DepartmentID = Column(Integer, primary_key=True, index=True)
    OrganizationID = Column(Integer, ForeignKey("Organizations.OrganizationID"), nullable=True)
    Name = Column(String(140), nullable=False)
    Description = Column(String(500))
    ManagerUserID = Column(Integer, ForeignKey("Users.UserID"), nullable=True)
    CreatedAt = Column(DateTime, server_default=func.now())


class Employee(Base):
    __tablename__ = "Employees"
    EmployeeID = Column(Integer, primary_key=True, index=True)
    OrganizationID = Column(Integer, ForeignKey("Organizations.OrganizationID"), nullable=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), unique=True, nullable=True)
    DepartmentID = Column(Integer, ForeignKey("Departments.DepartmentID"), nullable=True)
    EmployeeCode = Column(String(50), unique=True, nullable=False)
    JobTitle = Column(String(140))
    EmploymentType = Column(String(40), default="full_time")
    HireDate = Column(DateTime, nullable=True)
    Salary = Column(DECIMAL(18, 2), default=0)
    Status = Column(String(30), default="active")
    CreatedAt = Column(DateTime, server_default=func.now())


class LeaveRequest(Base):
    __tablename__ = "LeaveRequests"
    LeaveRequestID = Column(Integer, primary_key=True, index=True)
    EmployeeID = Column(Integer, ForeignKey("Employees.EmployeeID"), nullable=False)
    LeaveType = Column(String(50), nullable=False)
    StartDate = Column(DateTime, nullable=False)
    EndDate = Column(DateTime, nullable=False)
    Reason = Column(String(1000))
    Status = Column(String(30), default="pending")
    ApprovedBy = Column(Integer, ForeignKey("Users.UserID"), nullable=True)
    CreatedAt = Column(DateTime, server_default=func.now())


class Invoice(Base):
    __tablename__ = "Invoices"
    InvoiceID = Column(Integer, primary_key=True, index=True)
    OrganizationID = Column(Integer, ForeignKey("Organizations.OrganizationID"), nullable=True)
    CustomerID = Column(Integer, ForeignKey("Customers.CustomerID"), nullable=True)
    ClientUserID = Column(Integer, ForeignKey("Users.UserID"), nullable=True)
    InvoiceNumber = Column(String(60), unique=True, nullable=False)
    Currency = Column(String(10), default="PKR")
    Subtotal = Column(DECIMAL(18, 2), default=0)
    TaxAmount = Column(DECIMAL(18, 2), default=0)
    TotalAmount = Column(DECIMAL(18, 2), default=0)
    PaidAmount = Column(DECIMAL(18, 2), default=0)
    Status = Column(String(30), default="draft")
    DueDate = Column(DateTime, nullable=True)
    Notes = Column(String(1000))
    CreatedAt = Column(DateTime, server_default=func.now())


class Expense(Base):
    __tablename__ = "Expenses"
    ExpenseID = Column(Integer, primary_key=True, index=True)
    OrganizationID = Column(Integer, ForeignKey("Organizations.OrganizationID"), nullable=True)
    Category = Column(String(100), nullable=False)
    Description = Column(String(500))
    Amount = Column(DECIMAL(18, 2), nullable=False)
    Currency = Column(String(10), default="PKR")
    ExpenseDate = Column(DateTime, nullable=False)
    Status = Column(String(30), default="approved")
    CreatedBy = Column(Integer, ForeignKey("Users.UserID"), nullable=True)
    CreatedAt = Column(DateTime, server_default=func.now())


class SupportTicket(Base):
    __tablename__ = "SupportTickets"
    TicketID = Column(Integer, primary_key=True, index=True)
    OrganizationID = Column(Integer, ForeignKey("Organizations.OrganizationID"), nullable=True)
    CreatedBy = Column(Integer, ForeignKey("Users.UserID"), nullable=False)
    AssignedTo = Column(Integer, ForeignKey("Users.UserID"), nullable=True)
    Subject = Column(String(200), nullable=False)
    Description = Column(Text, nullable=False)
    Priority = Column(String(30), default="medium")
    Status = Column(String(30), default="open")
    CreatedAt = Column(DateTime, server_default=func.now())
    UpdatedAt = Column(DateTime, server_default=func.now(), onupdate=func.now())


class KnowledgeDocument(Base):
    __tablename__ = "KnowledgeDocuments"
    KnowledgeDocumentID = Column(Integer, primary_key=True, index=True)
    OrganizationID = Column(Integer, ForeignKey("Organizations.OrganizationID"), nullable=True)
    Title = Column(String(255), nullable=False)
    SourceType = Column(String(50), default="text")
    SourceURL = Column(String(1000))
    Content = Column(Text, nullable=False)
    IsActive = Column(Boolean, default=True)
    CreatedBy = Column(Integer, ForeignKey("Users.UserID"), nullable=True)
    CreatedAt = Column(DateTime, server_default=func.now())


class KnowledgeChunk(Base):
    __tablename__ = "KnowledgeChunks"
    KnowledgeChunkID = Column(Integer, primary_key=True, index=True)
    KnowledgeDocumentID = Column(Integer, ForeignKey("KnowledgeDocuments.KnowledgeDocumentID"), nullable=False)
    OrganizationID = Column(Integer, ForeignKey("Organizations.OrganizationID"), nullable=True)
    ChunkIndex = Column(Integer, nullable=False)
    Content = Column(Text, nullable=False)
    TokenEstimate = Column(Integer, default=0)
    CreatedAt = Column(DateTime, server_default=func.now())


class AIConversation(Base):
    __tablename__ = "AIConversations"
    ConversationID = Column(Integer, primary_key=True, index=True)
    OrganizationID = Column(Integer, ForeignKey("Organizations.OrganizationID"), nullable=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), nullable=False)
    Title = Column(String(255), default="New conversation")
    CreatedAt = Column(DateTime, server_default=func.now())


class AIMessage(Base):
    __tablename__ = "AIMessages"
    MessageID = Column(Integer, primary_key=True, index=True)
    ConversationID = Column(Integer, ForeignKey("AIConversations.ConversationID"), nullable=False)
    Role = Column(String(20), nullable=False)
    Content = Column(Text, nullable=False)
    SourcesJSON = Column(Text)
    CreatedAt = Column(DateTime, server_default=func.now())
