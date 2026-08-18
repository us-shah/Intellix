"use client";

import { useEffect, useState } from "react";
import { getDeals } from "@/lib/deal";

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeals();
  }, []);

  async function loadDeals() {
    try {
      const data = await getDeals();
      setDeals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="p-8 text-white">Loading Deals...</p>;
  }

  return (
    <main className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Deals
      </h1>

      <table className="w-full border border-slate-700">
        <thead className="bg-slate-900">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Title</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Stage</th>
            <th className="p-3">Expected Close</th>
          </tr>
        </thead>

        <tbody>
          {deals.map((deal) => (
            <tr key={deal.DealID}>
              <td className="p-3">{deal.DealID}</td>
              <td className="p-3">{deal.CustomerID}</td>
              <td className="p-3">{deal.Title}</td>
              <td className="p-3">{deal.Amount}</td>
              <td className="p-3">{deal.Stage}</td>
              <td className="p-3">
                {deal.ExpectedCloseDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}