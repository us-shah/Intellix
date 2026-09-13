# Intellix 2.1 unified release

## What changed
- One root `npm run dev` command orchestrates both Next.js and FastAPI. On the first run it installs missing frontend/backend dependencies automatically.
- Public website now has a consistent high-contrast light design, a reusable public header and dark footer, and a dashboard-inspired hero matching the supplied visual direction.
- Public Academy is connected to LMS data: published courses appear at `/academy` and preview lessons appear on course detail pages.
- LMS backend/frontend gaps were repaired: course detail, lessons management, enrollments, assignment lists, submission lists, student assignment/submission views, grading and lesson progress endpoints are present.
- Added `LessonProgress` to calculate course completion from completed lessons.
- Added a complete admin LMS workflow UI and a missing course-lessons management page.
- Student dashboard was corrected to consume the real `/lms/my-courses` response shape.
- Admin/Super Admin dashboard shell is role-aware and the mobile menu works.
- Authentication routing protects Admin, Student, Instructor and Client areas.
- Backend `.env` loading works even when FastAPI is launched from the repository root.
- Secrets were removed from the release package and safe environment examples are included.

## Existing Neon database
Run `python scripts/init_postgres.py` after setting `backend/.env`. SQLAlchemy `create_all` only creates missing tables; it does not delete your existing rows. This release adds `LessonProgress`.

## Current file/media scope
Course lessons and assignment submissions support text plus `VideoURL`, `ResourceURL` and `AttachmentURL`. Direct binary file/video upload to cloud object storage is not included yet. Use hosted URLs now; add S3/Cloudinary/Supabase Storage when production file uploads are required.

## Verification performed in the release workspace
- Python source compilation passed for `backend/app`.
- Root Node orchestration scripts passed Node syntax validation.
- All frontend TypeScript/TSX source files passed TypeScript syntax parsing.
- A full dependency-aware Next.js build could not be run in the packaging sandbox because npm dependency installation was incomplete there. Run `npm run check` and `npm run build` on your Windows machine after extraction.
