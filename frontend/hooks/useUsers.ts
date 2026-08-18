"use client";

import { useEffect, useState } from "react";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/user";

import {
  User,
  UserCreate,
  UserUpdate,
} from "@/types/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    setLoading(true);

    try {
      const data = await getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function addUser(data: UserCreate) {
    await createUser(data);
    fetchUsers();
  }

  async function editUser(
    id: number,
    data: UserUpdate
  ) {
    await updateUser(id, data);
    fetchUsers();
  }

  async function removeUser(id: number) {
    await deleteUser(id);
    fetchUsers();
  }

  return {
    users,
    loading,
    fetchUsers,
    addUser,
    editUser,
    removeUser,
  };
}