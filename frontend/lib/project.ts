import api from "./api";

import {
  ProjectCreate,
  ProjectUpdate,
} from "@/types/project";

export async function getProjects() {
  const res = await api.get("/projects/");
  return res.data;
}

export async function getProject(id: number) {
  const res = await api.get(`/projects/${id}`);
  return res.data;
}

export async function createProject(
  data: ProjectCreate
) {
  const res = await api.post("/projects/", data);
  return res.data;
}

export async function updateProject(
  id: number,
  data: ProjectUpdate
) {
  const res = await api.put(
    `/projects/${id}`,
    data
  );

  return res.data;
}

export async function deleteProject(id: number) {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
}