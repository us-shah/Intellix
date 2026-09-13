import api from "./api";

export async function getCustomers() {
  const response = await api.get("/customers/");
  return response.data;
}

export async function getCustomer(id: number) {
  const response = await api.get(`/customers/${id}`);
  return response.data;
}

export async function createCustomer(data: any) {
  const response = await api.post("/customers/", data);
  return response.data;
}

export async function updateCustomer(id: number, data: any) {
  const response = await api.put(`/customers/${id}`, data);
  return response.data;
}

export async function deleteCustomer(id: number) {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
}