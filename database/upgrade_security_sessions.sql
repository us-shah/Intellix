-- Intellix 2.1.5 security upgrade for PostgreSQL / Neon.
-- Safe to run more than once.

CREATE TABLE IF NOT EXISTS "UserSessions" (
    "SessionID" VARCHAR(64) PRIMARY KEY,
    "UserID" INTEGER NOT NULL REFERENCES "Users"("UserID") ON DELETE CASCADE,
    "UserAgent" VARCHAR(500),
    "IPAddress" VARCHAR(100),
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "LastActivityAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "ExpiresAt" TIMESTAMPTZ NOT NULL,
    "IdleExpiresAt" TIMESTAMPTZ NOT NULL,
    "RevokedAt" TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS "ix_UserSessions_UserID" ON "UserSessions"("UserID");

-- Standard owner-managed organizational roles are inserted by scripts/seed_postgres.py.
