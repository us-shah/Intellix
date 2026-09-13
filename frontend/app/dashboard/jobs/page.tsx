"use client";

import { useMemo, useState } from "react";
import { Briefcase, Plus, Search } from "lucide-react";

import { useJobs } from "@/hooks/useJobs";

import JobCard from "@/components/job/JobCard";
import JobModal from "@/components/job/JobModal";
import DeleteJobDialog from "@/components/job/DeleteJobDialog";

export default function JobsPage() {
  const {
    jobs,
    loading,
    fetchJobs,
    removeJob,
  } = useJobs();

  const [search, setSearch] = useState("");

  const [selectedJob, setSelectedJob] =
    useState<any>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const filtered = useMemo(() => {
    return jobs.filter((job: any) =>
      job.Title.toLowerCase().includes(
        search.toLowerCase()
      )
    );
  }, [jobs, search]);

  const openJobs = jobs.filter(
    (j: any) => j.Status === "Open"
  ).length;

  const closedJobs = jobs.filter(
    (j: any) => j.Status === "Closed"
  ).length;

  return (
    <main className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Jobs
          </h1>

          <p className="text-gray-400 mt-2">
            Manage careers and vacancies.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedJob(null);
            setModalOpen(true);
          }}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          New Job
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">
            Total Jobs
          </p>
          <h2 className="text-4xl font-bold">
            {jobs.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">
            Open Jobs
          </p>
          <h2 className="text-4xl font-bold text-green-400">
            {openJobs}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">
            Closed Jobs
          </p>
          <h2 className="text-4xl font-bold text-red-400">
            {closedJobs}
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
          placeholder="Search jobs..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-11"
        />

      </div>

      {loading && (
        <div className="text-center py-20">
          Loading...
        </div>
      )}

      {!loading && filtered.length === 0 && (

        <div className="text-center py-20">

          <Briefcase
            size={70}
            className="mx-auto text-gray-500"
          />

          <h2 className="text-3xl font-bold mt-5">
            No Jobs Found
          </h2>

        </div>

      )}

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

        {filtered.map((job: any) => (

          <JobCard
            key={job.JobID}
            job={job}
            onEdit={(item) => {
              setSelectedJob(item);
              setModalOpen(true);
            }}
            onDelete={(item) => {
              setSelectedJob(item);
              setDeleteOpen(true);
            }}
          />

        ))}

      </div>

      <JobModal
        open={modalOpen}
        job={selectedJob}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchJobs}
      />

      <DeleteJobDialog
        open={deleteOpen}
        job={selectedJob}
        onClose={() => setDeleteOpen(false)}
        onConfirm={async () => {
          await removeJob(selectedJob.JobID);
          setDeleteOpen(false);
        }}
      />

    </main>
  );
}