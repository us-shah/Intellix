import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering, AI, and data analytics writing from the Intellix team."
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the people building the systems"
        description="Practical writing on software, AI, data, and what we learn training engineers."
      />
      <BlogGrid />
    </>
  );
}
