"use client";

import { Mail, Pencil, Trash2 } from "lucide-react";

interface Props {
  contact: any;
  onEdit: (contact: any) => void;
  onDelete: (contact: any) => void;
}

export default function ContactCard({
  contact,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500 transition">

      <div className="flex gap-4">

        <div className="bg-cyan-500/20 p-3 rounded-xl h-fit">
          <Mail className="text-cyan-400" size={28} />
        </div>

        <div className="flex-1">

          <h2 className="text-xl font-bold">
            {contact.FullName}
          </h2>

          <p className="text-gray-400 mt-2">
            {contact.Email}
          </p>

          <p className="text-gray-400">
            {contact.Phone}
          </p>

          <div className="mt-4">

            <span className="text-gray-500 text-sm">
              Subject
            </span>

            <p>{contact.Subject}</p>

          </div>

          <div className="mt-4">

            <span className="text-gray-500 text-sm">
              Status
            </span>

            <div className="mt-2">

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  contact.Status === "New"
                    ? "bg-green-700"
                    : "bg-yellow-700"
                }`}
              >
                {contact.Status}
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(contact)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex gap-2 items-center"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(contact)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex gap-2 items-center"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}