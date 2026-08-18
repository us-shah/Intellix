import api from "./api";
import {
  NotificationCreate,
  NotificationUpdate,
} from "@/types/notification";

export async function getNotifications() {
  const response = await api.get("/notifications/");
  return response.data;
}

export async function getNotification(id: number) {
  const response = await api.get(`/notifications/${id}`);
  return response.data;
}

export async function createNotification(
  data: NotificationCreate
) {
  const response = await api.post("/notifications/", data);
  return response.data;
}

export async function updateNotification(
  id: number,
  data: NotificationUpdate
) {
  const response = await api.put(
    `/notifications/${id}`,
    data
  );

  return response.data;
}

export async function deleteNotification(id: number) {
  const response = await api.delete(
    `/notifications/${id}`
  );

  return response.data;
}