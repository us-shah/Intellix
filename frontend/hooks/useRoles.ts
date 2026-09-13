"use client";

import { useEffect, useState } from "react";

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "@/lib/role";

import {
  Role,
  RoleCreate,
  RoleUpdate,
} from "@/types/role";

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchRoles() {
    setLoading(true);

    try {
      const data = await getRoles();
      setRoles(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  async function addRole(data: RoleCreate) {
    await createRole(data);
    fetchRoles();
  }

  async function editRole(
    id: number,
    data: RoleUpdate
  ) {
    await updateRole(id, data);
    fetchRoles();
  }

  async function removeRole(id: number) {
    await deleteRole(id);
    fetchRoles();
  }

  return {
    roles,
    loading,
    fetchRoles,
    addRole,
    editRole,
    removeRole,
  };
}