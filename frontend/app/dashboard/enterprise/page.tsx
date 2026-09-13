"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { enterpriseApi } from "@/services/enterprise.service";
const links=[
 ["Employees","/dashboard/hr/employees"],["Invoices","/dashboard/finance/invoices"],
 ["Support","/dashboard/support/tickets"],["AI Assistant","/dashboard/ai"],["Knowledge Base","/dashboard/knowledge"]
];
export default function EnterprisePage(){
 const [data,setData]=useState<Record<string,number>>({});
 useEffect(()=>{void enterpriseApi.overview().then(setData).catch(console.error)},[]);
 return <div className="p-6 space-y-6"><div><h1 className="text-3xl font-bold">Intellix Enterprise</h1><p className="text-slate-500">Unified CRM, HR, finance, support, LMS and AI workspace.</p></div>
 <div className="grid gap-4 md:grid-cols-4">{Object.entries(data).map(([k,v])=><div key={k} className="rounded-xl border bg-white p-5"><div className="text-sm text-slate-500 capitalize">{k.replaceAll("_"," ")}</div><div className="text-3xl font-semibold">{v}</div></div>)}</div>
 <div className="grid gap-4 md:grid-cols-3">{links.map(([t,h])=><Link key={h} href={h} className="rounded-xl border bg-white p-6 font-semibold hover:shadow">{t} →</Link>)}</div></div>
}
