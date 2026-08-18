import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, User, Award, Briefcase, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { departments, courseDetails } from "@/lib/data";

const allCourses = departments.flatMap((d) =>
  d.courses.map((c: any) => ({ ...c, department: d.name }))
);

export function generateStaticParams() {
  return allCourses.map((c: any) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const course = allCourses.find((c) => c.slug === params.slug);
  if (!course) return {};
  return {
    title: course.title,
    description: `${course.title} — a ${course.duration} course in Intellix Academy's ${course.department} department.`
  };
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const base = allCourses.find((c) => c.slug === params.slug);
  if (!base) notFound();

  const details = courseDetails[params.slug];
  const outcomes = details?.outcomes ?? [
    `Build real, working projects in ${base.department.toLowerCase()}`,
    "Complete guided assignments reviewed by an instructor",
    "Finish with a portfolio-ready capstone project"
  ];
  const curriculum = details?.curriculum ?? [
    "Foundations & core concepts",
    "Guided practice projects",
    "Applied mini-projects",
    "Capstone project",
    "Portfolio review & certificate"
  ];
  const instructor = details?.instructor ?? "Assigned on enrollment";

  return (
    <>
      <PageHero
        eyebrow={`${base.department} · ${base.duration}`}
        title={base.title}
        description="Certificate on completion, guided projects, and placement assistance for top performers."
      />

      <section className="section-y">
        <div className="container-px mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl glass p-4">
              <Clock size={18} className="text-cyan" />
              <span className="text-sm text-ink">{base.duration}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl glass p-4">
              <User size={18} className="text-cyan" />
              <span className="text-sm text-ink">Instructor: {instructor}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl glass p-4">
              <Award size={18} className="text-cyan" />
              <span className="text-sm text-ink">Certificate on completion</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl glass p-4">
              <Briefcase size={18} className="text-cyan" />
              <span className="text-sm text-ink">Internship & placement assistance</span>
            </div>
            <Button href="/contact" className="mt-4 w-full justify-center">
              Enroll Now
            </Button>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">Learning outcomes</h2>
            <div className="mt-4 space-y-3">
              {outcomes.map((o: any) => (
                <div key={o} className="flex items-start gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
                  <span className="text-sm text-ink/90">{o}</span>
                </div>
              ))}
            </div>

            <h2 className="mt-8 font-heading text-lg font-semibold text-ink">Curriculum</h2>
            <ol className="mt-4 space-y-3">
              {curriculum.map((c: any, i: number) => (
                <li key={c} className="flex items-start gap-3 rounded-xl glass p-4">
                  <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-ink/90">{c}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
