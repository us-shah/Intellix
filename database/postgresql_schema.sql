-- Intellix PostgreSQL schema generated from SQLAlchemy models.
-- Use on a fresh PostgreSQL/Neon database.


CREATE TABLE "Blogs" (
	"BlogID" SERIAL NOT NULL, 
	"Title" VARCHAR(250) NOT NULL, 
	"Slug" VARCHAR(250), 
	"Summary" TEXT, 
	"Content" TEXT, 
	"Image" VARCHAR(500), 
	"Author" VARCHAR(150), 
	"Status" VARCHAR(50), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("BlogID"), 
	UNIQUE ("Slug")
);

CREATE INDEX "ix_Blogs_BlogID" ON "Blogs" ("BlogID");


CREATE TABLE "Companies" (
	"CompanyID" SERIAL NOT NULL, 
	"CompanyName" VARCHAR(200) NOT NULL, 
	"Industry" VARCHAR(100), 
	"Website" VARCHAR(200), 
	"Email" VARCHAR(200), 
	"Phone" VARCHAR(50), 
	"Address" VARCHAR(255), 
	"City" VARCHAR(100), 
	"Country" VARCHAR(100), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("CompanyID")
);

CREATE INDEX "ix_Companies_CompanyID" ON "Companies" ("CompanyID");


CREATE TABLE "Contacts" (
	"ContactID" SERIAL NOT NULL, 
	"FullName" VARCHAR(150) NOT NULL, 
	"Email" VARCHAR(200) NOT NULL, 
	"Phone" VARCHAR(50), 
	"Subject" VARCHAR(250), 
	"Message" TEXT, 
	"Status" VARCHAR(50), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("ContactID")
);

CREATE INDEX "ix_Contacts_ContactID" ON "Contacts" ("ContactID");


CREATE TABLE "Documents" (
	"DocumentID" SERIAL NOT NULL, 
	"FileName" VARCHAR(255) NOT NULL, 
	"OriginalName" VARCHAR(255) NOT NULL, 
	"FileType" VARCHAR(100), 
	"FileSize" INTEGER, 
	"FilePath" VARCHAR(500), 
	"UploadedBy" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("DocumentID")
);

CREATE INDEX "ix_Documents_DocumentID" ON "Documents" ("DocumentID");


CREATE TABLE "Jobs" (
	"JobID" SERIAL NOT NULL, 
	"Title" VARCHAR(200) NOT NULL, 
	"Department" VARCHAR(100), 
	"Location" VARCHAR(150), 
	"EmploymentType" VARCHAR(50), 
	"Salary" VARCHAR(100), 
	"Description" TEXT, 
	"Requirements" TEXT, 
	"Status" VARCHAR(50), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("JobID")
);

CREATE INDEX "ix_Jobs_JobID" ON "Jobs" ("JobID");


CREATE TABLE "Newsletter" (
	"SubscriberID" SERIAL NOT NULL, 
	"Email" VARCHAR(200) NOT NULL, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("SubscriberID"), 
	UNIQUE ("Email")
);

CREATE INDEX "ix_Newsletter_SubscriberID" ON "Newsletter" ("SubscriberID");


CREATE TABLE "Organizations" (
	"OrganizationID" SERIAL NOT NULL, 
	"Name" VARCHAR(180) NOT NULL, 
	"Slug" VARCHAR(180) NOT NULL, 
	"Industry" VARCHAR(120), 
	"Website" VARCHAR(255), 
	"IsActive" BOOLEAN, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("OrganizationID"), 
	UNIQUE ("Slug")
);

CREATE INDEX "ix_Organizations_OrganizationID" ON "Organizations" ("OrganizationID");


CREATE TABLE "Permissions" (
	"PermissionID" SERIAL NOT NULL, 
	"Code" VARCHAR(100) NOT NULL, 
	"Name" VARCHAR(120) NOT NULL, 
	"Description" VARCHAR(255), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("PermissionID")
);

CREATE UNIQUE INDEX "ix_Permissions_Code" ON "Permissions" ("Code");

