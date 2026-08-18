"use client";

import { useEffect, useState } from "react";

import {
  createService,
  updateService,
} from "@/lib/service";

interface Props {
  open: boolean;
  service?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ServiceModal({
  open,
  service,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    ServiceName: "",
    Description: "",
    Icon: "",
    Status: "Active",
  });

  useEffect(() => {
    if (service) {
      setForm({
        ServiceName: service.ServiceName,
        Description: service.Description,
        Icon: service.Icon,
        Status: service.Status,
      });
    } else {
      setForm({
        ServiceName: "",
        Description: "",
        Icon: "",
        Status: "Active",
      });
    }
  }, [service]);

  if (!open) return null;

  function change(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      if (service) {
        await updateService(service.ServiceID, form);
      } else {
        await createService(form);
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
        <h2 className="text-3xl font-bold">
          {service ? "Edit Service" : "Create Service"}
        </h2>

        <input
          name="ServiceName"
          value={form.ServiceName}
          onChange={change}
          placeholder="Service Name"
          className="w-full bg-slate-800 rounded p-3"
        />

        <textarea
          name="Description"
          value={form.Description}
          onChange={change}
          placeholder="Description"
          rows={5}
          className="w-full bg-slate-800 rounded p-3"
        />

        <input
          name="Icon"
          value={form.Icon}
          onChange={change}
          placeholder="Icon (lucide name)"
          className="w-full bg-slate-800 rounded p-3"
        />

        <select
          name="Status"
          value={form.Status}
          onChange={change}
          className="w-full bg-slate-800 rounded p-3"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="flex justify-end gap-3 pt-4">

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 px-6 py-2 rounded"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>
      </form>
    </div>
  );
}