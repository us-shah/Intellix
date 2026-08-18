import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { departments } from "@/lib/data";

export const metadata: Metadata = {
  title: "Academy",
  description:
    "Cohort-based courses in programming, web and mobile development, AI, data analytics, and DevOps — with certificates, projects, and placement support."
};

export default function AcademyPage() {
  return (
    <>
      <PageHero
        eyebrow="Intellix Academy"
        title="Learn from engineers who ship production code"
        description="Six departments, project-based curricula, and placement support for graduates who perform."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-6xl space-y-14">
          {departments.map((dept) => (
            <div key={dept.slug}>
              <h2 className="font-heading text-xl font-semibold text-ink">{dept.name}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {dept.courses.map((course: any) => (
                  <Link
                    key={course.slug}
                    href={`/academy/${course.slug}`}
                    className="group flex flex-col justify-between rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:border-cyan/40"
                  >
                    <div>
                      <h3 className="font-heading text-base font-semibold text-ink">
                        {course.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted">{course.duration}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-sm text-cyan">
                      View course
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
