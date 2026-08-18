"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getCompany } from "@/lib/company";

export default function CompanyDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompany() {
      try {
        const data = await getCompany(Number(params.id));
        setCompany(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCompany();
  }, [params.id]);

  if (loading) {
    return (
      <main className="p-8 text-white">
        Loading...
      </main>
    );
  }

  if (!company) {
    return (
      <main className="p-8 text-white">
        Company not found.
      </main>
    );
  }

  return (
    <main className="p-8 text-white">

      <button
        onClick={() => router.back()}
        className="mb-6 bg-slate-800 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      <div className="bg-slate-900 rounded-xl p-8">

        <h1 className="text-4xl font-bold">
          {company.CompanyName}
        </h1>

        <div className="grid grid-cols-2 gap-6 mt-8">

          <div>
            <p className="text-gray-400">Industry</p>
            <p>{company.Industry}</p>
          </div>

          <div>
            <p className="text-gray-400">Website</p>
            <p>{company.Website}</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p>{company.Email}</p>
          </div>

          <div>
            <p className="text-gray-400">Phone</p>
            <p>{company.Phone}</p>
          </div>

          <div>
            <p className="text-gray-400">City</p>
            <p>{company.City}</p>
          </div>

          <div>
            <p className="text-gray-400">Country</p>
            <p>{company.Country}</p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-400">Address</p>
            <p>{company.Address}</p>
          </div>

        </div>

      </div>

    </main>
  );
}