CREATE INDEX "ix_Permissions_PermissionID" ON "Permissions" ("PermissionID");


CREATE TABLE "Roles" (
	"RoleID" SERIAL NOT NULL, 
	"RoleName" VARCHAR(50), 
	"Description" VARCHAR(255), 
	"CreatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("RoleID"), 
	UNIQUE ("RoleName")
);

CREATE INDEX "ix_Roles_RoleID" ON "Roles" ("RoleID");


CREATE TABLE "Services" (
	"ServiceID" SERIAL NOT NULL, 
	"ServiceName" VARCHAR(200) NOT NULL, 
	"Description" TEXT, 
	"Icon" VARCHAR(100), 
	"Status" VARCHAR(50), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("ServiceID")
);

CREATE INDEX "ix_Services_ServiceID" ON "Services" ("ServiceID");


CREATE TABLE "Settings" (
	"SettingID" SERIAL NOT NULL, 
	"SettingKey" VARCHAR(150) NOT NULL, 
	"SettingValue" TEXT, 
	"Category" VARCHAR(100), 
	"Description" VARCHAR(300), 
	"UpdatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("SettingID"), 
	UNIQUE ("SettingKey")
);

CREATE INDEX "ix_Settings_SettingID" ON "Settings" ("SettingID");


CREATE TABLE "Tasks" (
	"TaskID" SERIAL NOT NULL, 
	"Title" VARCHAR(200) NOT NULL, 
	"Description" VARCHAR, 
	"AssignedTo" INTEGER, 
	"Priority" VARCHAR(20), 
	"Status" VARCHAR(20), 
	"DueDate" TIMESTAMP WITHOUT TIME ZONE, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("TaskID")
);

CREATE INDEX "ix_Tasks_TaskID" ON "Tasks" ("TaskID");


CREATE TABLE "Customers" (
	"CustomerID" SERIAL NOT NULL, 
	"FirstName" VARCHAR(100) NOT NULL, 
	"LastName" VARCHAR(100), 
	"Email" VARCHAR(150), 
	"Phone" VARCHAR(30), 
	"Address" VARCHAR(255), 
	"City" VARCHAR(100), 
	"Country" VARCHAR(100), 
	"CompanyID" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("CustomerID"), 
	FOREIGN KEY("CompanyID") REFERENCES "Companies" ("CompanyID")
);

CREATE INDEX "ix_Customers_CustomerID" ON "Customers" ("CustomerID");


CREATE TABLE "RolePermissions" (
	"RolePermissionID" SERIAL NOT NULL, 
	"RoleID" INTEGER NOT NULL, 
	"PermissionID" INTEGER NOT NULL, 
	PRIMARY KEY ("RolePermissionID"), 
	CONSTRAINT "UQ_RolePermission" UNIQUE ("RoleID", "PermissionID"), 
	FOREIGN KEY("RoleID") REFERENCES "Roles" ("RoleID") ON DELETE CASCADE, 
	FOREIGN KEY("PermissionID") REFERENCES "Permissions" ("PermissionID") ON DELETE CASCADE
);

CREATE INDEX "ix_RolePermissions_RolePermissionID" ON "RolePermissions" ("RolePermissionID");


CREATE TABLE "Users" (
	"UserID" SERIAL NOT NULL, 
	"FullName" VARCHAR(100) NOT NULL, 
	"Email" VARCHAR(100) NOT NULL, 
	"Phone" VARCHAR(20), 
	"PasswordHash" VARCHAR(255) NOT NULL, 
	"RoleID" INTEGER, 
	"IsActive" BOOLEAN, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	"UpdatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("UserID"), 
	UNIQUE ("Email"), 
	FOREIGN KEY("RoleID") REFERENCES "Roles" ("RoleID")
);

CREATE INDEX "ix_Users_UserID" ON "Users" ("UserID");


