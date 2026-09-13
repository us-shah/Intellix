"use client";

interface Props {
  note: any;
  onEdit: (note: any) => void;
  onDelete: (note: any) => void;
}

export default function NoteCard({
  note,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

      <h2 className="text-xl font-semibold">
        Note #{note.NoteID}
      </h2>

      <p className="text-gray-400 mt-4 whitespace-pre-wrap">
        {note.NoteText}
      </p>

      <div className="mt-5 text-sm text-gray-500 space-y-1">

        <p>Customer : {note.CustomerID || "-"}</p>

        <p>Lead : {note.LeadID || "-"}</p>

        <p>Deal : {note.DealID || "-"}</p>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(note)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(note)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
}