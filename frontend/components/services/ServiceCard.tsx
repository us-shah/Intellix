"use client";

import { Wrench, Pencil, Trash2 } from "lucide-react";

interface Props {
  service: any;
  onEdit: (service: any) => void;
  onDelete: (service: any) => void;
}

export default function ServiceCard({
  service,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500 transition">

      <div className="flex items-start gap-4">

        <div className="bg-cyan-500/20 p-3 rounded-xl">
          <Wrench className="text-cyan-400" size={28} />
        </div>

        <div className="flex-1">

          <h2 className="text-xl font-bold">
            {service.ServiceName}
          </h2>

          <p className="text-gray-400 mt-2">
            {service.Description}
          </p>

          <div className="flex justify-between mt-6">

            <div>
              <span className="text-gray-500 text-sm">
                Icon
              </span>
              <p>{service.Icon}</p>
            </div>

            <div>
              <span className="text-gray-500 text-sm">
                Status
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  service.Status === "Active"
                    ? "bg-green-700"
                    : "bg-red-700"
                }`}
              >
                {service.Status}
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(service)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(service)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}