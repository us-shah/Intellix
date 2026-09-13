import type { Metadata } from "next";
import { FlaskConical, FileText } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Research",
  description: "Applied research from the Intellix Research Center in machine learning and systems."
};

const publications = [
  {
    title: "Retrieval quality vs. latency trade-offs in production RAG systems",
    tag: "AI Systems",
    year: "2026"
  },
  {
    title: "Cost-aware autoscaling for burst-heavy SaaS workloads",
    tag: "Cloud Systems",
    year: "2025"
  },
  {
    title: "Evaluating agentic tool-use reliability at scale",
    tag: "AI Systems",
    year: "2025"
  }
];

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Intellix Research Center"
        title="Research that feeds directly back into what we build"
        description="Findings here inform the AI Lab's production systems and the Academy's curriculum."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <SectionHeading eyebrow="Publications" title="Recent research notes" />
          <div className="mt-8 space-y-4">
            {publications.map((p) => (
              <div key={p.title} className="flex items-start gap-4 rounded-2xl glass p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-signal-gradient text-white">
                  <FileText size={18} />
                </span>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted">{p.tag} · {p.year}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3 rounded-2xl glass p-6 text-sm text-muted">
            <FlaskConical size={18} className="shrink-0 text-cyan" />
            Interested in collaborating on applied research? Reach out through the contact page.
          </div>
        </div>
      </section>
    </>
  );
}
