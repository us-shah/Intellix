"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Shield,
  Calendar,
} from "lucide-react";

import {
  useRouter,
  useParams,
} from "next/navigation";

import { getRole } from "@/lib/role";

export default function RoleDetailsPage() {

  const router = useRouter();

  const { id } = useParams();

  const [role, setRole] =
    useState<any>();

  useEffect(() => {
    loadRole();
  }, []);

  async function loadRole() {
    const data = await getRole(Number(id));
    setRole(data);
  }

  if (!role)
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );

  return (

    <main className="p-8 text-white">

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-cyan-400 mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-slate-900 rounded-xl p-8">

        <div className="flex items-center gap-4">

          <Shield
            className="text-cyan-400"
            size={40}
          />

          <div>

            <h1 className="text-4xl font-bold">
              {role.RoleName}
            </h1>

            <p className="text-gray-400">
              System Role
            </p>

          </div>

        </div>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-3">
            Description
          </h2>

          <p className="text-gray-300">
            {role.Description}
          </p>

        </div>

        <div className="mt-10 flex gap-3">

          <Calendar />

          <div>

            <p className="text-gray-400">
              Created
            </p>

            <p>
              {new Date(
                role.CreatedAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

    </main>

  );
}