"use client";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/auth";

export default function ResetPasswordPage() {
  const router = useRouter(); const params = useSearchParams();
  const [password,setPassword]=useState(""); const [confirm,setConfirm]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  async function submit(e:FormEvent){e.preventDefault();setError("");if(password!==confirm){setError("Passwords do not match");return;}setLoading(true);try{await api.post("/auth/reset-password",{Token:params.get("token")||"",NewPassword:password});router.push("/login");}catch(err:any){setError(err.response?.data?.detail||"Reset failed");}finally{setLoading(false)}}
  return <main className="min-h-screen grid place-items-center bg-slate-950 p-6"><form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"><h1 className="text-2xl font-bold">Reset password</h1>{error&&<p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}<label className="mt-6 block text-sm font-medium">New password</label><input className="mt-1 w-full rounded border p-3" type="password" minLength={8} value={password} onChange={e=>setPassword(e.target.value)} required/><label className="mt-4 block text-sm font-medium">Confirm password</label><input className="mt-1 w-full rounded border p-3" type="password" minLength={8} value={confirm} onChange={e=>setConfirm(e.target.value)} required/><button className="mt-6 w-full rounded bg-blue-600 p-3 font-semibold text-white" disabled={loading}>{loading?"Resetting...":"Reset password"}</button></form></main>;
}
