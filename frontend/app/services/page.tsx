import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2, BrainCircuit, BarChart3, GraduationCap, Cloud, FlaskConical, Megaphone, Rocket,
  ArrowUpRight, type LucideIcon
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { divisions, services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description: "Software engineering, AI, data analytics, and cloud services across Intellix's eight divisions."
};

const icons: Record<string, LucideIcon> = {
  Code2, BrainCircuit, BarChart3, GraduationCap, Cloud, FlaskConical, Megaphone, Rocket
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every capability, organized by discipline"
        description="Explore what each division delivers, then get in touch to scope your project."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-6xl grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((d) => {
            const Icon = icons[d.icon];
            return (
              <Link
                key={d.slug}
                href={`/services/${d.slug}`}
                className="group flex flex-col rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:border-cyan/40 hover:shadow-glow"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-gradient text-white">
                    <Icon size={20} />
                  </span>
                  <ArrowUpRight size={16} className="text-muted opacity-0 group-hover:opacity-100" />
                </div>
                <h3 className="mt-5 font-heading text-base font-semibold text-ink">Intellix {d.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-y bg-surface/30">
        <div className="container-px mx-auto max-w-5xl space-y-10">
          {Object.entries(services).map(([category, items]) => (
            <div key={category}>
              <h2 className="font-heading text-xl font-semibold text-ink">{category}</h2>
              <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {items.map((item) => (
                  <li key={item} className="text-sm text-muted">— {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
