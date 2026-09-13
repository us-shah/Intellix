"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, ClipboardCheck, GraduationCap, ListChecks, Plus, UserPlus } from "lucide-react";
import LmsShell from "@/components/lms/LmsShell";
import { Card, PageTitle } from "@/components/lms/Ui";
import { lmsApi } from "@/lib/lms";

export default function LmsOverviewPage() {
  const [stats, setStats] = useState({ courses: 0, enrollments: 0, assignments: 0, submissions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([lmsApi.courses(), lmsApi.enrollments(), lmsApi.assignments(), lmsApi.submissions()])
      .then(([courses, enrollments, assignments, submissions]) => {
        if (active) setStats({ courses: courses.length, enrollments: enrollments.length, assignments: assignments.length, submissions: submissions.length });
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const cards = [
    ["Courses", stats.courses, BookOpen],
    ["Enrollments", stats.enrollments, GraduationCap],
    ["Assignments", stats.assignments, ListChecks],
    ["Submissions", stats.submissions, ClipboardCheck],
  ] as const;

  return (
    <LmsShell mode="admin">
      <PageTitle title="Intellix Academy Command Center" description="Create learning programs, enroll students, publish lessons, issue assignments and review results." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value, Icon]) => (
          <Card key={label}>
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-sm font-semibold text-slate-600">{label}</p><p className="mt-2 text-3xl font-black text-slate-950">{loading ? "—" : value}</p></div>
              <span className="rounded-xl bg-blue-50 p-3 text-blue-700"><Icon className="h-5 w-5" /></span>
            </div>
          </Card>
        ))}
      </div>

      <section className="mt-7 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <Card>
          <h2 className="text-xl font-black text-slate-950">Academy workflow</h2>
          <p className="mt-1 text-sm text-slate-600">The same flow is used by Admin and Super Admin; instructors manage only the courses assigned to them.</p>
          <div className="mt-5 space-y-3">
            {[
              ["1", "Create a course", "Set title, instructor, price, level and publish status."],
              ["2", "Add lessons", "Add lesson text plus video/resource URLs and choose public previews."],
              ["3", "Enroll students", "Choose a registered STUDENT account and assign a course."],
              ["4", "Create assignments", "Set instructions, due date and maximum marks."],
              ["5", "Review submissions", "Instructor/Admin grades work and leaves feedback."],
            ].map(([n, title, text]) => (
              <div key={n} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-black text-white">{n}</span>
                <div><p className="font-bold text-slate-950">{title}</p><p className="mt-1 text-sm text-slate-600">{text}</p></div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <QuickAction href="/dashboard/lms/courses/new" icon={Plus} title="Create course" text="Start a new Academy course." />
          <QuickAction href="/dashboard/lms/enrollments" icon={UserPlus} title="Enroll student" text="Assign a registered student to a course." />
          <QuickAction href="/dashboard/lms/assignments" icon={ListChecks} title="Assignments" text="Create and manage assessed work." />
          <QuickAction href="/dashboard/lms/submissions" icon={ClipboardCheck} title="Submissions" text="Review submitted work and grading status." />
        </div>
      </section>
    </LmsShell>
  );
}

function QuickAction({ href, icon: Icon, title, text }: { href: string; icon: typeof Plus; title: string; text: string }) {
  return (
    <Link href={href} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
      <span className="rounded-xl bg-blue-700 p-3 text-white"><Icon className="h-5 w-5" /></span>
      <span><span className="block font-black text-slate-950">{title}</span><span className="mt-1 block text-sm text-slate-600">{text}</span></span>
    </Link>
  );
}
