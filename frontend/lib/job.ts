import api from "./api";
import { JobCreate, JobUpdate } from "@/types/job";

export async function getJobs() {
  const res = await api.get("/jobs/");
  return res.data;
}

export async function getJob(id: number) {
  const res = await api.get(`/jobs/${id}`);
  return res.data;
}

export async function createJob(data: JobCreate) {
  const res = await api.post("/jobs/", data);
  return res.data;
}

export async function updateJob(
  id: number,
  data: JobUpdate
) {
  const res = await api.put(`/jobs/${id}`, data);
  return res.data;
}

export async function deleteJob(id: number) {
  const res = await api.delete(`/jobs/${id}`);
  return res.data;
}