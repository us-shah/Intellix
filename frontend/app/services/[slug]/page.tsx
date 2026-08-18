import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Code2, BrainCircuit, BarChart3, GraduationCap, Cloud, FlaskConical, Megaphone, Rocket,
  Check, type LucideIcon
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { divisions, services } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  Code2, BrainCircuit, BarChart3, GraduationCap, Cloud, FlaskConical, Megaphone, Rocket
};

// Maps division slugs to a relevant featured-services category where one exists
const serviceCategoryBySlug: Record<string, keyof typeof services> = {
  "software-house": "Software House",
  "ai-lab": "AI & Machine Learning",
  "data-analytics": "Data Analytics",
  "cloud-solutions": "Cloud & DevOps"
};

export function generateStaticParams() {
  return divisions.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const division = divisions.find((d) => d.slug === params.slug);
  if (!division) return {};
  return {
    title: `Intellix ${division.name}`,
    description: division.blurb
  };
}

export default function DivisionPage({ params }: { params: { slug: string } }) {
  const division = divisions.find((d) => d.slug === params.slug);
  if (!division) notFound();

  const Icon = icons[division.icon];
  const categoryKey = serviceCategoryBySlug[division.slug];
  const featured = categoryKey ? services[categoryKey] : null;

  return (
    <>
      <PageHero
        eyebrow={`Division · ${division.name}`}
        title={`Intellix ${division.name}`}
        description={division.blurb}
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-signal-gradient text-white">
              <Icon size={26} />
            </span>
            <p className="text-sm text-muted">
              One of eight specialist divisions delivering under Intellix's shared engineering
              standard.
            </p>
          </div>

          {featured && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {featured.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl glass p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-cyan">
                    <Check size={16} />
                  </span>
                  <span className="text-sm text-ink">{item}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12">
            <Button href="/contact">Discuss a {division.name} Project</Button>
          </div>
        </div>
      </section>
    </>
  );
}
