"use client";

import { useEffect, useState } from "react";

import {
  createBlog,
  updateBlog,
} from "@/lib/blog";

interface Props {
  open: boolean;
  blog?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BlogModal({
  open,
  blog,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    Title: "",
    Slug: "",
    Summary: "",
    Content: "",
    Image: "",
    Author: "",
    Status: "Draft",
  });

  useEffect(() => {
    if (blog) {
      setForm({
        Title: blog.Title,
        Slug: blog.Slug,
        Summary: blog.Summary,
        Content: blog.Content,
        Image: blog.Image,
        Author: blog.Author,
        Status: blog.Status,
      });
    }
  }, [blog]);

  if (!open) return null;

  function change(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      if (blog)
        await updateBlog(blog.BlogID, form);
      else
        await createBlog(form);

      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 overflow-auto">

      <form
        onSubmit={save}
        className="bg-slate-900 rounded-xl p-8 w-full max-w-3xl space-y-4"
      >

        <h2 className="text-3xl font-bold">
          {blog ? "Edit Blog" : "New Blog"}
        </h2>

        <input
          name="Title"
          value={form.Title}
          onChange={change}
          placeholder="Title"
          className="w-full bg-slate-800 p-3 rounded"
        />

        <input
          name="Slug"
          value={form.Slug}
          onChange={change}
          placeholder="Slug"
          className="w-full bg-slate-800 p-3 rounded"
        />

        <input
          name="Image"
          value={form.Image}
          onChange={change}
          placeholder="Image URL"
          className="w-full bg-slate-800 p-3 rounded"
        />

        <input
          name="Author"
          value={form.Author}
          onChange={change}
          placeholder="Author"
          className="w-full bg-slate-800 p-3 rounded"
        />

        <select
          name="Status"
          value={form.Status}
          onChange={change}
          className="w-full bg-slate-800 p-3 rounded"
        >
          <option>Draft</option>
          <option>Published</option>
        </select>

        <textarea
          name="Summary"
          value={form.Summary}
          onChange={change}
          rows={3}
          placeholder="Summary"
          className="w-full bg-slate-800 p-3 rounded"
        />

        <textarea
          name="Content"
          value={form.Content}
          onChange={change}
          rows={10}
          placeholder="Blog Content"
          className="w-full bg-slate-800 p-3 rounded"
        />

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 px-6 py-2 rounded"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </form>

    </div>
  );
}