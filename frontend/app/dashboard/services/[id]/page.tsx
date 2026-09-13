"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Wrench } from "lucide-react";

import { getService } from "@/lib/service";

export default function ServiceDetailsPage() {

  const { id } = useParams();

  const router = useRouter();

  const [service, setService] =
    useState<any>(null);

  useEffect(() => {
    loadService();
  }, []);

  async function loadService() {

    const data = await getService(Number(id));

    setService(data);

  }

  if (!service)

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

          <Wrench
            size={34}
            className="text-cyan-400"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {service.ServiceName}
            </h1>

            <p className="text-gray-400">
              {service.Status}
            </p>

          </div>

        </div>

        <div className="space-y-6">

          <div>

            <h3 className="text-gray-400">
              Description
            </h3>

            <p className="mt-2">
              {service.Description}
            </p>

          </div>

          <div>

            <h3 className="text-gray-400">
              Icon
            </h3>

            <p>{service.Icon}</p>

          </div>

          <div>

            <h3 className="text-gray-400">
              Created
            </h3>

            <p>
              {new Date(
                service.CreatedAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}