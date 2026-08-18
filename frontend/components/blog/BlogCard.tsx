"use client";

import { Calendar, Edit, Trash2, User } from "lucide-react";

interface Props {
  blog: any;
  onEdit: (blog: any) => void;
  onDelete: (blog: any) => void;
}

export default function BlogCard({
  blog,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500 transition">

      <img
        src={
          blog.Image ||
          "https://placehold.co/600x300?text=Blog"
        }
        alt={blog.Title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-center">

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              blog.Status === "Published"
                ? "bg-green-600"
                : "bg-yellow-600"
            }`}
          >
            {blog.Status}
          </span>

        </div>

        <h2 className="text-2xl font-bold mt-4">
          {blog.Title}
        </h2>

        <p className="text-gray-400 mt-2 line-clamp-3">
          {blog.Summary}
        </p>

        <div className="flex justify-between mt-6 text-sm text-gray-400">

          <div className="flex items-center gap-2">
            <User size={15} />
            {blog.Author}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={15} />
            {new Date(blog.CreatedAt).toLocaleDateString()}
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => onEdit(blog)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() => onDelete(blog)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}