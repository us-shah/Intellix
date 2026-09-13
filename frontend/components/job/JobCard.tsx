"use client";

import {
  Briefcase,
  MapPin,
  Building2,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  job: any;
  onEdit: (job: any) => void;
  onDelete: (job: any) => void;
}

export default function JobCard({
  job,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 hover:border-cyan-500 transition">

      <div className="flex justify-between">

        <div>

          <h2 className="text-xl font-bold">
            {job.Title}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-gray-400">
            <Building2 size={16} />
            {job.Department}
          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            job.Status === "Open"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {job.Status}
        </span>

      </div>

      <div className="space-y-2 mt-6">

        <div className="flex gap-2 items-center">
          <MapPin size={16} />
          {job.Location}
        </div>

        <div className="flex gap-2 items-center">
          <Briefcase size={16} />
          {job.EmploymentType}
        </div>

        <div className="flex gap-2 items-center">
          <DollarSign size={16} />
          {job.Salary}
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(job)}
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(job)}
          className="bg-red-600 hover:bg-red-700 p-2 rounded"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}