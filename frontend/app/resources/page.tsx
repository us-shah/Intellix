import type { Metadata } from "next";
import { FileDown } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { resources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, whitepapers, and templates from Intellix."
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Guides and templates from our teams"
        description="Practical resources our engineers and analysts actually use."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-3xl space-y-4">
          {resources.map((r) => (
            <div key={r.title} className="flex items-center justify-between rounded-2xl glass p-6">
              <div>
                <h3 className="font-heading text-sm font-semibold text-ink">{r.title}</h3>
                <p className="mt-1 text-xs text-muted">{r.type}</p>
              </div>
              <FileDown size={20} className="shrink-0 text-cyan" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
