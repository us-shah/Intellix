"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  User,
  Mail,
  Phone,
  LockKeyhole,
  Globe,
  BriefcaseBusiness,
} from "lucide-react";

import api from "@/lib/api";

export default function ClientRegistrationPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/portal/clients/register", {
        FullName: fullName.trim(),
        Email: email.trim(),
        Phone: phone.trim(),
        Password: password,
        CompanyName: companyName.trim(),
        Industry: industry.trim(),
        Website: website.trim(),
      });

      setSuccess(
        "Client account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else {
        setError(
          "Client registration failed. Please check your information."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl items-center">
        <div className="w-full overflow-hidden rounded-3xl border border-slate-700 bg-white shadow-2xl">

          <div className="bg-gradient-to-r from-blue-700 to-slate-950 px-6 py-8 text-white sm:px-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
              <Building2 className="h-7 w-7 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Client Registration
            </h1>

            <p className="mt-2 text-blue-100">
              Create your Intellix client account
            </p>
          </div>

          <div className="bg-white p-6 sm:p-10">

            {error && (
              <div className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 font-semibold text-red-800">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 rounded-xl border border-green-300 bg-green-50 px-4 py-3 font-semibold text-green-800">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <Field
                label="Full name"
                icon={<User className="h-5 w-5" />}
              >
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none placeholder:text-slate-500 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </Field>

              <Field
                label="Email address"
                icon={<Mail className="h-5 w-5" />}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@example.com"
                  required
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none placeholder:text-slate-500 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </Field>

              <Field
                label="Phone"
                icon={<Phone className="h-5 w-5" />}
              >
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX XXXXXXX"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none placeholder:text-slate-500 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </Field>

              <Field
                label="Password"
                icon={<LockKeyhole className="h-5 w-5" />}
              >
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none placeholder:text-slate-500 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </Field>

              <Field
                label="Company name"
                icon={<Building2 className="h-5 w-5" />}
              >
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  required
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none placeholder:text-slate-500 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </Field>

              <Field
                label="Industry"
                icon={<BriefcaseBusiness className="h-5 w-5" />}
              >
                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Software, Retail, Education"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none placeholder:text-slate-500 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </Field>

              <Field
                label="Website"
                icon={<Globe className="h-5 w-5" />}
              >
                <input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none placeholder:text-slate-500 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-blue-700 text-base font-bold text-white shadow-lg transition hover:bg-blue-800 disabled:bg-slate-400"
              >
                {loading
                  ? "Creating account..."
                  : "Create client account"}
              </button>
            </form>

            <div className="mt-7 border-t border-slate-200 pt-6 text-center">
              <Link
                href="/login"
                className="font-bold text-blue-700 hover:text-blue-900 hover:underline"
              >
                Back to login
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-800">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </div>

        {children}
      </div>
    </div>
  );
}