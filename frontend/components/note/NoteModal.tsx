"use client";

import { useEffect, useState } from "react";
import { createNote, updateNote } from "@/lib/note";

interface NoteModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  note?: any;
}

export default function NoteModal({
  open,
  onClose,
  onSuccess,
  note,
}: NoteModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    CustomerID: "",
    LeadID: "",
    DealID: "",
    NoteText: "",
    CreatedBy: 1,
  });

  useEffect(() => {
    if (note) {
      setForm({
        CustomerID: note.CustomerID || "",
        LeadID: note.LeadID || "",
        DealID: note.DealID || "",
        NoteText: note.NoteText || "",
        CreatedBy: note.CreatedBy || 1,
      });
    } else {
      setForm({
        CustomerID: "",
        LeadID: "",
        DealID: "",
        NoteText: "",
        CreatedBy: 1,
      });
    }
  }, [note]);

  if (!open) return null;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        CustomerID: form.CustomerID ? Number(form.CustomerID) : null,
        LeadID: form.LeadID ? Number(form.LeadID) : null,
        DealID: form.DealID ? Number(form.DealID) : null,
        NoteText: form.NoteText,
        CreatedBy: Number(form.CreatedBy),
      };

      if (note) {
        await updateNote(note.NoteID, payload);
      } else {
        await createNote(payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save note.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-900 rounded-xl w-full max-w-xl p-6">

        <h2 className="text-2xl font-bold text-white mb-5">
          {note ? "Edit Note" : "Add Note"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="CustomerID"
            value={form.CustomerID}
            onChange={handleChange}
            placeholder="Customer ID"
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
          />

          <input
            name="LeadID"
            value={form.LeadID}
            onChange={handleChange}
            placeholder="Lead ID"
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
          />

          <input
            name="DealID"
            value={form.DealID}
            onChange={handleChange}
            placeholder="Deal ID"
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
          />

          <textarea
            rows={5}
            name="NoteText"
            value={form.NoteText}
            onChange={handleChange}
            placeholder="Write note..."
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded bg-gray-600"
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
                : note
                ? "Update Note"
                : "Create Note"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}