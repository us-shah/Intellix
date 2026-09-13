# Intellix Unified CRM + LMS Upgrade

This source upgrade adds a shared platform foundation for:

- Public Intellix company and academy website
- CRM staff dashboard
- Super Admin and Admin permission management
- Student registration, login and LMS dashboard
- Client registration, login and client dashboard
- Instructor-managed courses, lessons, assignments and grading

## Apply the database upgrade

Open SQL Server Management Studio, select `intellixDB`, then execute:

`database/upgrade_v2.sql`

## New backend routes

- `POST /portal/students/register`
- `POST /portal/clients/register`
- `GET/PUT /portal/me`
- `GET /portal/student/dashboard`
- `GET /portal/client/dashboard`
- `/permissions/*`
- `/lms/courses`
- `/lms/courses/{id}/lessons`
- `/lms/enrollments`
- `/lms/my-courses`
- `/lms/assignments`
- `/lms/assignments/{id}/submit`
- `/lms/submissions/{id}/grade`

## New frontend routes

- `/login`
- `/register/student`
- `/register/client`
- `/portal/student/dashboard`
- `/portal/client/dashboard`

## Validation status

- Backend Python syntax compilation: passed.
- New platform files are structurally valid.
- The older frontend still contains pre-existing TypeScript errors in public-site data exports, missing hooks/components, casing mismatches and UI Button usage. See `docs/PLATFORM_ROADMAP.md` and the earlier `FIXES_AND_NEXT_STEPS.md`.

This is an upgraded functional foundation. A truly complete production CRM/LMS still requires the remaining items documented in `docs/PLATFORM_ROADMAP.md`.
