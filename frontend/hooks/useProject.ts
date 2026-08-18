import { useEffect, useState } from "react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/project";

import {
  Project,
  ProjectCreate,
  ProjectUpdate,
} from "@/types/project";

export function useProjects() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function fetchProjects() {
    setLoading(true);

    try {
      const data = await getProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function addProject(
    project: ProjectCreate
  ) {
    await createProject(project);
    fetchProjects();
  }

  async function editProject(
    id: number,
    project: ProjectUpdate
  ) {
    await updateProject(id, project);
    fetchProjects();
  }

  async function removeProject(id: number) {
    await deleteProject(id);
    fetchProjects();
  }

  return {
    projects,
    loading,
    fetchProjects,
    addProject,
    editProject,
    removeProject,
  };
}