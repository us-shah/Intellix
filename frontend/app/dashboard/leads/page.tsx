"use client";

import { useEffect, useState } from "react";
import { getLeads } from "@/lib/lead";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Leads</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-slate-700">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Source</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead.LeadID}>
                <td className="p-3">{lead.LeadID}</td>
                <td className="p-3">{lead.Name}</td>
                <td className="p-3">{lead.Email}</td>
                <td className="p-3">{lead.Phone}</td>
                <td className="p-3">{lead.Status}</td>
                <td className="p-3">{lead.Source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}