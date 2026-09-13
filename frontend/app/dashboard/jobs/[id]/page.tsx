"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Building2,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
} from "lucide-react";

import { useRouter, useParams } from "next/navigation";

import { getJob } from "@/lib/job";

export default function JobDetailsPage() {

  const router = useRouter();

  const { id } = useParams();

  const [job, setJob] = useState<any>();

  useEffect(() => {
    loadJob();
  }, []);

  async function loadJob() {
    const data = await getJob(Number(id));
    setJob(data);
  }

  if (!job)
    return (
      <div className="p-8 text-white">
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

        <h1 className="text-4xl font-bold">
          {job.Title}
        </h1>

        <span
          className={`inline-block mt-4 px-4 py-2 rounded-full ${
            job.Status === "Open"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {job.Status}
        </span>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="flex gap-3">
            <Building2 />
            <div>
              <p className="text-gray-400">
                Department
              </p>
              <p>{job.Department}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <MapPin />
            <div>
              <p className="text-gray-400">
                Location
              </p>
              <p>{job.Location}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Briefcase />
            <div>
              <p className="text-gray-400">
                Employment
              </p>
              <p>{job.EmploymentType}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <DollarSign />
            <div>
              <p className="text-gray-400">
                Salary
              </p>
              <p>{job.Salary}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Calendar />
            <div>
              <p className="text-gray-400">
                Posted
              </p>
              <p>
                {new Date(
                  job.CreatedAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Description
          </h2>

          <p className="text-gray-300 whitespace-pre-wrap">
            {job.Description}
          </p>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Requirements
          </h2>

          <p className="text-gray-300 whitespace-pre-wrap">
            {job.Requirements}
          </p>

        </div>

      </div>

    </main>
  );
}