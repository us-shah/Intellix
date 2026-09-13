"use client";

import { useEffect, useState } from "react";

import {
  createProject,
  updateProject,
} from "@/lib/project";

interface Props {
  open: boolean;
  project?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProjectModal({
  open,
  project,
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    ProjectName: "",
    Description: "",
    CustomerID: 1,
    ManagerID: 1,
    Status: "",
    StartDate: "",
    EndDate: "",
  });

  useEffect(() => {
    if (project) {
      setForm({
        ProjectName: project.ProjectName,
        Description: project.Description,
        CustomerID: project.CustomerID,
        ManagerID: project.ManagerID,
        Status: project.Status,
        StartDate: project.StartDate.slice(0,10),
        EndDate: project.EndDate.slice(0,10),
      });
    }
  }, [project]);

  if (!open) return null;

  function change(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "CustomerID" ||
        name === "ManagerID"
          ? Number(value)
          : value,
    });
  }

  async function save(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);

    try {

      if (project)
        await updateProject(
          project.ProjectID,
          form
        );
      else
        await createProject(form);

      onSuccess();

      onClose();

    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <form
        onSubmit={save}
        className="bg-slate-900 rounded-xl p-8 w-full max-w-2xl space-y-4"
      >

        <h2 className="text-3xl font-bold">

          {project
            ? "Edit Project"
            : "Create Project"}

        </h2>

        <input
          name="ProjectName"
          value={form.ProjectName}
          onChange={change}
          placeholder="Project Name"
          className="w-full bg-slate-800 rounded p-3"
        />

        <textarea
          name="Description"
          value={form.Description}
          onChange={(e:any)=>change(e)}
          placeholder="Description"
          className="w-full bg-slate-800 rounded p-3 h-28"
        />

        <div className="grid grid-cols-2 gap-4">

          <input
            type="number"
            name="CustomerID"
            value={form.CustomerID}
            onChange={change}
            placeholder="Customer ID"
            className="bg-slate-800 rounded p-3"
          />

          <input
            type="number"
            name="ManagerID"
            value={form.ManagerID}
            onChange={change}
            placeholder="Manager ID"
            className="bg-slate-800 rounded p-3"
          />

          <input
            name="Status"
            value={form.Status}
            onChange={change}
            placeholder="Status"
            className="bg-slate-800 rounded p-3"
          />

          <input
            type="date"
            name="StartDate"
            value={form.StartDate}
            onChange={change}
            className="bg-slate-800 rounded p-3"
          />

          <input
            type="date"
            name="EndDate"
            value={form.EndDate}
            onChange={change}
            className="bg-slate-800 rounded p-3"
          />

        </div>

        <div className="flex justify-end gap-3 pt-4">

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 px-6 py-2 rounded"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </form>

    </div>
  );
}