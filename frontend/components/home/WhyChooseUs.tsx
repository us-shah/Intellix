"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Gauge, Users, Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    icon: ShieldCheck,
    title: "Security by default",
    description:
      "Role-based access, encrypted data, and audit trails are built in, not bolted on after a client asks."
  },
  {
    icon: Gauge,
    title: "Built to scale",
    description:
      "Architectures are load-tested against your projected traffic, not just today's numbers."
  },
  {
    icon: Users,
    title: "Senior engineers only",
    description:
      "Every project is led by an engineer with 5+ years of production experience — no learning on your bill."
  },
  {
    icon: Layers,
    title: "One team, every layer",
    description:
      "Frontend, backend, data, and infrastructure sit under one roof, so nothing gets lost in handoffs."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="section-y">
      <div className="container-px mx-auto max-w-6xl grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Why Intellix"
          title="Engineering discipline that clients can verify"
          description="We'd rather be judged on uptime, response times, and delivery dates than on adjectives."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl glass p-6"
            >
              <p.icon className="text-cyan" size={22} />
              <h3 className="mt-4 font-heading text-sm font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
