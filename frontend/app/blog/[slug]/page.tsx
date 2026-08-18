import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <PageHero eyebrow={`${post.category} · ${post.readingTime}`} title={post.title} />

      <article className="section-y">
        <div className="container-px mx-auto max-w-2xl prose-invert">
          <p className="text-lg leading-relaxed text-ink/90">{post.excerpt}</p>
          <p className="mt-6 leading-relaxed text-muted">
            This article is served from Markdown content in the full build — this scaffold
            renders it as a static page so the routing, SEO metadata, and reading-time
            calculation are already wired up. Replace this block with the parsed Markdown
            body when the content pipeline (or CMS/backend) is connected.
          </p>
          <p className="mt-10 text-xs text-muted">
            Published {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            })}
          </p>
        </div>
      </article>
    </>
  );
}
