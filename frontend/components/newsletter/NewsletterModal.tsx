"use client";

import { useEffect, useState } from "react";

import {
  createNewsletter,
  updateNewsletter,
} from "@/lib/newsletter";

interface Props {
  open: boolean;
  newsletter?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewsletterModal({
  open,
  newsletter,
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (newsletter)
      setEmail(newsletter.Email);
    else
      setEmail("");
  }, [newsletter]);

  if (!open) return null;

  async function save(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      if (newsletter)
        await updateNewsletter(newsletter.SubscriberID, {
          Email: email,
        });
      else
        await createNewsletter({
          Email: email,
        });

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
        className="bg-slate-900 rounded-xl p-8 w-full max-w-lg"
      >

        <h2 className="text-3xl font-bold mb-6">
          {newsletter
            ? "Edit Subscriber"
            : "New Subscriber"}
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="subscriber@email.com"
          className="w-full bg-slate-800 p-3 rounded"
          required
        />

        <div className="flex justify-end gap-3 mt-8">

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </form>

    </div>
  );
}