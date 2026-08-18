"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import api from "@/lib/api";

interface LoginResponse {
  access_token: string;
  token_type: string;
  role?: string;
  user?: {
    UserID?: number;
    FullName?: string;
    Email?: string;
    Phone?: string;
    Role?: string;
    role?: string;
  };
}

interface CurrentUser {
  UserID?: number;
  FullName?: string;
  Email?: string;
  Phone?: string;
  Role?: string;
  role?: string;
  RoleName?: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const loginResponse =
        await api.post<LoginResponse>(
          "/auth/login",
          {
            Email: email.trim(),
            Password: password,
          }
        );

      const token =
        loginResponse.data.access_token;

      if (!token) {
        throw new Error(
          "The backend did not return an access token."
        );
      }

      /*
       * Save token in localStorage for Axios.
       */
      localStorage.setItem(
        "access_token",
        token
      );

      /*
       * Save token in cookie for Next.js middleware.
       */
      Cookies.set(
        "access_token",
        token,
        {
          expires: 1,
          sameSite: "lax",
          secure:
            window.location.protocol ===
            "https:",
        }
      );

      /*
       * Make sure this request explicitly
       * contains the newly issued token.
       */
      const userResponse =
        await api.get<CurrentUser>(
          "/portal/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const user = userResponse.data;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      const role = String(
        loginResponse.data.role ??
          loginResponse.data.user?.Role ??
          loginResponse.data.user?.role ??
          user.Role ??
          user.role ??
          user.RoleName ??
          ""
      )
        .trim()
        .toUpperCase();

      /*
       * Save role in both storage locations.
       */
      localStorage.setItem(
        "user_role",
        role
      );

      Cookies.set(
        "user_role",
        role,
        {
          expires: 1,
          sameSite: "lax",
          secure:
            window.location.protocol ===
            "https:",
        }
      );

      /*
       * Role-based redirect.
       */
      if (role === "STUDENT") {
        router.replace(
          "/portal/student/dashboard"
        );
      } else if (
        role === "INSTRUCTOR"
      ) {
        router.replace(
          "/portal/instructor/dashboard"
        );
      } else if (
        role === "CLIENT"
      ) {
        router.replace(
          "/portal/client/dashboard"
        );
      } else {
        /*
         * SUPER_ADMIN, ADMIN, MANAGER,
         * EMPLOYEE, SALES, HR, FINANCE,
         * SUPPORT all go here.
         */
        router.replace("/dashboard");
      }

      router.refresh();
    } catch (requestError: any) {
      console.error(
        "Login failed:",
        requestError
      );

      localStorage.removeItem(
        "access_token"
      );
      localStorage.removeItem("user");
      localStorage.removeItem(
        "user_role"
      );

      Cookies.remove("access_token");
      Cookies.remove("user_role");

      const status =
        requestError?.response?.status;

      const detail =
        requestError?.response?.data
          ?.detail;

      if (
        typeof detail === "string"
      ) {
        setError(detail);
      } else if (status === 401) {
        setError(
          "Invalid email or password."
        );
      } else if (status === 422) {
        setError(
          "Please enter a valid email address and password."
        );
      } else if (
        !requestError?.response
      ) {
        setError(
          "Cannot connect to the Intellix backend. Make sure FastAPI is running."
        );
      } else {
        setError(
          "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-700 bg-white shadow-2xl lg:grid-cols-2">

          {/* LEFT PANEL */}
          <section className="hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-10 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30">
                  <LockKeyhole className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xl font-bold">
                    Intellix
                  </p>

                  <p className="text-sm text-blue-100">
                    Enterprise Management
                    Platform
                  </p>
                </div>
              </div>

              <h1 className="max-w-md text-4xl font-bold leading-tight">
                Run your CRM, LMS,
                clients and company from
                one platform.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                Secure access for
                administrators, employees,
                instructors, students and
                clients.
              </p>
            </div>

            <p className="text-sm text-blue-100">
              ©{" "}
              {new Date().getFullYear()}{" "}
              Intellix. All rights
              reserved.
            </p>
          </section>

          {/* RIGHT PANEL */}
          <section className="bg-white p-6 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-700">
                  Welcome back
                </p>

                <h2 className="text-3xl font-bold text-slate-950">
                  Intellix Platform Login
                </h2>

                <p className="mt-3 text-base text-slate-600">
                  CRM, LMS, client and
                  staff access
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"
                >
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value
                        )
                      }
                      placeholder="name@example.com"
                      autoComplete="email"
                      required
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-950 outline-none placeholder:text-slate-400 transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-12 text-base text-slate-950 outline-none placeholder:text-slate-400 transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) =>
                            !value
                        )
                      }
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-700 px-5 text-base font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {loading
                    ? "Signing in..."
                    : "Sign in"}
                </button>
              </form>

              {/* REGISTRATION */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Create an account
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/register/student"
                  className="flex h-11 items-center justify-center rounded-xl border border-blue-700 bg-white px-4 text-sm font-bold text-blue-800 transition hover:bg-blue-50"
                >
                  Student registration
                </Link>

                <Link
                  href="/register/client"
                  className="flex h-11 items-center justify-center rounded-xl border border-slate-400 bg-white px-4 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
                >
                  Client registration
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}