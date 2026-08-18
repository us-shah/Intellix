"use client";

import { useEffect, useState } from "react";

import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "@/lib/job";

import {
  Job,
  JobCreate,
  JobUpdate,
} from "@/types/job";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchJobs() {
    setLoading(true);

    try {
      const data = await getJobs();
      setJobs(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  async function addJob(data: JobCreate) {
    await createJob(data);
    fetchJobs();
  }

  async function editJob(
    id: number,
    data: JobUpdate
  ) {
    await updateJob(id, data);
    fetchJobs();
  }

  async function removeJob(id: number) {
    await deleteJob(id);
    fetchJobs();
  }

  return {
    jobs,
    loading,
    fetchJobs,
    addJob,
    editJob,
    removeJob,
  };
}