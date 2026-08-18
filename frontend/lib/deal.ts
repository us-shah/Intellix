import api from "./api";

export async function getDeals() {
  const response = await api.get("/deals/");
  return response.data;
}

export async function getDeal(id: number) {
  const response = await api.get(`/deals/${id}`);
  return response.data;
}

export async function createDeal(data: any) {
  const response = await api.post("/deals/", data);
  return response.data;
}

export async function updateDeal(id: number, data: any) {
  const response = await api.put(`/deals/${id}`, data);
  return response.data;
}

export async function deleteDeal(id: number) {
  const response = await api.delete(`/deals/${id}`);
  return response.data;
}