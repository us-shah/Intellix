"use client";

interface Props {
  open: boolean;
  note: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteNoteDialog({
  open,
  note,
  onClose,
  onConfirm,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold">
          Delete Note
        </h2>

        <p className="mt-4 text-gray-400">
          Are you sure you want to delete this note?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}