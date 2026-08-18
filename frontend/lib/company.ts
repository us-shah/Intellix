import api from "./api";

export async function getCompanies() {
  const response = await api.get("/companies");
  return response.data;
}

export async function getCompany(id: number) {
  const response = await api.get(`/companies/${id}`);
  return response.data;
}

export async function createCompany(data: any) {
  const response = await api.post("/companies/", data);
  return response.data;
}

export async function updateCompany(id: number, data: any) {
  const response = await api.put(`/companies/${id}`, data);
  return response.data;
}

export async function deleteCompany(id: number) {
  const response = await api.delete(`/companies/${id}`);
  return response.data;
}
async function loadCompanies() {
  try {
    const data = await getCompanies();

    console.log("Companies from API:", data);
  } catch (error) {
    console.error("Failed to load companies:", error);
  }
}