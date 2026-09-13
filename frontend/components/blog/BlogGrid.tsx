"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { blogPosts } from "@/lib/data";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function BlogGrid() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = blogPosts.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section className="section-y">
      <div className="container-px mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles"
              className="w-full rounded-full glass py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-muted/60 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  category === cat ? "bg-signal-gradient text-white" : "glass text-muted hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl glass p-6 transition-all hover:border-cyan/40"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="eyebrow">{post.category}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
                <span>·</span>
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
              <h2 className="mt-3 font-heading text-lg font-semibold text-ink">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">No articles match your search.</p>
          )}
        </div>
      </div>
    </section>
  );
}
