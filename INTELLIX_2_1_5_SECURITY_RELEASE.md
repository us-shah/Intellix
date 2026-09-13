# Intellix 2.1.5 — Session Security & Super Admin RBAC

This release adds server-side sessions, idle timeout, absolute timeout, session revocation, direct-route protection, owner-only role assignment, permission matrices, standard business roles, and session revocation after privilege changes.

## Upgrade an existing Neon database

```powershell
python scripts/init_postgres.py
python scripts/seed_postgres.py
```

Then sign out and sign in again. Pre-2.1.5 JWTs do not contain a server-side session ID and are intentionally rejected.
