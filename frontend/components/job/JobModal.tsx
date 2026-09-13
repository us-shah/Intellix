"use client";

import { useEffect, useState } from "react";

import {
  createJob,
  updateJob,
} from "@/lib/job";

interface Props {
  open: boolean;
  job?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function JobModal({
  open,
  job,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    Title: "",
    Department: "",
    Location: "",
    EmploymentType: "",
    Salary: "",
    Description: "",
    Requirements: "",
    Status: "Open",
  });

  useEffect(() => {
    if (job) {
      setForm(job);
    } else {
      setForm({
        Title: "",
        Department: "",
        Location: "",
        EmploymentType: "",
        Salary: "",
        Description: "",
        Requirements: "",
        Status: "Open",
      });
    }
  }, [job]);

  if (!open) return null;

  async function save(e: React.FormEvent) {
    e.preventDefault();

    if (job) {
      await updateJob(job.JobID, form);
    } else {
      await createJob(form);
    }

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 overflow-y-auto">

      <form
        onSubmit={save}
        className="bg-slate-900 rounded-xl p-8 w-full max-w-3xl"
      >

        <h2 className="text-3xl font-bold mb-6">
          {job ? "Edit Job" : "Create Job"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            className="bg-slate-800 p-3 rounded"
            placeholder="Title"
            value={form.Title}
            onChange={(e) =>
              setForm({ ...form, Title: e.target.value })
            }
          />

          <input
            className="bg-slate-800 p-3 rounded"
            placeholder="Department"
            value={form.Department}
            onChange={(e) =>
              setForm({ ...form, Department: e.target.value })
            }
          />

          <input
            className="bg-slate-800 p-3 rounded"
            placeholder="Location"
            value={form.Location}
            onChange={(e) =>
              setForm({ ...form, Location: e.target.value })
            }
          />

          <input
            className="bg-slate-800 p-3 rounded"
            placeholder="Employment Type"
            value={form.EmploymentType}
            onChange={(e) =>
              setForm({
                ...form,
                EmploymentType: e.target.value,
              })
            }
          />

          <input
            className="bg-slate-800 p-3 rounded"
            placeholder="Salary"
            value={form.Salary}
            onChange={(e) =>
              setForm({ ...form, Salary: e.target.value })
            }
          />

          <select
            className="bg-slate-800 p-3 rounded"
            value={form.Status}
            onChange={(e) =>
              setForm({ ...form, Status: e.target.value })
            }
          >
            <option>Open</option>
            <option>Closed</option>
          </select>

        </div>

        <textarea
          className="bg-slate-800 p-3 rounded w-full mt-4"
          rows={5}
          placeholder="Description"
          value={form.Description}
          onChange={(e) =>
            setForm({
              ...form,
              Description: e.target.value,
            })
          }
        />

        <textarea
          className="bg-slate-800 p-3 rounded w-full mt-4"
          rows={5}
          placeholder="Requirements"
          value={form.Requirements}
          onChange={(e) =>
            setForm({
              ...form,
              Requirements: e.target.value,
            })
          }
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded"
          >
            Save
          </button>

        </div>

      </form>

    </div>
  );
}