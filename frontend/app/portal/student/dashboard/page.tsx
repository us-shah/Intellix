"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  CheckCircle2,
  TrendingUp,
  CalendarDays,
  FileText,
  Award,
  Bell,
  LogOut,
  ArrowRight,
  Clock3,
} from "lucide-react";

import api from "@/lib/api";

interface Course {
  EnrollmentID?: number;
  CourseID?: number;
  Title?: string;
  ShortDescription?: string;
  ProgressPercent?: number;
  Status?: string;
  Thumbnail?: string;
  InstructorName?: string;
}

export default function StudentDashboardPage() {
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [coursesResponse, profileResponse] = await Promise.all([
          api.get("/lms/my-courses"),
          api.get("/portal/me"),
        ]);

        setCourses(
          Array.isArray(coursesResponse.data)
            ? coursesResponse.data
            : []
        );

        const fullName =
          profileResponse.data?.FullName ??
          profileResponse.data?.full_name ??
          "Student";

        setUserName(fullName);
      } catch (error) {
        console.error("Failed to load student dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const stats = useMemo(() => {
    const enrolled = courses.length;

    const completed = courses.filter((course) => {
      const progress = Number(course.ProgressPercent ?? 0);
      return progress >= 100 || String(course.Status).toLowerCase() === "completed";
    }).length;

    const averageProgress =
      enrolled === 0
        ? 0
        : Math.round(
            courses.reduce(
              (sum, course) => sum + Number(course.ProgressPercent ?? 0),
              0
            ) / enrolled
          );

    return {
      enrolled,
      completed,
      averageProgress,
    };
  }, [courses]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_role");

    document.cookie = "access_token=; Max-Age=0; path=/";
    document.cookie = "user_role=; Max-Age=0; path=/";

    router.replace("/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <GraduationCap className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-xl font-bold">Intellix Student LMS</h1>
              <p className="text-sm text-slate-300">
                Courses, assignments and learning progress
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-slate-400">Student</p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Welcome */}
        <section className="mb-8 rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-8 text-white shadow-xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-100">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold">
                Keep learning, {userName}
              </h2>

              <p className="mt-3 max-w-2xl text-blue-100">
                Continue your courses, track progress, complete assignments,
                and review your results from one place.
              </p>
            </div>

            <Link
              href="/portal/student/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Browse my courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-5 md:grid-cols-3">
          <StatCard
            title="Enrolled Courses"
            value={stats.enrolled}
            icon={<BookOpen className="h-6 w-6" />}
            description="Courses currently assigned"
          />

          <StatCard
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle2 className="h-6 w-6" />}
            description="Courses completed"
          />

          <StatCard
            title="Average Progress"
            value={`${stats.averageProgress}%`}
            icon={<TrendingUp className="h-6 w-6" />}
            description="Across all courses"
          />
        </section>

        {/* Quick actions */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                Quick Actions
              </h3>
              <p className="text-sm text-slate-500">
                Access the most important student tools
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              href="/portal/student/courses"
              title="My Courses"
              description="Continue lessons"
              icon={<BookOpen className="h-5 w-5" />}
            />

            <QuickAction
              href="/portal/student/assignments"
              title="Assignments"
              description="View and submit work"
              icon={<FileText className="h-5 w-5" />}
            />

            <QuickAction
              href="/portal/student/results"
              title="Results"
              description="Check marks and feedback"
              icon={<Award className="h-5 w-5" />}
            />

            <QuickAction
              href="/portal/student/attendance"
              title="Attendance"
              description="Track attendance"
              icon={<CalendarDays className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* Main content */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Courses */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  My Courses
                </h3>
                <p className="text-sm text-slate-500">
                  Your enrolled learning programs
                </p>
              </div>

              <Link
                href="/portal/student/courses"
                className="text-sm font-bold text-blue-700 hover:text-blue-900"
              >
                View all
              </Link>
            </div>

            {loading ? (
              <div className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
                Loading courses...
              </div>
            ) : courses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <BookOpen className="mx-auto h-10 w-10 text-slate-400" />

                <h4 className="mt-4 text-lg font-bold text-slate-800">
                  No courses assigned yet
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  When an administrator or instructor enrolls you in a course,
                  it will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.slice(0, 5).map((course, index) => {
                  const progress = Math.min(
                    100,
                    Math.max(0, Number(course.ProgressPercent ?? 0))
                  );

                  return (
                    <div
                      key={course.EnrollmentID ?? course.CourseID ?? index}
                      className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-md"
                    >
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                              {course.Status ?? "Active"}
                            </span>

                            {course.InstructorName && (
                              <span className="text-xs text-slate-500">
                                Instructor: {course.InstructorName}
                              </span>
                            )}
                          </div>

                          <h4 className="text-lg font-bold text-slate-950">
                            {course.Title ?? "Untitled course"}
                          </h4>

                          {course.ShortDescription && (
                            <p className="mt-1 text-sm text-slate-600">
                              {course.ShortDescription}
                            </p>
                          )}

                          <div className="mt-4">
                            <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                              <span className="text-slate-600">
                                Progress
                              </span>
                              <span className="text-blue-700">
                                {progress}%
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-full rounded-full bg-blue-600 transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/portal/student/courses/${course.CourseID ?? ""}`}
                          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                        >
                          Continue
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right side */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Clock3 className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">
                    Upcoming
                  </h3>
                  <p className="text-xs text-slate-500">
                    Deadlines and learning activity
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <InfoRow
                  title="Assignments"
                  value="Check pending work"
                  href="/portal/student/assignments"
                />

                <InfoRow
                  title="Attendance"
                  value="Review attendance"
                  href="/portal/student/attendance"
                />

                <InfoRow
                  title="Results"
                  value="View grades"
                  href="/portal/student/results"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-lg">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                <Bell className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-bold">
                Stay up to date
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Course announcements, assignment deadlines, and instructor
                updates will appear in your student portal.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-600">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
          {icon}
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
        {icon}
      </div>

      <h4 className="font-bold text-slate-950">
        {title}
      </h4>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </Link>
  );
}

function InfoRow({
  title,
  value,
  href,
}: {
  title: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50"
    >
      <div>
        <p className="text-sm font-bold text-slate-900">
          {title}
        </p>

        <p className="text-xs text-slate-500">
          {value}
        </p>
      </div>

      <ArrowRight className="h-4 w-4 text-slate-400" />
    </Link>
  );
}