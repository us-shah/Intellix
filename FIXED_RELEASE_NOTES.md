# Intellix Fixed Release

This release was consolidated from the latest uploaded source.

## Fixes applied
- Added the missing `/dashboard/roles` page with working Roles CRUD integration.
- Corrected Projects navigation and added a compatibility redirect for `/dashboard/projects`.
- Replaced the public fixed navbar inside the admin dashboard with a dedicated high-contrast admin top bar.
- Expanded admin navigation for Enterprise, AI, Knowledge Base, LMS, HR, Finance, Support, Activity Logs and Notifications.
- Rebuilt AI Assistant and Knowledge Base pages with accessible high-contrast colors.
- Added the missing student Attendance route.
- Fixed missing hook aliases and case-sensitive module import problems.
- Fixed Activity Log type/module problems.
- Fixed Settings hook and card implementation.
- Restored missing Service dashboard components.
- Fixed React `useEffect` Promise-return problems in LMS pages.
- Fixed LMS course null/type handling.
- Added missing public-site content exports used by marketing pages.
- Updated shared Button component to support links and the existing primary variant.
- Added memory-conscious Next.js development configuration.

## Verification
- `npx tsc --noEmit` passes with zero TypeScript errors.
- `python -m compileall -q app` passes for the FastAPI backend.
- Full Next production build could not be executed in the Linux build sandbox because the uploaded `node_modules` contains Windows binaries and the sandbox package mirror could not download the Linux Next.js SWC binary. Run `npm install` followed by `npm run build` on Windows before deployment.

## Before running
Do not copy `.env` secrets into GitHub. Keep `backend/.env` and `frontend/.env.local` local or set them in your deployment provider.
