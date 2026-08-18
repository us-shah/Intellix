"use client";

import { History, Pencil, Trash2 } from "lucide-react";

interface Props {
  activity: any;
  onEdit: (activity: any) => void;
  onDelete: (activity: any) => void;
}

export default function ActivityLogCard({
  activity,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-500 transition">

      <div className="flex justify-between items-start">

        <div className="flex gap-3">

          <History className="text-cyan-400 mt-1" size={22} />

          <div>

            <h2 className="text-lg font-semibold">
              {activity.Action}
            </h2>

            <p className="text-gray-400 mt-2">
              Table : {activity.TableName}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Record ID : {activity.RecordID}
            </p>

            <p className="text-gray-500 text-sm">
              User ID : {activity.UserID}
            </p>

          </div>

        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(activity)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(activity)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}