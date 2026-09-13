"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  BarChart3,
  GraduationCap,
  Cloud,
  FlaskConical,
  Megaphone,
  Rocket,
  ArrowUpRight,
  type LucideIcon
} from "lucide-react";
import { divisions } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  Code2,
  BrainCircuit,
  BarChart3,
  GraduationCap,
  Cloud,
  FlaskConical,
  Megaphone,
  Rocket
};

export default function Divisions() {
  return (
    <section id="divisions" className="section-y bg-surface/30">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="One Company, Eight Disciplines"
          title="Every capability a modern technology company needs"
          description="Each division operates like a specialist studio, coordinated under a single delivery standard."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((d, i) => {
            const Icon = icons[d.icon];
            return (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              >
                <Link
                  href={`/services/${d.slug}`}
                  className="group flex h-full flex-col rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-glow"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-signal-gradient text-white">
                      <Icon size={20} />
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="mt-5 font-heading text-base font-semibold text-ink">
                    Intellix {d.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d.blurb}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
