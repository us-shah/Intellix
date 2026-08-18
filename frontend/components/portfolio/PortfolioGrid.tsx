"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/data";

const categories = ["All", ...Array.from(new Set(caseStudies.map((c) => c.division)))];

const images: Record<string, string> = {
  "meridian-bank-loan-platform":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  "vertex-health-clinical-assistant":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "nexora-retail-bi-suite":
    "https://images.unsplash.com/photo-1551288049-a205e0f4a1c1?w=800&q=80"
};

export default function PortfolioGrid() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? caseStudies : caseStudies.filter((c) => c.division === filter);

  return (
    <section className="section-y">
      <div className="container-px mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                filter === cat ? "bg-signal-gradient text-white shadow-glow" : "glass text-muted hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/case-studies/${project.slug}`}
              className="group overflow-hidden rounded-2xl glass"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={images[project.slug]}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base/80 to-transparent" />
              </div>
              <div className="p-6">
                <span className="eyebrow">{project.division}</span>
                <h3 className="mt-2 font-heading text-base font-semibold text-ink">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{project.client}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
