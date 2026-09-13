import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/lib/data";

const images: Record<string, string> = {
  "meridian-bank-loan-platform":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  "vertex-health-clinical-assistant":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  "nexora-retail-bi-suite":
    "https://images.unsplash.com/photo-1551288049-a205e0f4a1c1?w=1200&q=80"
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = caseStudies.find((c) => c.slug === params.slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((c) => c.slug === params.slug);
  if (!study) notFound();

  return (
    <>
      <PageHero eyebrow={`${study.client} · ${study.division}`} title={study.title} />

      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl glass sm:h-96">
            <Image src={images[study.slug]} alt={study.title} fill className="object-cover" />
          </div>

          <p className="mt-8 text-base leading-relaxed text-ink/90">{study.summary}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {study.results.map((r: any) => (
              <div key={r} className="rounded-xl glass p-5 text-center">
                <p className="font-heading text-lg font-semibold text-ink">{r}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/contact">Start a Similar Project</Button>
          </div>
        </div>
      </section>
    </>
  );
}
