"use client";

import { Bell, CheckCircle, Circle } from "lucide-react";

interface NotificationCardProps {
  notification: any;
  onEdit: (notification: any) => void;
  onDelete: (notification: any) => void;
}

export default function NotificationCard({
  notification,
  onEdit,
  onDelete,
}: NotificationCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-500 transition">

      <div className="flex justify-between items-start">

        <div className="flex gap-3">

          <Bell className="text-cyan-400 mt-1" size={22} />

          <div>

            <h2 className="text-lg font-bold">
              {notification.Title}
            </h2>

            <p className="text-gray-400 mt-2">
              {notification.Message}
            </p>

          </div>

        </div>

        {notification.IsRead ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <Circle className="text-yellow-500" />
        )}

      </div>

      <div className="flex justify-between items-center mt-6">

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            notification.IsRead
              ? "bg-green-700"
              : "bg-yellow-700"
          }`}
        >
          {notification.IsRead ? "Read" : "Unread"}
        </span>

        <div className="space-x-2">

          <button
            onClick={() => onEdit(notification)}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(notification)}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}