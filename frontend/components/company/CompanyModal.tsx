"use client";

import { useEffect, useState } from "react";
import { createCompany, updateCompany } from "@/lib/company";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  company?: any;
}

const emptyForm = {
  CompanyName: "",
  Industry: "",
  Website: "",
  Email: "",
  Phone: "",
  Address: "",
  City: "",
  Country: "",
};

export default function CompanyModal({
  open,
  onClose,
  onSuccess,
  company,
}: Props) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (company) {
      setForm({
        CompanyName: company.CompanyName || "",
        Industry: company.Industry || "",
        Website: company.Website || "",
        Email: company.Email || "",
        Phone: company.Phone || "",
        Address: company.Address || "",
        City: company.City || "",
        Country: company.Country || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [company, open]);

  async function saveCompany() {
    if (!form.CompanyName.trim()) {
      alert("Company Name is required.");
      return;
    }

    if (!form.Country.trim()) {
      alert("Country is required.");
      return;
    }

    try {
      setLoading(true);

      if (company) {
        await updateCompany(company.CompanyID, form);
        alert("Company updated successfully.");
      } else {
        await createCompany(form);
        alert("Company created successfully.");
      }

      setForm(emptyForm);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save company.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl rounded-2xl bg-slate-900 shadow-2xl">

        <div className="border-b border-slate-700 px-8 py-5">
          <h2 className="text-2xl font-bold text-white">
            {company ? "Edit Company" : "Add Company"}
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Fill in the company information below.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 p-8">

          <div>
            <label className="text-sm text-gray-400">
              Company Name *
            </label>

            <input
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
              value={form.CompanyName}
              onChange={(e) =>
                setForm({
                  ...form,
                  CompanyName: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Industry
            </label>

            <input
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
              value={form.Industry}
              onChange={(e) =>
                setForm({
                  ...form,
                  Industry: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Website
            </label>

            <input
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
              value={form.Website}
              onChange={(e) =>
                setForm({
                  ...form,
                  Website: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Email
            </label>

            <input
              type="email"
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
              value={form.Email}
              onChange={(e) =>
                setForm({
                  ...form,
                  Email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Phone
            </label>

            <input
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
              value={form.Phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  Phone: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              City
            </label>

            <input
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
              value={form.City}
              onChange={(e) =>
                setForm({
                  ...form,
                  City: e.target.value,
                })
              }
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm text-gray-400">
              Address
            </label>

            <input
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
              value={form.Address}
              onChange={(e) =>
                setForm({
                  ...form,
                  Address: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Country *
            </label>

            <input
              className="mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
              value={form.Country}
              onChange={(e) =>
                setForm({
                  ...form,
                  Country: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 border-t border-slate-700 px-8 py-5">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg bg-gray-700 px-5 py-2 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={saveCompany}
            disabled={loading}
            className="rounded-lg bg-cyan-600 px-5 py-2 text-white hover:bg-cyan-700"
          >
            {loading
              ? "Saving..."
              : company
              ? "Update Company"
              : "Save Company"}
          </button>

        </div>

      </div>

    </div>
  );
}