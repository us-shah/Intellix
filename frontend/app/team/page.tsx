import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the people leading Intellix's divisions."
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="The people behind Intellix"
        description="Division leads and senior engineers who review every project before it ships."
      />

      <section className="section-y">
        <div className="container-px mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="rounded-2xl glass p-6 text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-signal-gradient" />
              <h3 className="mt-4 font-heading text-sm font-semibold text-ink">{member.name}</h3>
              <p className="mt-1 text-xs text-cyan">{member.role}</p>
              <p className="mt-1 text-xs text-muted">{member.division}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
