import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values, milestones } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Intellix is a software house, AI lab, data analytics studio, and technology academy — here's how we got here and what we believe."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Intellix"
        title="A technology company built to keep its own promises"
        description="We started as a two-person software shop. Today we're eight divisions working under one delivery standard — and an academy training the next generation to meet it."
      />

      <section className="section-y">
        <div className="container-px mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div className="rounded-2xl glass p-8">
            <span className="eyebrow">Mission</span>
            <p className="mt-3 font-heading text-xl font-semibold text-ink">
              Empowering businesses and individuals through intelligent software, AI,
              data analytics, cloud technologies, and industry-focused education.
            </p>
          </div>
          <div className="rounded-2xl glass p-8">
            <span className="eyebrow">Vision</span>
            <p className="mt-3 font-heading text-xl font-semibold text-ink">
              To become one of Pakistan's leading global technology companies — known for
              engineering excellence in software, AI, analytics, cloud, and education.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface/30">
        <div className="container-px mx-auto max-w-6xl">
          <SectionHeading eyebrow="What We Believe" title="Values that shape how we work" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl glass p-6">
                <h3 className="font-heading text-sm font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <SectionHeading eyebrow="Our Story" title="From two engineers to eight divisions" align="center" />
          <div className="relative mt-14 space-y-10 border-l border-white/10 pl-8">
            {milestones.map((m) => (
              <div key={m.year} className="relative">
                <span className="absolute -left-[2.55rem] flex h-5 w-5 items-center justify-center rounded-full bg-signal-gradient ring-4 ring-base" />
                <span className="font-mono text-xs text-cyan">{m.year}</span>
                <p className="mt-1 text-sm leading-relaxed text-ink/90 sm:text-base">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
