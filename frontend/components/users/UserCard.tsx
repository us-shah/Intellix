"use client";

import { User } from "@/types/user";

interface Props {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

export default function UserCard({
  user,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border p-5 bg-white shadow-sm">

      <h2 className="font-bold text-lg">
        {user.FullName}
      </h2>

      <p>{user.Email}</p>

      <p>{user.Phone}</p>

      <p>Role : {user.RoleID}</p>

      <p>
        {user.IsActive
          ? "Active"
          : "Inactive"}
      </p>

      <div className="flex gap-3 mt-4">

        <button
          onClick={onEdit}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-3 py-2 rounded"
        >
          Delete
        </button>

      </div>
    </div>
  );
}