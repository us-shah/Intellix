# Intellix LMS Pages Patch
Copy the `frontend` and `backend` folders over the previous upgraded project, preserving paths.

## Included
- Admin LMS overview, courses, course form, lessons, assignments, enrollments, submissions/grading.
- Student dashboard, courses, lessons, assignments, submissions and results.
- Instructor dashboard, courses, assignments, submissions and gradebook.
- Shared LMS API client, TypeScript types and responsive portal shell.
- Extra backend GET endpoints required by the pages.

## Apply
1. Back up the project.
2. Extract this ZIP into the project root and allow replacement of matching files.
3. Restart FastAPI.
4. Restart Next.js.
5. Open `/dashboard/lms`, `/portal/student/dashboard`, or `/portal/instructor/dashboard`.

## Important
The enhanced router expects existing SQLAlchemy relationships used by the original upgrade (`Enrollment.student`, `Enrollment.course`, `Assignment.course`, `Submission.student`, `Submission.assignment`). They are present in the upgraded project models. If your local models differ, keep the original model files from the upgrade ZIP.
