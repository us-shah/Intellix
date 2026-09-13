import api from "./api";

export async function getMeetings() {
  const response = await api.get("/meetings/");
  return response.data;
}

export async function getMeeting(id: number) {
  const response = await api.get(`/meetings/${id}`);
  return response.data;
}

export async function createMeeting(data: any) {
  const response = await api.post("/meetings/", data);
  return response.data;
}

export async function updateMeeting(id: number, data: any) {
  const response = await api.put(`/meetings/${id}`, data);
  return response.data;
}

export async function deleteMeeting(id: number) {
  const response = await api.delete(`/meetings/${id}`);
  return response.data;
}