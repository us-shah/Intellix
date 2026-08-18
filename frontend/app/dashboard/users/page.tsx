"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  useRouter,
  useParams,
} from "next/navigation";

import { getUser } from "@/lib/user";

export default function UserDetailsPage() {

  const router = useRouter();

  const { id } = useParams();

  const [user, setUser] =
    useState<any>();

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const data = await getUser(Number(id));
    setUser(data);
  }

  if (!user)
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

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center">
            <User size={40} />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              {user.FullName}
            </h1>

            <div className="mt-3">

              {user.IsActive ? (
                <span className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={18} />
                  Active
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-400">
                  <XCircle size={18} />
                  Inactive
                </span>
              )}

            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div className="flex gap-3">
            <Mail />
            <div>
              <p className="text-gray-400">
                Email
              </p>
              <p>{user.Email}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Phone />
            <div>
              <p className="text-gray-400">
                Phone
              </p>
              <p>{user.Phone || "-"}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Shield />
            <div>
              <p className="text-gray-400">
                Role ID
              </p>
              <p>{user.RoleID}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Calendar />
            <div>
              <p className="text-gray-400">
                Joined
              </p>
              <p>
                {new Date(
                  user.CreatedAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}