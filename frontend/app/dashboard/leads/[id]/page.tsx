"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLead } from "@/lib/lead";
export default function LeadDetailsPage() { const params=useParams<{id:string}>(); const [lead,setLead]=useState<any>(null); const [error,setError]=useState(""); useEffect(()=>{getLead(Number(params.id)).then(setLead).catch(()=>setError("Unable to load lead"));},[params.id]); if(error)return <main className="p-8 text-red-400">{error}</main>; if(!lead)return <main className="p-8 text-white">Loading lead...</main>; return <main className="p-8 text-white"><h1 className="text-3xl font-bold">{lead.FullName || lead.Name}</h1><div className="mt-6 grid gap-4 rounded-xl border border-slate-700 bg-slate-900 p-6 md:grid-cols-2"><p><b>Email:</b> {lead.Email || "—"}</p><p><b>Phone:</b> {lead.Phone || "—"}</p><p><b>Status:</b> {lead.Status || "—"}</p><p><b>Source:</b> {lead.Source || "—"}</p></div></main>; }
