import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { pricingTiers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Engagement models for Intellix software, AI, and data analytics projects."
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Engagement models that match how you build"
        description="Every quote is scoped to the project. These tiers show how engagements are typically structured."
      />

      <section className="section-y">
        <div className="container-px mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-2xl p-8 ${
                tier.highlighted ? "glass-strong ring-1 ring-cyan/40 shadow-glow" : "glass"
              }`}
            >
              {tier.highlighted && (
                <span className="eyebrow mb-3 w-fit rounded-full bg-white/5 px-3 py-1">
                  Most Common
                </span>
              )}
              <h3 className="font-heading text-lg font-semibold text-ink">{tier.name}</h3>
              <p className="mt-2 font-heading text-3xl font-bold text-ink">{tier.price}</p>
              <p className="mt-3 text-sm text-muted">{tier.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f: any) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-ink/90">
                    <Check size={16} className="mt-0.5 shrink-0 text-cyan" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant={tier.highlighted ? "primary" : "secondary"}
                className="mt-8 w-full justify-center"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
