"use client";
import { FormEvent, useEffect, useState } from "react";
import { enterpriseApi } from "@/services/enterprise.service";
export default function EmployeesPage(){
 const [items,setItems]=useState<any[]>([]); const [code,setCode]=useState(""); const [title,setTitle]=useState("");
 const load=()=>enterpriseApi.employees().then(setItems);
 useEffect(()=>{void load()},[]);
 async function submit(e:FormEvent){e.preventDefault(); await enterpriseApi.createEmployee({EmployeeCode:code,JobTitle:title,EmploymentType:"full_time",Salary:0,Status:"active"});setCode("");setTitle("");await load()}
 return <div className="p-6 space-y-6"><h1 className="text-3xl font-bold">Employees</h1><form onSubmit={submit} className="grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-3"><input required value={code} onChange={e=>setCode(e.target.value)} placeholder="Employee code" className="border rounded p-2"/><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Job title" className="border rounded p-2"/><button className="rounded bg-slate-900 text-white">Add employee</button></form><div className="overflow-auto rounded-xl border bg-white"><table className="w-full text-sm"><thead><tr className="border-b"><th className="p-3 text-left">Code</th><th>Title</th><th>Status</th></tr></thead><tbody>{items.map(x=><tr key={x.EmployeeID} className="border-b"><td className="p-3">{x.EmployeeCode}</td><td>{x.JobTitle||"—"}</td><td>{x.Status}</td></tr>)}</tbody></table></div></div>
}
