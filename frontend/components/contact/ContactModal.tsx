"use client";

import { useEffect, useState } from "react";

import {
  createContact,
  updateContact,
} from "@/lib/contact";

interface Props {
  open: boolean;
  contact?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ContactModal({
  open,
  contact,
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Subject: "",
    Message: "",
    Status: "New",
  });

  useEffect(() => {

    if (contact) {

      setForm({
        FullName: contact.FullName,
        Email: contact.Email,
        Phone: contact.Phone,
        Subject: contact.Subject,
        Message: contact.Message,
        Status: contact.Status,
      });

    } else {

      setForm({
        FullName: "",
        Email: "",
        Phone: "",
        Subject: "",
        Message: "",
        Status: "New",
      });

    }

  }, [contact]);

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

      if (contact)
        await updateContact(contact.ContactID, form);
      else
        await createContact(form);

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
        className="bg-slate-900 rounded-xl p-8 w-full max-w-2xl space-y-4"
      >

        <h2 className="text-3xl font-bold">
          {contact ? "Edit Contact" : "New Contact"}
        </h2>

        <input
          name="FullName"
          value={form.FullName}
          onChange={change}
          placeholder="Full Name"
          className="w-full bg-slate-800 rounded p-3"
        />

        <input
          name="Email"
          value={form.Email}
          onChange={change}
          placeholder="Email"
          className="w-full bg-slate-800 rounded p-3"
        />

        <input
          name="Phone"
          value={form.Phone}
          onChange={change}
          placeholder="Phone"
          className="w-full bg-slate-800 rounded p-3"
        />

        <input
          name="Subject"
          value={form.Subject}
          onChange={change}
          placeholder="Subject"
          className="w-full bg-slate-800 rounded p-3"
        />

        <textarea
          name="Message"
          value={form.Message}
          onChange={change}
          placeholder="Message"
          rows={5}
          className="w-full bg-slate-800 rounded p-3"
        />

        <select
          name="Status"
          value={form.Status}
          onChange={change}
          className="w-full bg-slate-800 rounded p-3"
        >
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <div className="flex justify-end gap-3">

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