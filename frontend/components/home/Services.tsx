"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const categories = Object.keys(services) as (keyof typeof services)[];

export default function Services() {
  const [active, setActive] = useState<keyof typeof services>(categories[0]);

  return (
    <section className="section-y">
      <div className="container-px mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What We Build"
            title="Featured services, grouped by discipline"
            description="A sample of what each division delivers. Full scopes are tailored per engagement."
          />
          <Button href="/services" variant="secondary" className="w-fit">
            View all services
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                active === cat
                  ? "bg-signal-gradient text-white shadow-glow"
                  : "glass text-muted hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {services[active].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl glass p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-cyan">
                  <Check size={16} />
                </span>
                <span className="text-sm text-ink">{item}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
