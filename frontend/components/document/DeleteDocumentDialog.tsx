"use client";

interface Props {
  open: boolean;
  document: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDocumentDialog({
  open,
  document,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold">
          Delete Document
        </h2>

        <p className="mt-4 text-gray-400">
          Delete <strong>{document?.OriginalName}</strong>?
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="bg-gray-700 px-5 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 px-5 py-2 rounded"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}