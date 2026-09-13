-- Optional PostgreSQL seed. The Python seed script is preferred.
INSERT INTO "Roles" ("RoleName", "Description") VALUES
('SUPER_ADMIN', 'Full platform control'),
('ADMIN', 'Platform administrator'),
('MANAGER', 'Business manager'),
('SALES', 'Sales team'),
('INSTRUCTOR', 'Academy instructor'),
('STUDENT', 'Academy student'),
('CLIENT', 'Company client'),
('HR', 'Human resources'),
('FINANCE', 'Finance team'),
('SUPPORT', 'Support team'),
('EMPLOYEE', 'Company employee')
ON CONFLICT ("RoleName") DO NOTHING;

INSERT INTO "Permissions" ("Code", "Name", "Description") VALUES
('users.manage', 'Manage users', 'Manage users'),
('roles.manage', 'Manage roles', 'Manage roles'),
('crm.manage', 'Manage CRM', 'Manage CRM'),
('lms.manage', 'Manage LMS', 'Manage LMS'),
('projects.manage', 'Manage projects', 'Manage projects'),
('finance.manage', 'Manage finance', 'Manage finance'),
('hr.manage', 'Manage HR', 'Manage HR'),
('ai.use', 'Use AI assistant', 'Use AI assistant')
ON CONFLICT ("Code") DO NOTHING;
