"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const projects = [
  {
    title: "Meridian Bank — Loan Origination Platform",
    category: "Software House",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
  },
  {
    title: "Vertex Health — Clinical Support Assistant",
    category: "AI Lab",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    title: "Nexora Retail — Executive BI Suite",
    category: "Data Analytics",
    image:
      "https://images.unsplash.com/photo-1551288049-a205e0f4a1c1?w=800&q=80"
  }
];

export default function PortfolioPreview() {
  return (
    <section className="section-y bg-surface/30">
      <div className="container-px mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title="Recent projects across our divisions"
          />
          <Button href="/portfolio" variant="secondary" className="w-fit">
            View full portfolio
          </Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="/portfolio"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl glass"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base/80 to-transparent" />
              </div>
              <div className="p-6">
                <span className="eyebrow">{p.category}</span>
                <h3 className="mt-2 flex items-center justify-between font-heading text-base font-semibold text-ink">
                  {p.title}
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
