"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Award, BookOpen, CheckCircle2, Clock, ExternalLink } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function CoursePage() {
  const slug = String(useParams().slug || "");
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/lms/catalog/${encodeURIComponent(slug)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then(setCourse)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <main className="container-px mx-auto max-w-6xl py-24">Loading course...</main>;
  }

  if (!course) {
    return (
      <main className="container-px mx-auto max-w-6xl py-24">
        <h1 className="text-3xl font-black">Course not found</h1>
        <Link href="/academy" className="mt-4 inline-block font-bold text-blue-700">
          Back to Academy
        </Link>
      </main>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-blue-700 to-slate-950 py-20 text-white">
        <div className="container-px mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-200">
            Intellix Academy · {course.Level}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black sm:text-5xl">{course.Title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            {course.ShortDescription || course.Description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register/student" className="rounded-xl bg-white px-5 py-3 font-bold text-blue-700">
              Create student account
            </Link>
            <Link href="/login" className="rounded-xl border border-white/30 px-5 py-3 font-bold">
              Student login
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <div className="space-y-3">
            <Info icon={<BookOpen />} text={`Level: ${course.Level}`} />
            <Info
              icon={<Award />}
              text={Number(course.Price || 0) === 0 ? "Free course" : `Fee: PKR ${Number(course.Price).toLocaleString()}`}
            />
            <Info icon={<Clock />} text="Progress is tracked lesson by lesson after enrollment" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-950">About this course</h2>
            <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-600">
              {course.Description || course.ShortDescription}
            </p>

            <h3 className="mt-8 text-xl font-black text-slate-950">Preview lessons</h3>
            <div className="mt-4 space-y-3">
              {course.preview_lessons?.length ? (
                course.preview_lessons.map((lesson: any) => (
                  <div key={lesson.LessonID} className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex gap-3">
                      <CheckCircle2 className="text-blue-700" />
                      <div>
                        <h4 className="font-bold">{lesson.Title}</h4>
                        {lesson.Content && (
                          <p className="mt-2 line-clamp-3 text-sm text-slate-600">{lesson.Content}</p>
                        )}
                        {lesson.VideoURL && (
                          <a
                            className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-blue-700"
                            href={lesson.VideoURL}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Preview video <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">Preview lessons will be added by the instructor.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-slate-700">
      <span className="text-blue-700">{icon}</span>
      <span className="text-sm font-semibold">{text}</span>
    </div>
  );
}
