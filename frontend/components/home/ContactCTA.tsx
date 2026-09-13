"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function ContactCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  }

  return (
    <section className="section-y">
      <div className="container-px mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl glass-strong px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue/20 blur-3xl" />

          <h2 className="relative font-heading text-3xl font-semibold text-ink sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted">
            Tell us what you're building. A senior engineer will reply within one business day
            with next steps — no sales queue.
          </p>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact">Talk to Our Team</Button>
            <Button href="/pricing" variant="secondary">
              See Pricing
            </Button>
          </div>

          <div className="relative mx-auto mt-12 max-w-md border-t border-white/10 pt-8">
            <p className="text-sm text-muted">
              Or get product and academy updates, once or twice a month.
            </p>
            {submitted ? (
              <p className="mt-4 text-sm text-cyan">You're subscribed. Welcome aboard.</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full flex-1 rounded-full glass px-5 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none"
                />
                <Button className="!px-6">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
