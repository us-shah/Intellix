interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="container-px relative mx-auto max-w-4xl text-center">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
