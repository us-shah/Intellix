"use client";

import { useMemo, useState } from "react";
import { FolderKanban, Plus, Search } from "lucide-react";

import { useProjects } from "@/hooks/useProjects";

import ProjectCard from "@/components/project/ProjectCard";
import ProjectModal from "@/components/project/ProjectModal";
import DeleteProjectDialog from "@/components/project/DeleteProjectDialog";

export default function ProjectsPage() {
  const {
    projects,
    loading,
    fetchProjects,
    removeProject,
  } = useProjects();

  const [search, setSearch] = useState("");

  const [selectedProject, setSelectedProject] =
    useState<any>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project: any) =>
      project.ProjectName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [projects, search]);

  return (
    <main className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Projects
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all customer projects.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedProject(null);
            setModalOpen(true);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg flex gap-2"
        >
          <Plus size={18} />
          New Project
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Projects</p>
          <h2 className="text-3xl font-bold">
            {projects.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Managers</p>
          <h2 className="text-3xl font-bold">
            {
              new Set(
                projects.map((p: any) => p.ManagerID)
              ).size
            }
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Customers</p>
          <h2 className="text-3xl font-bold">
            {
              new Set(
                projects.map((p: any) => p.CustomerID)
              ).size
            }
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="relative mb-8">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-500"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search project..."
          className="w-full bg-slate-900 rounded-xl border border-slate-800 pl-11 py-3"
        />

      </div>

      {/* Loading */}

      {loading && (
        <div className="text-center py-16">
          Loading...
        </div>
      )}

      {/* Empty */}

      {!loading &&
        filteredProjects.length === 0 && (

          <div className="text-center py-20">

            <FolderKanban
              size={70}
              className="mx-auto text-gray-500"
            />

            <h2 className="text-3xl font-bold mt-6">
              No Projects Found
            </h2>

          </div>

        )}

      {/* Cards */}

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredProjects.map((project: any) => (

          <ProjectCard
            key={project.ProjectID}
            project={project}
            onEdit={(item) => {
              setSelectedProject(item);
              setModalOpen(true);
            }}
            onDelete={(item) => {
              setSelectedProject(item);
              setDeleteOpen(true);
            }}
          />

        ))}

      </div>

      <ProjectModal
        open={modalOpen}
        project={selectedProject}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchProjects}
      />

      <DeleteProjectDialog
        open={deleteOpen}
        project={selectedProject}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await removeProject(
            selectedProject.ProjectID
          );
          setDeleteOpen(false);
        }}
      />

    </main>
  );
}