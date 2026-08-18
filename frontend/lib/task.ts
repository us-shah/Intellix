import api from "./api";

export async function getTasks() {
  const response = await api.get("/tasks/");
  return response.data;
}

export async function getTask(id: number) {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
}

export async function createTask(data: any) {
  const response = await api.post("/tasks/", data);
  return response.data;
}

export async function updateTask(id: number, data: any) {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
}

export async function deleteTask(id: number) {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
}