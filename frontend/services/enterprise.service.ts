import api from "@/lib/api";
export const enterpriseApi = {
  overview: async () => (await api.get("/enterprise/overview")).data,
  employees: async () => (await api.get("/enterprise/employees")).data,
  createEmployee: async (payload: unknown) => (await api.post("/enterprise/employees", payload)).data,
  invoices: async () => (await api.get("/enterprise/invoices")).data,
  createInvoice: async (payload: unknown) => (await api.post("/enterprise/invoices", payload)).data,
  tickets: async () => (await api.get("/enterprise/tickets")).data,
  createTicket: async (payload: unknown) => (await api.post("/enterprise/tickets", payload)).data,
};
