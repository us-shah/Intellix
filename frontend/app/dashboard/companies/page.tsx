"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getCompanies } from "@/lib/company";
import CompanyModal from "@/components/company/CompanyModal";


export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error("Failed to load companies", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredCompanies = companies.filter((company) =>
    company.CompanyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-8 text-white">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Companies
          </h1>

          <p className="text-gray-400 mt-1">
            Manage all registered companies.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg"
        >
          + Add Company
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h3 className="text-gray-400">
            Total Companies
          </h3>

          <p className="text-4xl font-bold mt-2">
            {companies.length}
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="p-4 text-left">ID</th>

              <th className="p-4 text-left">Company</th>

              <th className="p-4 text-left">Industry</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Phone</th>

              <th className="p-4 text-left">City</th>

              <th className="p-4 text-left">Country</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={8}
                  className="text-center p-8"
                >
                  Loading companies...
                </td>

              </tr>

            ) : filteredCompanies.length === 0 ? (

              <tr>

                <td
                  colSpan={8}
                  className="text-center p-8 text-gray-400"
                >
                  No companies found.
                </td>

              </tr>

            ) : (

              filteredCompanies.map((company) => (

                <tr
                  key={company.CompanyID}
                  className="border-t border-slate-800 hover:bg-slate-900 transition"
                >

                  <td className="p-4">
                    {company.CompanyID}
                  </td>

                  <td className="p-4">

                    <Link
                      href={`/dashboard/companies/${company.CompanyID}`}
                      className="text-cyan-400 hover:underline"
                    >
                      {company.CompanyName}
                    </Link>

                  </td>

                  <td className="p-4">
                    {company.Industry}
                  </td>

                  <td className="p-4">
                    {company.Email}
                  </td>

                  <td className="p-4">
                    {company.Phone}
                  </td>

                  <td className="p-4">
                    {company.City}
                  </td>

                  <td className="p-4">
                    {company.Country}
                  </td>

                  <td className="p-4 text-center space-x-2">

                    <button
                     onClick={() => {
                       setSelectedCompany(company);
                    setOpenModal(true);
                          }}
                       className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Add Company Modal */}

      <CompanyModal
  open={openModal}
  company={selectedCompany}
  onClose={() => {
    setOpenModal(false);
    setSelectedCompany(null);
  }}
  onSuccess={loadCompanies}
/>

    </main>
  );
}