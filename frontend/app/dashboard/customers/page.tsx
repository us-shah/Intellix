"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getCustomers,
  deleteCustomer,
} from "@/lib/customer";

import CustomerModal from "@/components/customer/CustomerModal";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);
      loadCustomers();
    } catch {
      alert("Delete failed");
    }
  }

  const filtered = customers.filter((customer) =>
    `${customer.FirstName} ${customer.LastName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Customers
          </h1>

          <p className="text-gray-400">
            Manage all customers.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded-lg"
        >
          + Add Customer
        </button>

      </div>

      <div className="mb-6">

        <input
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-96 rounded-lg bg-slate-900 border border-slate-700 px-4 py-3"
        />

      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-6">

        <h3 className="text-gray-400">
          Total Customers
        </h3>

        <p className="text-4xl font-bold">
          {customers.length}
        </p>

      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-900">

            <tr>

              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
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
                <td colSpan={7} className="text-center p-6">
                  Loading...
                </td>
              </tr>

            ) : filtered.length === 0 ? (

              <tr>
                <td colSpan={7} className="text-center p-6">
                  No customers found.
                </td>
              </tr>

            ) : (

              filtered.map((customer) => (

                <tr
                  key={customer.CustomerID}
                  className="border-t border-slate-800"
                >

                  <td className="p-4">
                    {customer.CustomerID}
                  </td>

                  <td className="p-4">

                    <Link
                      href={`/dashboard/customers/${customer.CustomerID}`}
                      className="text-cyan-400 hover:underline"
                    >
                      {customer.FirstName} {customer.LastName}
                    </Link>

                  </td>

                  <td className="p-4">
                    {customer.Email}
                  </td>

                  <td className="p-4">
                    {customer.Phone}
                  </td>

                  <td className="p-4">
                    {customer.City}
                  </td>

                  <td className="p-4">
                    {customer.Country}
                  </td>

                  <td className="p-4 text-center space-x-2">

                    <button
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setOpenModal(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(customer.CustomerID)}
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

      <CustomerModal
        open={openModal}
        customer={selectedCustomer}
        onClose={() => {
          setOpenModal(false);
          setSelectedCustomer(null);
        }}
        onSuccess={loadCustomers}
      />

    </main>
  );
}