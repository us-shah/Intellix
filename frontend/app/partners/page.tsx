import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Partners",
  description: "Technology and academic partners working with Intellix."
};

const partners = [
  { name: "Nexora Retail", type: "Client Partner" },
  { name: "Vertex Health", type: "Client Partner" },
  { name: "Alden Manufacturing", type: "Client Partner" },
  { name: "Bright Path Schools", type: "Academy Partner" },
  { name: "Meridian Bank", type: "Client Partner" },
  { name: "Solace Logistics", type: "Client Partner" }
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Organizations we build and teach with"
        description="Clients, academic institutions, and technology partners across our network."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-5xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <div key={p.name} className="rounded-2xl glass p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 font-heading text-sm text-muted">
                {p.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="mt-4 font-heading text-sm font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-xs text-cyan">{p.type}</p>
            </div>
          ))}
        </div>

        <div className="container-px mx-auto mt-14 max-w-3xl rounded-2xl glass-strong p-8 text-center">
          <h2 className="font-heading text-xl font-semibold text-ink">Become a partner</h2>
          <p className="mt-2 text-sm text-muted">
            We work with academic institutions on curriculum and with technology vendors on
            joint delivery. Reach out to explore a partnership.
          </p>
          <div className="mt-6">
            <Button href="/contact">Get in Touch</Button>
          </div>
        </div>
      </section>
    </>
  );
}
