"use client";

import { useEffect, useState } from "react";

import {
  createCustomer,
  updateCustomer,
} from "@/lib/customer";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  customer?: any;
}

export default function CustomerModal({
  open,
  onClose,
  onSuccess,
  customer,
}: Props) {
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Address: "",
    City: "",
    Country: "",
    CompanyID: "",
  });

  useEffect(() => {
    if (customer) {
      setForm({
        FirstName: customer.FirstName || "",
        LastName: customer.LastName || "",
        Email: customer.Email || "",
        Phone: customer.Phone || "",
        Address: customer.Address || "",
        City: customer.City || "",
        Country: customer.Country || "",
        CompanyID: customer.CompanyID?.toString() || "",
      });
    } else {
      setForm({
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        Address: "",
        City: "",
        Country: "",
        CompanyID: "",
      });
    }
  }, [customer]);

  async function saveCustomer() {
    try {
      const payload = {
        ...form,
        CompanyID: form.CompanyID
          ? Number(form.CompanyID)
          : null,
      };

      if (customer) {
        await updateCustomer(customer.CustomerID, payload);
        alert("Customer updated successfully");
      } else {
        await createCustomer(payload);
        alert("Customer created successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-xl p-8 w-[700px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-6">
          {customer ? "Edit Customer" : "Add Customer"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="First Name"
            className="p-3 rounded bg-slate-800"
            value={form.FirstName}
            onChange={(e) =>
              setForm({ ...form, FirstName: e.target.value })
            }
          />

          <input
            placeholder="Last Name"
            className="p-3 rounded bg-slate-800"
            value={form.LastName}
            onChange={(e) =>
              setForm({ ...form, LastName: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="p-3 rounded bg-slate-800"
            value={form.Email}
            onChange={(e) =>
              setForm({ ...form, Email: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            className="p-3 rounded bg-slate-800"
            value={form.Phone}
            onChange={(e) =>
              setForm({ ...form, Phone: e.target.value })
            }
          />

          <input
            placeholder="City"
            className="p-3 rounded bg-slate-800"
            value={form.City}
            onChange={(e) =>
              setForm({ ...form, City: e.target.value })
            }
          />

          <input
            placeholder="Country"
            className="p-3 rounded bg-slate-800"
            value={form.Country}
            onChange={(e) =>
              setForm({ ...form, Country: e.target.value })
            }
          />

          <input
            placeholder="Company ID"
            className="p-3 rounded bg-slate-800"
            value={form.CompanyID}
            onChange={(e) =>
              setForm({ ...form, CompanyID: e.target.value })
            }
          />

          <input
            placeholder="Address"
            className="p-3 rounded bg-slate-800 col-span-2"
            value={form.Address}
            onChange={(e) =>
              setForm({ ...form, Address: e.target.value })
            }
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="bg-gray-700 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={saveCustomer}
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg"
          >
            {customer ? "Update" : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}