"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
} from "lucide-react";

import api from "@/lib/api";

export default function StudentRegistrationPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
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
      await api.post("/portal/students/register", {
        FullName: fullName.trim(),
        Email: email.trim(),
        Phone: phone.trim(),
        Password: password,
      });

      setSuccess(
        "Student account created successfully. You can now sign in."
      );

      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else if (err?.response?.status === 422) {
        setError(
          "Please check the information you entered."
        );
      } else {
        setError(
          "Registration failed. Please try again."
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

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-8 text-white sm:px-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
              <GraduationCap className="h-7 w-7" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Student Registration
            </h1>

            <p className="mt-2 text-base text-blue-100">
              Create your Intellix Academy student account
            </p>
          </div>

          {/* Form */}
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

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-bold text-slate-800"
                >
                  Full name
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    required
                    disabled={loading}
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-800"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="student@example.com"
                    required
                    disabled={loading}
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-bold text-slate-800"
                >
                  Phone number
                </label>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="03XX XXXXXXX"
                    disabled={loading}
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-800"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Create a strong password"
                    required
                    minLength={8}
                    disabled={loading}
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-12 text-base font-medium text-slate-950 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs font-medium text-slate-500">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-700 px-5 text-base font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading
                  ? "Creating account..."
                  : "Create student account"}
              </button>
            </form>

            {/* Login link */}
            <div className="mt-7 border-t border-slate-200 pt-6 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-blue-700 hover:text-blue-900 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}