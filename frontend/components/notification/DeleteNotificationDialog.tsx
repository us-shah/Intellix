"use client";

interface Props {
  open: boolean;
  notification: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteNotificationDialog({
  open,
  notification,
  onClose,
  onConfirm,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold">
          Delete Notification
        </h2>

        <p className="mt-4 text-gray-400">
          Are you sure you want to delete
          <strong> {notification?.Title}</strong>?
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}