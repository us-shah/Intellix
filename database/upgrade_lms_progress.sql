-- Intellix LMS progress upgrade for existing PostgreSQL / Neon databases.
-- Safe to run once after deploying this release.
CREATE TABLE IF NOT EXISTS "LessonProgress" (
    "LessonProgressID" SERIAL PRIMARY KEY,
    "EnrollmentID" INTEGER NOT NULL REFERENCES "Enrollments"("EnrollmentID") ON DELETE CASCADE,
    "LessonID" INTEGER NOT NULL REFERENCES "Lessons"("LessonID") ON DELETE CASCADE,
    "IsCompleted" BOOLEAN NOT NULL DEFAULT TRUE,
    "CompletedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_EnrollmentLessonProgress" UNIQUE ("EnrollmentID", "LessonID")
);
CREATE INDEX IF NOT EXISTS "ix_LessonProgress_LessonProgressID" ON "LessonProgress" ("LessonProgressID");
