# Intellix LMS Workflow

## Roles
- **SUPER_ADMIN**: full platform access, including users, roles, LMS, audit logs and settings.
- **ADMIN**: operational administration including LMS course creation, enrollment and content management.
- **INSTRUCTOR**: manages lessons, assignments, submissions and grades for assigned courses.
- **STUDENT**: sees only enrolled courses, completes lessons, submits assignments and reviews results.

## Course lifecycle
1. A student creates an account at `/register/student`.
2. An admin creates a course at `/dashboard/lms/courses/new`.
3. The admin assigns an instructor and optionally publishes the course.
4. Lessons are added from `/dashboard/lms/courses/{courseId}/lessons`. Each lesson can contain written content, a video URL and a resource URL.
5. The admin enrolls a registered STUDENT from `/dashboard/lms/enrollments`.
6. The student signs in and is redirected to `/portal/student/dashboard`.
7. The student opens `/portal/student/courses/{courseId}`, reads lessons and marks them complete. Progress is calculated from completed lessons.
8. Staff create assignments at `/dashboard/lms/assignments`.
9. Enrolled students see those assignments at `/portal/student/assignments` and submit answers/resource links.
10. Instructors see submissions and grade them from `/portal/instructor/gradebook`.
11. Students see marks and feedback at `/portal/student/results`.

## Public academy catalog
Courses with `IsPublished=true` and a non-archived status appear automatically at `/academy`. Lessons marked `IsPreview=true` can appear on the public course detail page.

## Existing Neon database upgrade
After updating to this release, run from the repository root with the backend environment configured:

```powershell
python scripts\init_postgres.py
```

This creates the new `LessonProgress` table without deleting existing data. Alternatively run `database/upgrade_lms_progress.sql` in the Neon SQL editor.
