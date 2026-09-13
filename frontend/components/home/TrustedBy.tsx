const partners = [
  "Nexora Retail",
  "Vertex Health",
  "Alden Manufacturing",
  "Bright Path Schools",
  "Meridian Bank",
  "Solace Logistics"
];

export default function TrustedBy() {
  return (
    <section className="py-14">
      <div className="container-px mx-auto max-w-6xl">
        <p className="text-center text-xs uppercase tracking-widest text-muted/70">
          Trusted by teams building real products
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((name) => (
            <span
              key={name}
              className="font-heading text-lg font-semibold text-muted/50 grayscale transition-all hover:text-ink hover:grayscale-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
