"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, Eye, EyeOff, GraduationCap, LockKeyhole, Mail, ShieldCheck, Sparkles } from "lucide-react";
import api from "@/lib/api";
import { saveSession, clearSession } from "@/lib/auth";

interface LoginResponse {
  access_token: string;
  token_type: string;
  role?: string;
  permissions?: string[];
  user?: { UserID?: number; FullName?: string; Email?: string; Phone?: string; Role?: string; role?: string };
}
interface CurrentUser { UserID?: number; FullName?: string; Email?: string; Phone?: string; Role?: string; role?: string; RoleName?: string; Permissions?: string[] }

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const loginResponse = await api.post<LoginResponse>("/auth/login", { Email: email.trim(), Password: password });
      const token = loginResponse.data.access_token;
      if (!token) throw new Error("The backend did not return an access token.");
      // Put the token in session-scoped browser storage/cookie before /portal/me.
      saveSession(token, loginResponse.data.role ?? loginResponse.data.user?.Role ?? loginResponse.data.user?.role, loginResponse.data.user, loginResponse.data.permissions);
      const userResponse = await api.get<CurrentUser>("/portal/me", { headers: { Authorization: `Bearer ${token}` } });
      const user = userResponse.data;
      const role = String(loginResponse.data.role ?? loginResponse.data.user?.Role ?? loginResponse.data.user?.role ?? user.Role ?? user.role ?? user.RoleName ?? "").trim().toUpperCase();
      saveSession(token, role, user, loginResponse.data.permissions ?? user.Permissions);
      if (role === "STUDENT") window.location.href = "/portal/student/dashboard";
      else if (role === "INSTRUCTOR") window.location.href = "/portal/instructor/dashboard";
      else if (role === "CLIENT") window.location.href = "/portal/client/dashboard";
      else window.location.href = "/dashboard";
    } catch (requestError: any) {
      clearSession();
      const status = requestError?.response?.status; const detail = requestError?.response?.data?.detail;
      if (typeof detail === "string") setError(detail);
      else if (status === 401) setError("Invalid email or password.");
      else if (status === 422) setError("Please enter a valid email address and password.");
      else if (!requestError?.response) setError("Cannot connect to the Intellix backend. Make sure FastAPI is running.");
      else setError("Login failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,.24),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(6,182,212,.11),transparent_30%)]"/>
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="w-full">
          <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-white"><ArrowLeft size={16}/>Back to Intellix</Link>
          <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-panel backdrop-blur-xl lg:grid-cols-[.95fr_1.05fr]">
            <section className="relative hidden overflow-hidden border-r border-white/10 p-12 lg:flex lg:flex-col lg:justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700/45 via-indigo-800/20 to-cyan-500/10"/>
              <div className="relative">
                <div className="mb-12 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30"><LockKeyhole/></div><div><p className="text-xl font-black">Intellix</p><p className="text-xs font-bold uppercase tracking-[.16em] text-blue-200">Enterprise + Academy</p></div></div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1.5 text-xs font-extrabold text-blue-100"><Sparkles size={14}/>One secure identity</div>
                <h1 className="mt-5 max-w-md text-4xl font-black leading-tight">One login for your entire Intellix workspace.</h1>
                <p className="mt-5 max-w-md leading-7 text-slate-300">Your role automatically opens the right experience — command center, student LMS, instructor workspace or client portal.</p>
                <div className="mt-8 space-y-3 text-sm font-semibold text-slate-300"><p className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-300"/>JWT-secured access</p><p className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-300"/>Role-based routing</p><p className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-300"/>Shared CRM + LMS identity</p></div>
              </div>
              <p className="relative text-xs text-slate-500">© {new Date().getFullYear()} Intellix. Secure enterprise access.</p>
            </section>

            <section className="p-6 sm:p-10 lg:p-12">
              <div className="mx-auto max-w-md">
                <p className="eyebrow">Welcome back</p>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Sign in to Intellix</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">Use the account provided to you, or create a student/client account below.</p>
                {error && <div role="alert" className="mt-6 rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">{error}</div>}
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div><label htmlFor="email" className="dark-label">Email address</label><div className="relative"><Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"/><input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" autoComplete="email" required disabled={loading} className="dark-input pl-12 pr-4"/></div></div>
                  <div><div className="mb-2 flex items-center justify-between gap-4"><label htmlFor="password" className="text-sm font-bold text-slate-200">Password</label><Link href="/forgot-password" className="auth-link text-sm">Forgot password?</Link></div><div className="relative"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"/><input id="password" type={showPassword?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required disabled={loading} className="dark-input pl-12 pr-12"/><button type="button" onClick={()=>setShowPassword(v=>!v)} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white" aria-label="Toggle password">{showPassword?<EyeOff size={19}/>:<Eye size={19}/>}</button></div></div>
                  <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-base font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700">{loading?"Signing in...":<>Sign in <ArrowRight size={17}/></>}</button>
                </form>
                <div className="my-7 flex items-center gap-4"><div className="h-px flex-1 bg-white/10"/><span className="text-xs font-bold uppercase tracking-[.14em] text-slate-500">New to Intellix?</span><div className="h-px flex-1 bg-white/10"/></div>
                <div className="grid gap-3 sm:grid-cols-2"><Link href="/register/student" className="flex h-12 items-center justify-center gap-2 rounded-xl border border-indigo-400/25 bg-indigo-500/10 px-4 text-sm font-extrabold text-indigo-200 transition hover:bg-indigo-500/15"><GraduationCap size={17}/>Student</Link><Link href="/register/client" className="flex h-12 items-center justify-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-500/10 px-4 text-sm font-extrabold text-cyan-200 transition hover:bg-cyan-500/15"><Building2 size={17}/>Client</Link></div>
                <div className="mt-4 text-center"><Link href="/register" className="text-sm font-bold text-slate-400 hover:text-white">View registration options</Link></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
