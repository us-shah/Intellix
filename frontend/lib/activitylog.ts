import api from "./api";
import {
  ActivityLogCreate,
  ActivityLogUpdate,
} from "@/types/activitylog";

export async function getActivities() {
  const response = await api.get("/activity-logs/");
  return response.data;
}

export async function getActivity(id: number) {
  const response = await api.get(`/activity-logs/${id}`);
  return response.data;
}

export async function createActivity(
  data: ActivityLogCreate
) {
  const response = await api.post(
    "/activity-logs/",
    data
  );

  return response.data;
}

export async function updateActivity(
  id: number,
  data: ActivityLogUpdate
) {
  const response = await api.put(
    `/activity-logs/${id}`,
    data
  );

  return response.data;
}

export async function deleteActivity(id: number) {
  const response = await api.delete(
    `/activity-logs/${id}`
  );

  return response.data;
}