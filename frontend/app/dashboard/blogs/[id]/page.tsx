"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Calendar,
  User,
} from "lucide-react";

import { getBlog } from "@/lib/blog";

export default function BlogDetailsPage() {

  const { id } = useParams();

  const router = useRouter();

  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    loadBlog();
  }, []);

  async function loadBlog() {
    const data = await getBlog(Number(id));
    setBlog(data);
  }

  if (!blog)
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    );

  return (

    <main className="p-8 text-white">

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-cyan-400"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-slate-900 rounded-xl overflow-hidden">

        <img
          src={
            blog.Image ||
            "https://placehold.co/1200x500?text=Blog"
          }
          className="w-full h-96 object-cover"
          alt={blog.Title}
        />

        <div className="p-8">

          <span
            className={`px-4 py-2 rounded-full ${
              blog.Status === "Published"
                ? "bg-green-600"
                : "bg-yellow-600"
            }`}
          >
            {blog.Status}
          </span>

          <h1 className="text-5xl font-bold mt-6">
            {blog.Title}
          </h1>

          <div className="flex gap-8 mt-6 text-gray-400">

            <div className="flex items-center gap-2">
              <User size={18} />
              {blog.Author}
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(
                blog.CreatedAt
              ).toLocaleDateString()}
            </div>

          </div>

          <p className="mt-8 text-xl text-gray-300">
            {blog.Summary}
          </p>

          <article className="mt-10 whitespace-pre-wrap leading-8 text-gray-200">
            {blog.Content}
          </article>

        </div>

      </div>

    </main>
  );
}