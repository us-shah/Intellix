import { technologies } from "@/lib/data";

export default function TechMarquee() {
  const items = [...technologies, ...technologies];

  return (
    <section className="border-y border-white/5 bg-surface/50 py-8">
      <p className="container-px mx-auto mb-6 max-w-7xl text-center text-xs uppercase tracking-widest text-muted/70">
        Technologies our teams ship with daily
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base to-transparent" />
        <div className="flex w-max animate-marquee gap-12">
          {items.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-heading text-lg font-medium text-muted/60 transition-colors hover:text-ink"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
