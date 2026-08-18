"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Testimonials() {
  return (
    <section className="section-y">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Client Results"
          title="What it's like to work with Intellix"
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl glass p-7"
            >
              <Quote className="text-cyan/60" size={22} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <p className="font-heading text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
