"use client";

import { useState } from "react";
import { MapPin, Clock, UploadCloud } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { jobs } from "@/lib/data";

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build alongside engineers who ship"
        description="Full-time roles, internships, and instructor positions across every division."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-5xl">
          <SectionHeading eyebrow="Open Roles" title="Current openings" />
          <div className="mt-8 space-y-3">
            {jobs.map((job) => (
              <div key={job.title} className="flex flex-col gap-4 rounded-xl glass p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-heading text-sm font-semibold text-ink">{job.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted">
                    <span>{job.department}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  </div>
                </div>
                <Button
      
                  variant={selectedJob === job.title ? "primary" : "secondary"}
                  onClick={() => setSelectedJob(job.title)}
                  className="w-fit !px-5 !py-2 text-xs"
                >
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface/30" id="apply">
        <div className="container-px mx-auto max-w-2xl">
          <SectionHeading
            eyebrow="Application"
            title={selectedJob ? `Apply — ${selectedJob}` : "Apply to Intellix"}
            align="center"
          />

          {submitted ? (
            <div className="mt-8 rounded-2xl glass p-8 text-center">
              <p className="text-ink">
                Thanks — your application has been received. We'll be in touch within a week.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl glass p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Full name" className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-cyan/50" />
                <input required type="email" placeholder="Email address" className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-cyan/50" />
              </div>
              <select
                required
                defaultValue={selectedJob ?? ""}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink focus:outline-none focus:border-cyan/50"
              >
                <option value="" disabled>Select a role</option>
                {jobs.map((j) => (
                  <option key={j.title} value={j.title} className="bg-surface">{j.title}</option>
                ))}
                <option value="Internship" className="bg-surface">General Internship</option>
              </select>

              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-dashed border-white/20 px-4 py-4 text-sm text-muted hover:border-cyan/50">
                <span className="flex items-center gap-2">
                  <UploadCloud size={16} />
                  {fileName ?? "Upload your resume (PDF)"}
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                />
              </label>

              <textarea
                placeholder="Anything you'd like us to know?"
                rows={4}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-cyan/50"
              />

              <Button className="w-full justify-center">
                Submit Application
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
