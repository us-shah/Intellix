"use client";

import { Mail, Calendar, Pencil, Trash2 } from "lucide-react";

interface Props {
  newsletter: any;
  onEdit: (newsletter: any) => void;
  onDelete: (newsletter: any) => void;
}

export default function NewsletterCard({
  newsletter,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500 transition">

      <div className="flex items-center gap-4">

        <div className="bg-cyan-500/20 p-3 rounded-xl">
          <Mail className="text-cyan-400" size={28} />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold">
            {newsletter.Email}
          </h2>

          <div className="flex items-center gap-2 text-gray-400 mt-2">
            <Calendar size={15} />
            {new Date(newsletter.CreatedAt).toLocaleDateString()}
          </div>
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(newsletter)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(newsletter)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}