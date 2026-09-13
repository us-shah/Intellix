interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-semibold leading-tight text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted text-base leading-relaxed">{description}</p>
      )}
    </div>
  );
}
