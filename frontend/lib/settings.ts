import api from "./api";
import {
  CreateSetting,
  UpdateSetting,
} from "@/types/setting";

export async function getSettings() {
  const res = await api.get("/settings/");
  return res.data;
}

export async function getSetting(id: number) {
  const res = await api.get(`/settings/${id}`);
  return res.data;
}

export async function createSetting(
  data: CreateSetting
) {
  const res = await api.post("/settings/", data);
  return res.data;
}

export async function updateSetting(
  id: number,
  data: UpdateSetting
) {
  const res = await api.put(
    `/settings/${id}`,
    data
  );

  return res.data;
}

export async function deleteSetting(id: number) {
  const res = await api.delete(`/settings/${id}`);
  return res.data;
}