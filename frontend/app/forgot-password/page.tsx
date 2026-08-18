"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setMessage(""); setResetUrl("");
    try {
      const { data } = await api.post("/auth/forgot-password", { Email: email });
      setMessage(data.message);
      if (data.reset_url) setResetUrl(data.reset_url);
    } catch (error: any) { setMessage(error.response?.data?.detail || "Request failed"); }
    finally { setLoading(false); }
  }
  return <main className="min-h-screen grid place-items-center bg-slate-950 p-6"><form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"><h1 className="text-2xl font-bold">Forgot password</h1><p className="mt-2 text-sm text-slate-500">Enter your Intellix account email.</p>{message && <p className="mt-4 rounded bg-blue-50 p-3 text-sm text-blue-800">{message}</p>}{resetUrl && <a className="mt-3 block break-all text-sm text-blue-600 underline" href={resetUrl}>Open development reset link</a>}<label className="mt-6 block text-sm font-medium">Email</label><input className="mt-1 w-full rounded border p-3" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/><button className="mt-6 w-full rounded bg-blue-600 p-3 font-semibold text-white" disabled={loading}>{loading?"Submitting...":"Create reset link"}</button><Link className="mt-5 block text-center text-sm text-blue-600" href="/login">Back to login</Link></form></main>;
}
