"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Award, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const highlights = [
  { icon: GraduationCap, label: "6 departments", detail: "Programming to DevOps" },
  { icon: Award, label: "Certificate + Portfolio", detail: "On every track" },
  { icon: Briefcase, label: "Placement support", detail: "Internships & referrals" }
];

export default function AcademySpotlight() {
  return (
    <section className="section-y">
      <div className="container-px mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative h-80 overflow-hidden rounded-2xl glass sm:h-96"
        >
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
            alt="Intellix Academy students in a training session"
            fill
            className="object-cover"
          />
        </motion.div>

        <div>
          <SectionHeading
            eyebrow="Intellix Academy"
            title="Where our engineers — and yours — get trained"
            description="Cohort-based courses in programming, web and mobile development, AI, data analytics, and DevOps, taught by engineers who ship production code."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((h) => (
              <div key={h.label} className="rounded-xl glass p-4">
                <h.icon className="text-cyan" size={20} />
                <p className="mt-3 text-sm font-semibold text-ink">{h.label}</p>
                <p className="text-xs text-muted">{h.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button href="/academy">Browse Courses</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
