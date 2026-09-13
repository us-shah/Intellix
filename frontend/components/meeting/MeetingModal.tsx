"use client";

import { useEffect, useState } from "react";

import {
  createMeeting,
  updateMeeting,
} from "@/lib/meeting";

interface MeetingModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  meeting?: any;
}

export default function MeetingModal({
  open,
  onClose,
  onSuccess,
  meeting,
}: MeetingModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    Title: "",
    Description: "",
    MeetingDate: "",
    MeetingTime: "",
    Location: "",
    Status: "Scheduled",
    OrganizerID: 1,
  });

  useEffect(() => {
    if (meeting) {
      setForm({
        Title: meeting.Title || "",
        Description: meeting.Description || "",
        MeetingDate: meeting.MeetingDate || "",
        MeetingTime: meeting.MeetingTime || "",
        Location: meeting.Location || "",
        Status: meeting.Status || "Scheduled",
        OrganizerID: meeting.OrganizerID || 1,
      });
    } else {
      setForm({
        Title: "",
        Description: "",
        MeetingDate: "",
        MeetingTime: "",
        Location: "",
        Status: "Scheduled",
        OrganizerID: 1,
      });
    }
  }, [meeting]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "OrganizerID"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      if (meeting) {
        await updateMeeting(meeting.MeetingID, form);
      } else {
        await createMeeting(form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">

      <div className="bg-slate-900 rounded-xl w-full max-w-2xl p-6">

        <h2 className="text-2xl font-bold mb-6 text-white">
          {meeting ? "Edit Meeting" : "Add Meeting"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="Title"
            placeholder="Meeting Title"
            value={form.Title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
          />

          <textarea
            name="Description"
            placeholder="Description"
            rows={4}
            value={form.Description}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="date"
              name="MeetingDate"
              value={form.MeetingDate}
              onChange={handleChange}
              required
              className="p-3 rounded bg-slate-800 border border-slate-700 text-white"
            />

            <input
              type="time"
              name="MeetingTime"
              value={form.MeetingTime}
              onChange={handleChange}
              required
              className="p-3 rounded bg-slate-800 border border-slate-700 text-white"
            />

          </div>

          <input
            name="Location"
            placeholder="Location"
            value={form.Location}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
          />

          <select
            name="Status"
            value={form.Status}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
          >
            <option>Scheduled</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <input
            type="number"
            name="OrganizerID"
            value={form.OrganizerID}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
          />

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded bg-gray-600 hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded bg-cyan-600 hover:bg-cyan-700"
            >
              {loading
                ? "Saving..."
                : meeting
                ? "Update Meeting"
                : "Create Meeting"}
            </button>

          </div>
        </form>

      </div>

    </div>
  );
}