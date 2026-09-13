"use client";

import { motion } from "framer-motion";
import { process } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Process() {
  return (
    <section className="section-y bg-surface/30">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How We Work"
          title="A delivery process built for accountability"
          align="center"
          description="The same four stages run on every engagement, from a two-week prototype to a multi-quarter platform build."
        />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-6 left-0 right-0 hidden h-px bg-white/10 lg:block" />
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative"
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-base font-mono text-sm text-cyan ring-1 ring-white/10">
                {p.step}
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
