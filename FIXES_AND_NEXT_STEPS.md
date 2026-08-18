# Intellix CRM patched source

## Applied fixes
- Renamed Jobs route files from `.ts` to `.tsx`.
- Renamed `MeetingModal.py` to `MeetingModal.tsx`.
- Renamed Newsletter route files from `pages.tsx` to `page.tsx`.
- Renamed `components/taks` to `components/tasks` and updated matching imports.
- Added Task types, card, table, and modal starter implementations.
- Added Deal types and DealTable implementation.
- Added Lead details page implementation.
- Added Profile page starter implementation.
- Removed plaintext password and password-hash debug logging from backend authentication.

## Still pending
The frontend still has pre-existing TypeScript issues unrelated to the files above, including:
- Missing exports in `frontend/lib/data.ts` used by public website pages.
- Case-sensitive import mismatches such as `activityLog` vs `activitylog` and `service` vs `services`.
- Missing hooks such as `useJobs`, `useMeetings`, `useProjects`, `useBlogs`, and `useContacts`.
- Button component does not support the `href` prop used by several website pages.
- Incomplete settings and activity-log type files.
- Full profile API, refresh tokens, logout revocation, forgot/reset password, and RBAC permissions.

## Recommended verification commands
Backend:
```powershell
cd D:\intillix2\backend
python -m compileall app
uvicorn app.main:app --reload
```

Frontend:
```powershell
cd D:\intillix2\frontend
npm install
npx tsc --noEmit
npm run dev
```
