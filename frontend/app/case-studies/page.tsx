import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "In-depth case studies on projects Intellix has delivered for clients."
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="The problem, the build, and the result"
        description="A closer look at how specific engagements were scoped, delivered, and measured."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl space-y-5">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="group block rounded-2xl glass p-7 transition-all hover:border-cyan/40"
            >
              <span className="eyebrow">{c.client} · {c.division}</span>
              <h2 className="mt-2 flex items-center justify-between font-heading text-lg font-semibold text-ink sm:text-xl">
                {c.title}
                <ArrowUpRight size={18} className="shrink-0 text-muted opacity-0 group-hover:opacity-100" />
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.results.map((r: any) => (
                  <span key={r} className="rounded-full bg-white/5 px-3 py-1 text-xs text-cyan">
                    {r}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
