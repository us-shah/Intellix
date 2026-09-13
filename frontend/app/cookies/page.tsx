import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Intellix uses cookies on this website."
};

export default function CookiesPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie Policy" />
      <section className="section-y">
        <div className="container-px mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
          <p>Last updated: July 2026</p>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">1. What cookies we use</h2>
            <p className="mt-2">
              We use essential cookies required for the site to function, and analytics cookies
              that help us understand how the site is used. We do not use cookies for
              third-party advertising.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">2. Managing cookies</h2>
            <p className="mt-2">
              Most browsers let you block or delete cookies through their settings. Blocking
              essential cookies may affect site functionality such as staying signed in to a
              portal.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">3. Changes</h2>
            <p className="mt-2">
              We'll update this page if our cookie usage changes materially.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
