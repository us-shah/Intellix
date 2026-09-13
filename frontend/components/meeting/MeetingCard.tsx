"use client";

import Link from "next/link";
import { CalendarDays, Clock, MapPin } from "lucide-react";

interface MeetingCardProps {
  meeting: any;
  onEdit: (meeting: any) => void;
  onDelete: (meeting: any) => void;
}

export default function MeetingCard({
  meeting,
  onEdit,
  onDelete,
}: MeetingCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-500 transition">

      <div className="flex justify-between items-start">

        <div>

          <Link
            href={`/dashboard/meetings/${meeting.MeetingID}`}
            className="text-xl font-semibold text-cyan-400 hover:underline"
          >
            {meeting.Title}
          </Link>

          <p className="text-gray-400 mt-2">
            {meeting.Description || "No Description"}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm
            ${
              meeting.Status === "Completed"
                ? "bg-green-600"
                : meeting.Status === "Cancelled"
                ? "bg-red-600"
                : "bg-yellow-600"
            }`}
        >
          {meeting.Status}
        </span>

      </div>

      <div className="mt-5 space-y-2 text-gray-300">

        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          {meeting.MeetingDate}
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} />
          {meeting.MeetingTime}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {meeting.Location || "N/A"}
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(meeting)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(meeting)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}