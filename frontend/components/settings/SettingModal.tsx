"use client";

import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  setting?: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function SettingModal({
  open,
  setting,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState({
    SettingKey: "",
    SettingValue: "",
    Category: "",
    Description: "",
  });

  useEffect(() => {
    if (setting) {
      setForm(setting);
    } else {
      setForm({
        SettingKey: "",
        SettingValue: "",
        Category: "",
        Description: "",
      });
    }
  }, [setting]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          {setting ? "Edit Setting" : "New Setting"}
        </h2>

        <div className="space-y-4">

          <input
            name="SettingKey"
            value={form.SettingKey}
            onChange={handleChange}
            placeholder="Setting Key"
            className="w-full border rounded-lg p-3"
          />

          <input
            name="SettingValue"
            value={form.SettingValue}
            onChange={handleChange}
            placeholder="Setting Value"
            className="w-full border rounded-lg p-3"
          />

          <input
            name="Category"
            value={form.Category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="Description"
            value={form.Description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border rounded-lg p-3 h-28"
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-cyan-600 text-white px-5 py-2 rounded-lg"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}