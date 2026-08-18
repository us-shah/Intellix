import api from "./api";
import { UserCreate, UserUpdate } from "@/types/user";

export async function getUsers() {
  const res = await api.get("/users/");
  return res.data;
}

export async function getUser(id: number) {
  const res = await api.get(`/users/${id}`);
  return res.data;
}

export async function createUser(data: UserCreate) {
  const res = await api.post("/users/", data);
  return res.data;
}

export async function updateUser(
  id: number,
  data: UserUpdate
) {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
}

export async function deleteUser(id: number) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}