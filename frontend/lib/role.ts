import api from "./api";
import { RoleCreate, RoleUpdate } from "@/types/role";

export async function getRoles() {
  const res = await api.get("/roles/");
  return res.data;
}

export async function getRole(id: number) {
  const res = await api.get(`/roles/${id}`);
  return res.data;
}

export async function createRole(data: RoleCreate) {
  const res = await api.post("/roles/", data);
  return res.data;
}

export async function updateRole(
  id: number,
  data: RoleUpdate
) {
  const res = await api.put(`/roles/${id}`, data);
  return res.data;
}

export async function deleteRole(id: number) {
  const res = await api.delete(`/roles/${id}`);
  return res.data;
}