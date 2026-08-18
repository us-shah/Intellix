import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of Intellix's website and services."
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="section-y">
        <div className="container-px mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
          <p>Last updated: July 2026</p>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">1. Acceptance of terms</h2>
            <p className="mt-2">
              By using this website or engaging Intellix for services, you agree to these
              terms. Service-specific terms (statements of work, enrollment agreements) take
              precedence where they conflict with this page.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">2. Services</h2>
            <p className="mt-2">
              Software, AI, data analytics, cloud, and Academy services are delivered under
              individually scoped agreements. Availability, timelines, and pricing described on
              this site are illustrative and confirmed in writing before work begins.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">3. Intellectual property</h2>
            <p className="mt-2">
              Unless otherwise agreed in a project contract, work product created for a client
              transfers to that client on final payment. Intellix retains rights to its own
              tools, frameworks, and pre-existing IP used in delivery.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">4. Limitation of liability</h2>
            <p className="mt-2">
              Intellix is not liable for indirect or consequential damages arising from use of
              this website. Liability for delivered services is governed by the relevant client
              agreement.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">5. Contact</h2>
            <p className="mt-2">Questions about these terms can be sent to hello@intellix.com.</p>
          </div>
        </div>
      </section>
    </>
  );
}