CREATE TABLE "AIConversations" (
	"ConversationID" SERIAL NOT NULL, 
	"OrganizationID" INTEGER, 
	"UserID" INTEGER NOT NULL, 
	"Title" VARCHAR(255), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("ConversationID"), 
	FOREIGN KEY("OrganizationID") REFERENCES "Organizations" ("OrganizationID"), 
	FOREIGN KEY("UserID") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_AIConversations_ConversationID" ON "AIConversations" ("ConversationID");


CREATE TABLE "ActivityLogs" (
	"ActivityID" SERIAL NOT NULL, 
	"UserID" INTEGER, 
	"Action" VARCHAR(50) NOT NULL, 
	"TableName" VARCHAR(100) NOT NULL, 
	"RecordID" INTEGER NOT NULL, 
	"ActionTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("ActivityID"), 
	FOREIGN KEY("UserID") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_ActivityLogs_ActivityID" ON "ActivityLogs" ("ActivityID");


CREATE TABLE "ClientProfiles" (
	"ClientProfileID" SERIAL NOT NULL, 
	"UserID" INTEGER NOT NULL, 
	"CompanyName" VARCHAR(160) NOT NULL, 
	"Industry" VARCHAR(100), 
	"Website" VARCHAR(255), 
	"Address" VARCHAR(500), 
	"Status" VARCHAR(30), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("ClientProfileID"), 
	UNIQUE ("UserID"), 
	FOREIGN KEY("UserID") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_ClientProfiles_ClientProfileID" ON "ClientProfiles" ("ClientProfileID");


CREATE TABLE "Courses" (
	"CourseID" SERIAL NOT NULL, 
	"Title" VARCHAR(180) NOT NULL, 
	"Slug" VARCHAR(200) NOT NULL, 
	"ShortDescription" VARCHAR(500), 
	"Description" TEXT, 
	"Thumbnail" VARCHAR(500), 
	"Price" NUMERIC(12, 2), 
	"Level" VARCHAR(30), 
	"Status" VARCHAR(30), 
	"InstructorID" INTEGER, 
	"IsPublished" BOOLEAN, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	"UpdatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("CourseID"), 
	FOREIGN KEY("InstructorID") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_Courses_CourseID" ON "Courses" ("CourseID");

CREATE UNIQUE INDEX "ix_Courses_Slug" ON "Courses" ("Slug");


CREATE TABLE "Deals" (
	"DealID" SERIAL NOT NULL, 
	"CustomerID" INTEGER NOT NULL, 
	"Title" VARCHAR(200) NOT NULL, 
	"Amount" FLOAT NOT NULL, 
	"Stage" VARCHAR(100), 
	"ExpectedDate" TIMESTAMP WITHOUT TIME ZONE, 
	"AssignedTo" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("DealID"), 
	FOREIGN KEY("CustomerID") REFERENCES "Customers" ("CustomerID")
);

CREATE INDEX "ix_Deals_DealID" ON "Deals" ("DealID");


CREATE TABLE "Departments" (
	"DepartmentID" SERIAL NOT NULL, 
	"OrganizationID" INTEGER, 
	"Name" VARCHAR(140) NOT NULL, 
	"Description" VARCHAR(500), 
	"ManagerUserID" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("DepartmentID"), 
	FOREIGN KEY("OrganizationID") REFERENCES "Organizations" ("OrganizationID"), 
	FOREIGN KEY("ManagerUserID") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_Departments_DepartmentID" ON "Departments" ("DepartmentID");


CREATE TABLE "Expenses" (
	"ExpenseID" SERIAL NOT NULL, 
	"OrganizationID" INTEGER, 
	"Category" VARCHAR(100) NOT NULL, 
	"Description" VARCHAR(500), 
	"Amount" DECIMAL(18, 2) NOT NULL, 
	"Currency" VARCHAR(10), 
	"ExpenseDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	"Status" VARCHAR(30), 
	"CreatedBy" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("ExpenseID"), 
	FOREIGN KEY("OrganizationID") REFERENCES "Organizations" ("OrganizationID"), 
	FOREIGN KEY("CreatedBy") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_Expenses_ExpenseID" ON "Expenses" ("ExpenseID");


CREATE TABLE "Invoices" (
	"InvoiceID" SERIAL NOT NULL, 
	"OrganizationID" INTEGER, 
	"CustomerID" INTEGER, 
	"ClientUserID" INTEGER, 
	"InvoiceNumber" VARCHAR(60) NOT NULL, 
	"Currency" VARCHAR(10), 
	"Subtotal" DECIMAL(18, 2), 
	"TaxAmount" DECIMAL(18, 2), 
	"TotalAmount" DECIMAL(18, 2), 
	"PaidAmount" DECIMAL(18, 2), 
	"Status" VARCHAR(30), 
	"DueDate" TIMESTAMP WITHOUT TIME ZONE, 
	"Notes" VARCHAR(1000), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("InvoiceID"), 
	FOREIGN KEY("OrganizationID") REFERENCES "Organizations" ("OrganizationID"), 
	FOREIGN KEY("CustomerID") REFERENCES "Customers" ("CustomerID"), 
	FOREIGN KEY("ClientUserID") REFERENCES "Users" ("UserID"), 
	UNIQUE ("InvoiceNumber")
);

CREATE INDEX "ix_Invoices_InvoiceID" ON "Invoices" ("InvoiceID");


CREATE TABLE "KnowledgeDocuments" (
	"KnowledgeDocumentID" SERIAL NOT NULL, 
	"OrganizationID" INTEGER, 
	"Title" VARCHAR(255) NOT NULL, 
	"SourceType" VARCHAR(50), 
	"SourceURL" VARCHAR(1000), 
	"Content" TEXT NOT NULL, 
	"IsActive" BOOLEAN, 
	"CreatedBy" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("KnowledgeDocumentID"), 
	FOREIGN KEY("OrganizationID") REFERENCES "Organizations" ("OrganizationID"), 
	FOREIGN KEY("CreatedBy") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_KnowledgeDocuments_KnowledgeDocumentID" ON "KnowledgeDocuments" ("KnowledgeDocumentID");


CREATE TABLE "Leads" (
	"LeadID" SERIAL NOT NULL, 
	"FullName" VARCHAR(150) NOT NULL, 
	"Email" VARCHAR(200), 
	"Phone" VARCHAR(50), 
	"Source" VARCHAR(100), 
	"Status" VARCHAR(50), 
	"CompanyID" INTEGER, 
	"AssignedTo" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("LeadID"), 
	FOREIGN KEY("CompanyID") REFERENCES "Companies" ("CompanyID"), 
	FOREIGN KEY("AssignedTo") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_Leads_LeadID" ON "Leads" ("LeadID");


CREATE TABLE "Meetings" (
	"MeetingID" SERIAL NOT NULL, 
	"CustomerID" INTEGER, 
	"Title" VARCHAR(200) NOT NULL, 
	"MeetingDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	"Location" VARCHAR(200), 
	"Description" VARCHAR(500), 
	"CreatedBy" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("MeetingID"), 
	FOREIGN KEY("CustomerID") REFERENCES "Customers" ("CustomerID")
);

CREATE INDEX "ix_Meetings_MeetingID" ON "Meetings" ("MeetingID");


CREATE TABLE "Notifications" (
	"NotificationID" SERIAL NOT NULL, 
	"UserID" INTEGER, 
	"Title" VARCHAR(200) NOT NULL, 
	"Message" VARCHAR(500) NOT NULL, 
	"IsRead" BOOLEAN, 
	"CreatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("NotificationID"), 
	FOREIGN KEY("UserID") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_Notifications_NotificationID" ON "Notifications" ("NotificationID");


CREATE TABLE "Projects" (
	"ProjectID" SERIAL NOT NULL, 
	"ProjectName" VARCHAR(200) NOT NULL, 
	"Description" VARCHAR(1000), 
	"CustomerID" INTEGER, 
	"ManagerID" INTEGER, 
	"Status" VARCHAR(50), 
	"StartDate" TIMESTAMP WITHOUT TIME ZONE, 
	"EndDate" TIMESTAMP WITHOUT TIME ZONE, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("ProjectID"), 
	FOREIGN KEY("CustomerID") REFERENCES "Customers" ("CustomerID"), 
	FOREIGN KEY("ManagerID") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_Projects_ProjectID" ON "Projects" ("ProjectID");


CREATE TABLE "SupportTickets" (
	"TicketID" SERIAL NOT NULL, 
	"OrganizationID" INTEGER, 
	"CreatedBy" INTEGER NOT NULL, 
	"AssignedTo" INTEGER, 
	"Subject" VARCHAR(200) NOT NULL, 
	"Description" TEXT NOT NULL, 
	"Priority" VARCHAR(30), 
	"Status" VARCHAR(30), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	"UpdatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("TicketID"), 
	FOREIGN KEY("OrganizationID") REFERENCES "Organizations" ("OrganizationID"), 
	FOREIGN KEY("CreatedBy") REFERENCES "Users" ("UserID"), 
	FOREIGN KEY("AssignedTo") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_SupportTickets_TicketID" ON "SupportTickets" ("TicketID");


CREATE TABLE "AIMessages" (
	"MessageID" SERIAL NOT NULL, 
	"ConversationID" INTEGER NOT NULL, 
	"Role" VARCHAR(20) NOT NULL, 
	"Content" TEXT NOT NULL, 
	"SourcesJSON" TEXT, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("MessageID"), 
	FOREIGN KEY("ConversationID") REFERENCES "AIConversations" ("ConversationID")
);

CREATE INDEX "ix_AIMessages_MessageID" ON "AIMessages" ("MessageID");


CREATE TABLE "Assignments" (
	"AssignmentID" SERIAL NOT NULL, 
	"CourseID" INTEGER NOT NULL, 
	"Title" VARCHAR(180) NOT NULL, 
	"Instructions" TEXT, 
	"DueAt" TIMESTAMP WITHOUT TIME ZONE, 
	"MaxMarks" NUMERIC(8, 2), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("AssignmentID"), 
	FOREIGN KEY("CourseID") REFERENCES "Courses" ("CourseID") ON DELETE CASCADE
);

CREATE INDEX "ix_Assignments_AssignmentID" ON "Assignments" ("AssignmentID");


CREATE TABLE "Employees" (
	"EmployeeID" SERIAL NOT NULL, 
	"OrganizationID" INTEGER, 
	"UserID" INTEGER, 
	"DepartmentID" INTEGER, 
	"EmployeeCode" VARCHAR(50) NOT NULL, 
	"JobTitle" VARCHAR(140), 
	"EmploymentType" VARCHAR(40), 
	"HireDate" TIMESTAMP WITHOUT TIME ZONE, 
	"Salary" DECIMAL(18, 2), 
	"Status" VARCHAR(30), 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("EmployeeID"), 
	FOREIGN KEY("OrganizationID") REFERENCES "Organizations" ("OrganizationID"), 
	UNIQUE ("UserID"), 
	FOREIGN KEY("UserID") REFERENCES "Users" ("UserID"), 
	FOREIGN KEY("DepartmentID") REFERENCES "Departments" ("DepartmentID"), 
	UNIQUE ("EmployeeCode")
);

CREATE INDEX "ix_Employees_EmployeeID" ON "Employees" ("EmployeeID");


CREATE TABLE "Enrollments" (
	"EnrollmentID" SERIAL NOT NULL, 
	"StudentID" INTEGER NOT NULL, 
	"CourseID" INTEGER NOT NULL, 
	"Status" VARCHAR(30), 
	"ProgressPercent" NUMERIC(5, 2), 
	"EnrolledAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	"CompletedAt" TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY ("EnrollmentID"), 
	CONSTRAINT "UQ_StudentCourse" UNIQUE ("StudentID", "CourseID"), 
	FOREIGN KEY("StudentID") REFERENCES "Users" ("UserID"), 
	FOREIGN KEY("CourseID") REFERENCES "Courses" ("CourseID") ON DELETE CASCADE
);

CREATE INDEX "ix_Enrollments_EnrollmentID" ON "Enrollments" ("EnrollmentID");


CREATE TABLE "KnowledgeChunks" (
	"KnowledgeChunkID" SERIAL NOT NULL, 
	"KnowledgeDocumentID" INTEGER NOT NULL, 
	"OrganizationID" INTEGER, 
	"ChunkIndex" INTEGER NOT NULL, 
	"Content" TEXT NOT NULL, 
	"TokenEstimate" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("KnowledgeChunkID"), 
	FOREIGN KEY("KnowledgeDocumentID") REFERENCES "KnowledgeDocuments" ("KnowledgeDocumentID"), 
	FOREIGN KEY("OrganizationID") REFERENCES "Organizations" ("OrganizationID")
);

CREATE INDEX "ix_KnowledgeChunks_KnowledgeChunkID" ON "KnowledgeChunks" ("KnowledgeChunkID");


CREATE TABLE "Lessons" (
	"LessonID" SERIAL NOT NULL, 
	"CourseID" INTEGER NOT NULL, 
	"Title" VARCHAR(180) NOT NULL, 
	"Content" TEXT, 
	"VideoURL" VARCHAR(500), 
	"ResourceURL" VARCHAR(500), 
	"SortOrder" INTEGER, 
	"IsPreview" BOOLEAN, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("LessonID"), 
	FOREIGN KEY("CourseID") REFERENCES "Courses" ("CourseID") ON DELETE CASCADE
);

CREATE INDEX "ix_Lessons_LessonID" ON "Lessons" ("LessonID");


CREATE TABLE "Notes" (
	"NoteID" SERIAL NOT NULL, 
	"CustomerID" INTEGER, 
	"LeadID" INTEGER, 
	"DealID" INTEGER, 
	"NoteText" TEXT NOT NULL, 
	"CreatedBy" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("NoteID"), 
	FOREIGN KEY("CustomerID") REFERENCES "Customers" ("CustomerID"), 
	FOREIGN KEY("LeadID") REFERENCES "Leads" ("LeadID"), 
	FOREIGN KEY("DealID") REFERENCES "Deals" ("DealID")
);

CREATE INDEX "ix_Notes_NoteID" ON "Notes" ("NoteID");


CREATE TABLE "LeaveRequests" (
	"LeaveRequestID" SERIAL NOT NULL, 
	"EmployeeID" INTEGER NOT NULL, 
	"LeaveType" VARCHAR(50) NOT NULL, 
	"StartDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	"EndDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
	"Reason" VARCHAR(1000), 
	"Status" VARCHAR(30), 
	"ApprovedBy" INTEGER, 
	"CreatedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	PRIMARY KEY ("LeaveRequestID"), 
	FOREIGN KEY("EmployeeID") REFERENCES "Employees" ("EmployeeID"), 
	FOREIGN KEY("ApprovedBy") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_LeaveRequests_LeaveRequestID" ON "LeaveRequests" ("LeaveRequestID");


CREATE TABLE "Submissions" (
	"SubmissionID" SERIAL NOT NULL, 
	"AssignmentID" INTEGER NOT NULL, 
	"StudentID" INTEGER NOT NULL, 
	"AnswerText" TEXT, 
	"AttachmentURL" VARCHAR(500), 
	"Marks" NUMERIC(8, 2), 
	"Feedback" TEXT, 
	"Status" VARCHAR(30), 
	"SubmittedAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(), 
	"GradedAt" TIMESTAMP WITHOUT TIME ZONE, 
	PRIMARY KEY ("SubmissionID"), 
	CONSTRAINT "UQ_AssignmentStudent" UNIQUE ("AssignmentID", "StudentID"), 
	FOREIGN KEY("AssignmentID") REFERENCES "Assignments" ("AssignmentID") ON DELETE CASCADE, 
	FOREIGN KEY("StudentID") REFERENCES "Users" ("UserID")
);

CREATE INDEX "ix_Submissions_SubmissionID" ON "Submissions" ("SubmissionID");
