import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Intellix collects, uses, and protects your data."
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="section-y">
        <div className="container-px mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
          <p>Last updated: July 2026</p>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">1. Information we collect</h2>
            <p className="mt-2">
              We collect information you provide directly — such as your name, email, and
              project details submitted through our contact and enrollment forms — along with
              standard technical data like browser type and IP address for security and
              analytics purposes.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">2. How we use it</h2>
            <p className="mt-2">
              Information is used to respond to inquiries, deliver services, process Academy
              enrollments, and improve our website. We do not sell personal data to third
              parties.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">3. Data security</h2>
            <p className="mt-2">
              Production systems use encryption in transit and at rest, role-based access
              control, and regular security review. No system is completely immune to risk, and
              we disclose material incidents promptly if they occur.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">4. Your rights</h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of your personal data at any
              time by contacting hello@intellix.com.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-ink">5. Changes to this policy</h2>
            <p className="mt-2">
              We'll update this page when our practices change and note the revision date above.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
