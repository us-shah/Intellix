"use client";

import { useEffect, useState } from "react";
import {
  createNotification,
  updateNotification,
} from "@/lib/notification";

interface Props {
  open: boolean;
  notification?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NotificationModal({
  open,
  notification,
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    UserID: 1,
    Title: "",
    Message: "",
    IsRead: false,
  });

  useEffect(() => {
    if (notification) {
      setForm(notification);
    }
  }, [notification]);

  if (!open) return null;

  function change(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value,
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      if (notification) {
        await updateNotification(
          notification.NotificationID,
          form
        );
      } else {
        await createNotification(form);
      }

      onSuccess();
      onClose();

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <form
        onSubmit={save}
        className="bg-slate-900 rounded-xl w-full max-w-xl p-8 space-y-4"
      >

        <h2 className="text-2xl font-bold">

          {notification
            ? "Edit Notification"
            : "Create Notification"}

        </h2>

        <input
          name="Title"
          value={form.Title}
          onChange={change}
          placeholder="Title"
          className="w-full p-3 rounded bg-slate-800"
        />

        <textarea
          rows={5}
          name="Message"
          value={form.Message}
          onChange={change}
          placeholder="Message"
          className="w-full p-3 rounded bg-slate-800"
        />

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            name="IsRead"
            checked={form.IsRead}
            onChange={change}
          />

          Mark as Read

        </label>

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            className="bg-cyan-600 px-5 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </form>

    </div>
  );
}