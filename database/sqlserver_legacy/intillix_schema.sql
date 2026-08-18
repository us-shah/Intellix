create database intellixDB;
go
Use intellixDB;
go
CREATE TABLE Roles (
    RoleID INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE()
);
INSERT INTO Roles (RoleName, Description)
VALUES
('Admin', 'System Administrator'),
('Manager', 'CRM Manager'),
('Employee', 'CRM Employee');

CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Phone NVARCHAR(20),
    PasswordHash NVARCHAR(255) NOT NULL,
    RoleID INT NOT NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Users_Roles
    FOREIGN KEY (RoleID)
    REFERENCES Roles(RoleID)
);
CREATE TABLE Companies (
    CompanyID INT IDENTITY(1,1) PRIMARY KEY,
    CompanyName NVARCHAR(150) NOT NULL,
    Industry NVARCHAR(100),
    Website NVARCHAR(200),
    Email NVARCHAR(100),
    Phone NVARCHAR(20),
    Address NVARCHAR(255),
    City NVARCHAR(100),
    Country NVARCHAR(100),
    CreatedAt DATETIME DEFAULT GETDATE()
);
CREATE TABLE Customers (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100),
    Email NVARCHAR(100),
    Phone NVARCHAR(20),
    Address NVARCHAR(255),
    City NVARCHAR(100),
    Country NVARCHAR(100),
    CompanyID INT,
    CreatedBy INT,
    CreatedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Customers_Company
    FOREIGN KEY (CompanyID)
    REFERENCES Companies(CompanyID),

    CONSTRAINT FK_Customers_User
    FOREIGN KEY (CreatedBy)
    REFERENCES Users(UserID)
);

CREATE TABLE Leads (
    LeadID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100),
    Phone NVARCHAR(20),
    Source NVARCHAR(100),
    Status NVARCHAR(50),
    CompanyID INT,
    AssignedTo INT,
    CreatedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Lead_Company
    FOREIGN KEY (CompanyID)
    REFERENCES Companies(CompanyID),

    CONSTRAINT FK_Lead_User
    FOREIGN KEY (AssignedTo)
    REFERENCES Users(UserID)
);

CREATE TABLE Deals (
    DealID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT NOT NULL,
    Title NVARCHAR(150),
    Amount DECIMAL(18,2),
    Stage NVARCHAR(50),
    ExpectedCloseDate DATE,
    AssignedTo INT,
    CreatedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Deal_Customer
    FOREIGN KEY (CustomerID)
    REFERENCES Customers(CustomerID),

    CONSTRAINT FK_Deal_User
    FOREIGN KEY (AssignedTo)
    REFERENCES Users(UserID)
);

CREATE TABLE Tasks (
    TaskID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(150),
    Description NVARCHAR(MAX),
    AssignedTo INT,
    Priority NVARCHAR(20),
    Status NVARCHAR(20),
    DueDate DATE,
    CreatedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Task_User
    FOREIGN KEY (AssignedTo)
    REFERENCES Users(UserID)
);

CREATE TABLE Meetings (
    MeetingID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT,
    Title NVARCHAR(150),
    MeetingDate DATETIME,
    Location NVARCHAR(255),
    Description NVARCHAR(MAX),
    CreatedBy INT,
    CreatedAt DATETIME DEFAULT GETDATE(),

    CONSTRAINT FK_Meeting_Customer
    FOREIGN KEY (CustomerID)
    REFERENCES Customers(CustomerID),

    CONSTRAINT FK_Meeting_User
    FOREIGN KEY (CreatedBy)
    REFERENCES Users(UserID)
);

CREATE TABLE Notes (
    NoteID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT,
    LeadID INT,
    DealID INT,
    NoteText NVARCHAR(MAX),
    CreatedBy INT,
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (LeadID) REFERENCES Leads(LeadID),
    FOREIGN KEY (DealID) REFERENCES Deals(DealID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
);
CREATE TABLE Notifications (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    Title NVARCHAR(150),
    Message NVARCHAR(MAX),
    IsRead BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserID)
    REFERENCES Users(UserID)
);


CREATE TABLE ActivityLogs (
    ActivityID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT,
    Action NVARCHAR(100),
    TableName NVARCHAR(100),
    RecordID INT,
    ActionTime DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserID)
    REFERENCES Users(UserID)
);

select * from Roles;
select * from Users;
select * from Companies;
Drop table Companies;
Exec sp_help 'Customers';
ALTER TABLE Customers
DROP CONSTRAINT FK_Customers_Company;
