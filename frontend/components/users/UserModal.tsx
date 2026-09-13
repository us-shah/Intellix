"use client";

import { useState, useEffect } from "react";
import { User, UserCreate, UserUpdate } from "@/types/user";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserCreate | UserUpdate) => void;
  user?: User;
}

export default function UserModal({
  open,
  onClose,
  onSubmit,
  user,
}: Props) {
  const [form, setForm] = useState({
    FullName: "",
    Email: "",
    Phone: "",
    Password: "",
    RoleID: 1,
    IsActive: true,
  });

  useEffect(() => {
    if (user) {
      setForm({
        FullName: user.FullName,
        Email: user.Email,
        Phone: user.Phone || "",
        Password: "",
        RoleID: user.RoleID,
        IsActive: user.IsActive,
      });
    } else {
      setForm({
        FullName: "",
        Email: "",
        Phone: "",
        Password: "",
        RoleID: 1,
        IsActive: true,
      });
    }
  }, [user]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (user) {
      onSubmit({
        FullName: form.FullName,
        Email: form.Email,
        Phone: form.Phone,
        RoleID: form.RoleID,
        IsActive: form.IsActive,
      });
    } else {
      onSubmit({
        FullName: form.FullName,
        Email: form.Email,
        Phone: form.Phone,
        Password: form.Password,
        RoleID: form.RoleID,
      });
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-xl w-[500px] p-6">

        <h2 className="text-2xl font-bold mb-5">
          {user ? "Edit User" : "Create User"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            className="border w-full p-3 rounded"
            placeholder="Full Name"
            value={form.FullName}
            onChange={(e) =>
              setForm({
                ...form,
                FullName: e.target.value,
              })
            }
          />

          <input
            className="border w-full p-3 rounded"
            placeholder="Email"
            value={form.Email}
            onChange={(e) =>
              setForm({
                ...form,
                Email: e.target.value,
              })
            }
          />

          <input
            className="border w-full p-3 rounded"
            placeholder="Phone"
            value={form.Phone}
            onChange={(e) =>
              setForm({
                ...form,
                Phone: e.target.value,
              })
            }
          />

          {!user && (
            <input
              type="password"
              className="border w-full p-3 rounded"
              placeholder="Password"
              value={form.Password}
              onChange={(e) =>
                setForm({
                  ...form,
                  Password: e.target.value,
                })
              }
            />
          )}

          <input
            type="number"
            className="border w-full p-3 rounded"
            placeholder="Role ID"
            value={form.RoleID}
            onChange={(e) =>
              setForm({
                ...form,
                RoleID: Number(e.target.value),
              })
            }
          />

          {user && (
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={form.IsActive}
                onChange={(e) =>
                  setForm({
                    ...form,
                    IsActive: e.target.checked,
                  })
                }
              />
              Active
            </label>
          )}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Save
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}