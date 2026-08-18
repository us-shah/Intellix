"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FolderKanban } from "lucide-react";

import { getProject } from "@/lib/project";

export default function ProjectDetailsPage() {

  const { id } = useParams();

  const router = useRouter();

  const [project, setProject] =
    useState<any>(null);

  useEffect(() => {
    loadProject();
  }, []);

  async function loadProject() {
    const data = await getProject(Number(id));
    setProject(data);
  }

  if (!project)
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    );

  return (
    <main className="p-8 text-white">

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 text-cyan-400"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-slate-900 rounded-xl p-8">

        <div className="flex items-center gap-4 mb-8">

          <FolderKanban
            size={35}
            className="text-cyan-400"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {project.ProjectName}
            </h1>

            <p className="text-gray-400">
              {project.Status}
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div>
            <h3 className="text-gray-400">
              Description
            </h3>

            <p className="mt-2">
              {project.Description}
            </p>
          </div>

          <div className="space-y-4">

            <div>
              <span className="text-gray-400">
                Customer
              </span>
              <p>{project.CustomerID}</p>
            </div>

            <div>
              <span className="text-gray-400">
                Manager
              </span>
              <p>{project.ManagerID}</p>
            </div>

            <div>
              <span className="text-gray-400">
                Start Date
              </span>
              <p>
                {new Date(
                  project.StartDate
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <span className="text-gray-400">
                End Date
              </span>
              <p>
                {new Date(
                  project.EndDate
                ).toLocaleDateString()}
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}