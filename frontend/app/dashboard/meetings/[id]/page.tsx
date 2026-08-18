"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowLeft,
} from "lucide-react";

import { getMeeting } from "@/lib/meeting";

export default function MeetingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeeting();
  }, []);

  async function loadMeeting() {
    try {
      const data = await getMeeting(Number(id));
      setMeeting(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="p-8 text-white">
        Loading...
      </main>
    );
  }

  if (!meeting) {
    return (
      <main className="p-8 text-white">
        Meeting not found.
      </main>
    );
  }

  return (
    <main className="p-8 text-white">

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-cyan-400 hover:text-cyan-300"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-slate-900 rounded-xl p-8">

        <h1 className="text-4xl font-bold mb-6">
          {meeting.Title}
        </h1>

        <div className="space-y-5">

          <div>
            <p className="text-gray-400">
              Description
            </p>

            <p className="mt-2">
              {meeting.Description || "No Description"}
            </p>
          </div>

          <div className="flex items-center gap-3">

            <CalendarDays />

            {meeting.MeetingDate}

          </div>

          <div className="flex items-center gap-3">

            <Clock />

            {meeting.MeetingTime}

          </div>

          <div className="flex items-center gap-3">

            <MapPin />

            {meeting.Location || "N/A"}

          </div>

          <div>

            <p className="text-gray-400">
              Status
            </p>

            <span className="inline-block mt-2 px-4 py-2 rounded-full bg-cyan-700">
              {meeting.Status}
            </span>

          </div>

          <div>

            <p className="text-gray-400">
              Organizer ID
            </p>

            <p className="mt-2">
              {meeting.OrganizerID}
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}