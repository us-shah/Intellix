"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, StickyNote } from "lucide-react";

import { getNote } from "@/lib/note";

export default function NoteDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    loadNote();
  }, []);

  async function loadNote() {
    try {
      const data = await getNote(Number(id));
      setNote(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!note) {
    return (
      <main className="p-8 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="p-8 text-white">

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-cyan-400 mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-slate-900 rounded-xl p-8">

        <div className="flex items-center gap-3 mb-6">

          <StickyNote />

          <h1 className="text-3xl font-bold">
            Note #{note.NoteID}
          </h1>

        </div>

        <div className="space-y-5">

          <div>

            <p className="text-gray-400">
              Note Text
            </p>

            <p className="mt-2 whitespace-pre-wrap">
              {note.NoteText}
            </p>

          </div>

          <div>

            <p className="text-gray-400">
              Customer ID
            </p>

            <p>{note.CustomerID || "-"}</p>

          </div>

          <div>

            <p className="text-gray-400">
              Lead ID
            </p>

            <p>{note.LeadID || "-"}</p>

          </div>

          <div>

            <p className="text-gray-400">
              Deal ID
            </p>

            <p>{note.DealID || "-"}</p>

          </div>

          <div>

            <p className="text-gray-400">
              Created By
            </p>

            <p>{note.CreatedBy}</p>

          </div>

        </div>

      </div>

    </main>
  );
}