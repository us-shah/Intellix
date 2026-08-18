"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getCustomer } from "@/lib/customer";

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomer() {
      try {
        const data = await getCustomer(Number(params.id));
        setCustomer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCustomer();
  }, [params.id]);

  if (loading) {
    return (
      <main className="p-8 text-white">
        Loading customer...
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="p-8 text-white">
        Customer not found.
      </main>
    );
  }

  return (
    <main className="p-8 text-white">

      <button
        onClick={() => router.back()}
        className="mb-6 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      <div className="bg-slate-900 rounded-xl p-8">

        <h1 className="text-4xl font-bold">
          {customer.FirstName} {customer.LastName}
        </h1>

        <p className="text-gray-400 mt-2">
          Customer Information
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          <div>
            <p className="text-gray-400">First Name</p>
            <p>{customer.FirstName}</p>
          </div>

          <div>
            <p className="text-gray-400">Last Name</p>
            <p>{customer.LastName || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p>{customer.Email || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400">Phone</p>
            <p>{customer.Phone || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400">City</p>
            <p>{customer.City || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400">Country</p>
            <p>{customer.Country || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400">Company ID</p>
            <p>{customer.CompanyID || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400">Created At</p>
            <p>{customer.CreatedAt || "-"}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-400">Address</p>
            <p>{customer.Address || "-"}</p>
          </div>

        </div>

      </div>

    </main>
  );
}