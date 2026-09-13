# Intellix role access

| Role | Main landing area | Intended access |
| --- | --- | --- |
| SUPER_ADMIN | `/dashboard` | Full platform administration: users, roles, CRM, projects, LMS, AI/knowledge, enterprise modules, settings and audit logs. |
| ADMIN | `/dashboard` | Day-to-day administration: CRM, projects, LMS, operational content and users. |
| INSTRUCTOR | `/portal/instructor/dashboard` | Assigned courses, lessons, assignments, submissions and grading. |
| STUDENT | `/portal/student/dashboard` | Enrolled courses, lesson progress, assignments, submissions, results and academy profile. |
| CLIENT | `/portal/client/dashboard` | Client-facing company/project portal starter. |
| MANAGER / SALES / HR / FINANCE / SUPPORT | `/dashboard` | Role-scoped operational menus relevant to each team. |

The backend remains the security authority. Hiding a sidebar item is only a user-experience convenience; protected API endpoints still enforce role checks.
