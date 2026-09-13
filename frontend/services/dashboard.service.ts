import api from "@/lib/api";
import type { DashboardResponse } from "@/types/dashboard";

export async function getDashboardStats(): Promise<DashboardResponse> {
  const response = await api.get<DashboardResponse>("/dashboard/stats");
  return response.data;
}
