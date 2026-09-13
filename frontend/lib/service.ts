import api from "./api";

import {
  ServiceCreate,
  ServiceUpdate,
} from "@/types/service";

export async function getServices() {
  const res = await api.get("/services/");
  return res.data;
}

export async function getService(id: number) {
  const res = await api.get(`/services/${id}`);
  return res.data;
}

export async function createService(
  data: ServiceCreate
) {
  const res = await api.post("/services/", data);
  return res.data;
}

export async function updateService(
  id: number,
  data: ServiceUpdate
) {
  const res = await api.put(`/services/${id}`, data);
  return res.data;
}

export async function deleteService(id: number) {
  const res = await api.delete(`/services/${id}`);
  return res.data;
}