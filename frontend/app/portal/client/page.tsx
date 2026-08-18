import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false }
};

export default function ClientPortalPage() {
  return (
    <>
      <PageHero eyebrow="Client Portal" title="Sign in to track your project" />
      <section className="section-y">
        <div className="container-px mx-auto max-w-md rounded-2xl glass p-8 text-center">
          <Briefcase className="mx-auto text-cyan" size={32} />
          <p className="mt-4 text-sm text-muted">
            Project status, invoices, and deliverables live behind sign-in. This portal connects
            to the client-facing backend once authentication is configured.
          </p>
          <div className="mt-6 space-y-3">
            <input
              placeholder="Work email"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-cyan/50"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-cyan/50"
            />
            <Button className="w-full justify-center">
              Sign In
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted">
            Not a client yet? <a href="/contact" className="text-cyan">Start a project</a>
          </p>
        </div>
      </section>
    </>
  );
}
