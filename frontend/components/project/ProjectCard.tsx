"use client";

import { FolderKanban, Pencil, Trash2 } from "lucide-react";

interface Props {
  project: any;
  onEdit: (project: any) => void;
  onDelete: (project: any) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500 transition">

      <div className="flex items-start gap-4">

        <div className="bg-cyan-500/20 p-3 rounded-xl">
          <FolderKanban className="text-cyan-400" size={28} />
        </div>

        <div className="flex-1">

          <h2 className="text-xl font-bold">
            {project.ProjectName}
          </h2>

          <p className="text-gray-400 mt-2">
            {project.Description}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-5 text-sm">

            <div>
              <span className="text-gray-500">Status</span>
              <p>{project.Status}</p>
            </div>

            <div>
              <span className="text-gray-500">Customer</span>
              <p>{project.CustomerID}</p>
            </div>

            <div>
              <span className="text-gray-500">Manager</span>
              <p>{project.ManagerID}</p>
            </div>

            <div>
              <span className="text-gray-500">Start</span>
              <p>
                {new Date(project.StartDate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <span className="text-gray-500">End</span>
              <p>
                {new Date(project.EndDate).toLocaleDateString()}
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(project)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(project)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}