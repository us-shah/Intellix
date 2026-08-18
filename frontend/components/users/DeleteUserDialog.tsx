"use client";

interface Props {
  open: boolean;
  userName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteUserDialog({
  open,
  userName,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[420px]">
        <h2 className="text-xl font-bold mb-3">
          Delete User
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete{" "}
          <strong>{userName}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}