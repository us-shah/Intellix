import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center text-center container-px">
      <span className="eyebrow">Error 404</span>
      <h1 className="mt-4 font-heading text-4xl font-bold text-ink sm:text-5xl">
        This page doesn't exist
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you're looking for may have moved or was never built. Let's get you back on
        track.
      </p>
      <div className="mt-8">
        <Button href="/">Back to Homepage</Button>
      </div>
    </section>
  );
}
