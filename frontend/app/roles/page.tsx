"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Shield,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import api from "@/lib/api";

interface Role {
  RoleID: number;
  RoleName: string;
  Description?: string;
  CreatedAt?: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] =
    useState<Role | null>(null);

  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const loadRoles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/roles/");

      setRoles(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error(err);
      setError("Unable to load roles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRoles();
  }, []);

  const openCreate = () => {
    setEditingRole(null);
    setRoleName("");
    setDescription("");
    setModalOpen(true);
  };

  const openEdit = (role: Role) => {
    setEditingRole(role);
    setRoleName(role.RoleName);
    setDescription(role.Description ?? "");
    setModalOpen(true);
  };

  const saveRole = async () => {
    if (!roleName.trim()) {
      setError("Role name is required.");
      return;
    }

    try {
      setError("");

      const payload = {
        RoleName: roleName.trim(),
        Description: description.trim(),
      };

      if (editingRole) {
        await api.put(
          `/roles/${editingRole.RoleID}`,
          payload
        );
      } else {
        await api.post("/roles/", payload);
      }

      setModalOpen(false);
      await loadRoles();
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.detail ??
          "Unable to save role."
      );
    }
  };

  const deleteRole = async (role: Role) => {
    const confirmed = window.confirm(
      `Delete role "${role.RoleName}"?`
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/roles/${role.RoleID}`
      );

      await loadRoles();
    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.detail ??
          "Unable to delete role."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8 text-slate-900">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">
              Roles
            </h1>

            <p className="mt-2 text-slate-600">
              Manage platform user roles and access groups.
            </p>
          </div>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            <Plus size={18} />
            Add Role
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 font-semibold text-red-800">
            {error}
          </div>
        )}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-slate-950 p-6 text-white">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <Shield size={22} />
            </div>

            <p className="text-sm text-slate-400">
              Total Roles
            </p>

            <p className="mt-1 text-3xl font-bold">
              {roles.length}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="p-10 text-center text-slate-500">
              Loading roles...
            </div>
          ) : roles.length === 0 ? (
            <div className="p-10 text-center">
              <Shield className="mx-auto h-12 w-12 text-slate-400" />

              <h2 className="mt-4 text-xl font-bold">
                No roles found
              </h2>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr className="text-left text-sm text-slate-600">
                    <th className="px-6 py-4">
                      ID
                    </th>

                    <th className="px-6 py-4">
                      Role
                    </th>

                    <th className="px-6 py-4">
                      Description
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {roles.map((role) => (
                    <tr
                      key={role.RoleID}
                      className="border-t border-slate-200"
                    >
                      <td className="px-6 py-4">
                        {role.RoleID}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-800">
                          {role.RoleName}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {role.Description || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              openEdit(role)
                            }
                            className="rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            onClick={() =>
                              deleteRole(role)
                            }
                            className="rounded-lg bg-red-50 p-2 text-red-700 hover:bg-red-100"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">
                {editingRole
                  ? "Edit Role"
                  : "Create Role"}
              </h2>

              <button
                onClick={() =>
                  setModalOpen(false)
                }
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Role name
                </label>

                <input
                  value={roleName}
                  onChange={(e) =>
                    setRoleName(
                      e.target.value
                    )
                  }
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  placeholder="e.g. Manager"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-800">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  className="min-h-28 w-full rounded-xl border border-slate-300 p-4 text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  placeholder="Role description"
                />
              </div>

              <button
                onClick={saveRole}
                className="h-12 w-full rounded-xl bg-blue-700 font-bold text-white hover:bg-blue-800"
              >
                {editingRole
                  ? "Update Role"
                  : "Create Role"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}