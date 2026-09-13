"use client";

import { useState } from "react";
import { Mail, Phone, Clock, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're building"
        description="A senior engineer replies within one business day — no sales queue."
      />

      <section className="section-y">
        <div className="container-px mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl glass p-4">
              <Mail size={18} className="shrink-0 text-cyan" />
              <span className="text-sm text-ink">hello@intellix.com</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl glass p-4">
              <Phone size={18} className="shrink-0 text-cyan" />
              <span className="text-sm text-ink">+92 300 1234567</span>
            </div>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl glass p-4 transition-colors hover:border-cyan/40"
            >
              <MessageCircle size={18} className="shrink-0 text-cyan" />
              <span className="text-sm text-ink">Chat on WhatsApp</span>
            </a>
            <div className="flex items-center gap-3 rounded-xl glass p-4">
              <Clock size={18} className="shrink-0 text-cyan" />
              <span className="text-sm text-ink">Mon–Sat, 10:00 AM – 7:00 PM PKT</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl glass p-4">
              <MapPin size={18} className="shrink-0 text-cyan" />
              <span className="text-sm text-ink">Karachi, Pakistan</span>
            </div>

            <div className="h-48 overflow-hidden rounded-xl glass">
              <div className="flex h-full w-full items-center justify-center bg-white/5 text-xs text-muted">
                Google Maps embed placeholder — add an API key to enable
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="flex items-center justify-center rounded-2xl glass p-10 text-center">
              <p className="text-ink">
                Thanks for reaching out. We've received your message and will reply within one
                business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl glass p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Full name" className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-cyan/50" />
                <input required type="email" placeholder="Email address" className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-cyan/50" />
              </div>
              <input placeholder="Company (optional)" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-cyan/50" />
              <select required defaultValue="" className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink focus:outline-none focus:border-cyan/50">
                <option value="" disabled>What do you need?</option>
                <option value="software" className="bg-surface">Custom Software</option>
                <option value="ai" className="bg-surface">AI / ML Project</option>
                <option value="data" className="bg-surface">Data Analytics</option>
                <option value="cloud" className="bg-surface">Cloud & DevOps</option>
                <option value="academy" className="bg-surface">Academy Enrollment</option>
                <option value="other" className="bg-surface">Something Else</option>
              </select>
              <textarea
                required
                placeholder="Tell us about your project"
                rows={5}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-cyan/50"
              />
              <Button className="w-full justify-center">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
