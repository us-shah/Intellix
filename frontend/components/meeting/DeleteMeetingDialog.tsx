"use client";

interface Props {
  open: boolean;
  meeting: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteMeetingDialog({
  open,
  meeting,
  onClose,
  onConfirm,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 rounded-xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          Delete Meeting
        </h2>

        <p className="text-gray-400">
          Are you sure you want to delete
          <span className="text-white font-semibold">
            {" "}
            {meeting?.Title}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}