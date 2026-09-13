"use client";

import { useEffect, useState } from "react";
import {
  createActivity,
  updateActivity,
} from "@/lib/activitylog";

interface Props {
  open: boolean;
  activity?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ActivityLogModal({
  open,
  activity,
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    UserID: 1,
    Action: "",
    TableName: "",
    RecordID: 0,
  });

  useEffect(() => {
    if (activity) {
      setForm({
        UserID: activity.UserID,
        Action: activity.Action,
        TableName: activity.TableName,
        RecordID: activity.RecordID,
      });
    } else {
      setForm({
        UserID: 1,
        Action: "",
        TableName: "",
        RecordID: 0,
      });
    }
  }, [activity]);

  if (!open) return null;

  function change(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "UserID" || name === "RecordID"
          ? Number(value)
          : value,
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      if (activity) {
        await updateActivity(activity.ActivityID, form);
      } else {
        await createActivity(form);
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
        className="bg-slate-900 rounded-xl p-8 w-full max-w-xl space-y-4"
      >

        <h2 className="text-2xl font-bold">
          {activity ? "Edit Activity" : "Add Activity"}
        </h2>

        <input
          name="Action"
          value={form.Action}
          onChange={change}
          placeholder="Action"
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          name="TableName"
          value={form.TableName}
          onChange={change}
          placeholder="Table Name"
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          type="number"
          name="RecordID"
          value={form.RecordID}
          onChange={change}
          placeholder="Record ID"
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          type="number"
          name="UserID"
          value={form.UserID}
          onChange={change}
          placeholder="User ID"
          className="w-full p-3 rounded bg-slate-800"
        />

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 px-5 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </form>

    </div>
  );
}