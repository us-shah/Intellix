# Intellix Session Security and RBAC

## Session model

Intellix now combines a signed JWT with a server-side PostgreSQL/Neon session row.

- The JWT contains a random `sid` (session ID).
- Every protected API request validates the JWT and the matching `UserSessions` row.
- Revoked sessions are rejected even if somebody copied an old JWT.
- Default inactivity timeout: **30 minutes**.
- Default absolute session lifetime: **8 hours**.
- The frontend uses a browser-session cookie/sessionStorage rather than a one-day persistent token.
- Protected pages validate JWT expiry in Next.js middleware.
- `SessionGuard` observes real user interaction and only touches the backend when the user was active.
- Password changes/resets revoke all sessions.
- Role changes revoke the affected user's sessions, forcing a fresh login with the new role.
- Deactivating a user revokes their sessions immediately.

Recommended production environment:

```env
ACCESS_TOKEN_EXPIRE_MINUTES=480
SESSION_IDLE_MINUTES=30
SESSION_ABSOLUTE_HOURS=8
SESSION_ACTIVITY_UPDATE_SECONDS=60
```

Run once against an existing Neon database:

```powershell
python scripts/init_postgres.py
python scripts/seed_postgres.py
```

`init_postgres.py` creates `UserSessions` without deleting existing data.

## RBAC authority model

### SUPER_ADMIN

The platform owner. `SUPER_ADMIN` bypasses permission checks and is the only role allowed to:

- create/edit/delete organizational roles;
- assign a role to a user;
- configure role permissions;
- activate/deactivate users;
- manage owner-only settings/access-control screens.

The last active SUPER_ADMIN cannot be demoted. A SUPER_ADMIN cannot deactivate or delete their own account through the user-management endpoints.

### Other roles

Seeded roles include:

- ADMIN
- MANAGER
- HR_MANAGER
- HR
- SALES_MANAGER
- SALES
- PROJECT_MANAGER
- FINANCE
- SUPPORT
- EMPLOYEE
- INSTRUCTOR
- STUDENT
- CLIENT

Super Admin can also create a custom role and select its permission checkboxes.

## Permission model

Examples:

- `users.view`
- `users.manage`
- `roles.manage`
- `permissions.manage`
- `crm.view` / `crm.manage`
- `projects.view` / `projects.manage`
- `lms.view` / `lms.manage`
- `hr.view` / `hr.manage`
- `finance.view` / `finance.manage`
- `support.view` / `support.manage`
- `content.manage`
- `ai.use`
- `audit.view`
- `settings.manage`

The frontend permission cookie is only a navigation convenience. **The backend database permission check is the security authority.** A user cannot gain API access by editing cookies or typing a protected URL manually.

## Super Admin workflow

1. Open **Dashboard → Roles & Access**.
2. Create or select a role such as `HR_MANAGER` or `SALES_MANAGER`.
3. Select the permissions that role receives and save.
4. Open **Dashboard → Users**.
5. Find the employee.
6. Select the role from **Assign Role**.
7. The backend records the role change and revokes that employee's existing sessions.
8. The employee signs in again and receives the new role + permission set.
