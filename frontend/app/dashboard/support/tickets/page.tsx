"use client";
import { FormEvent, useEffect, useState } from "react";
import { enterpriseApi } from "@/services/enterprise.service";
export default function TicketsPage(){
 const [items,setItems]=useState<any[]>([]);const [subject,setSubject]=useState("");const [description,setDescription]=useState("");
 const load=()=>enterpriseApi.tickets().then(setItems);useEffect(()=>{void load()},[]);
 async function submit(e:FormEvent){e.preventDefault();await enterpriseApi.createTicket({Subject:subject,Description:description,Priority:"medium"});setSubject("");setDescription("");await load()}
 return <div className="p-6 space-y-6"><h1 className="text-3xl font-bold">Support Desk</h1><form onSubmit={submit} className="space-y-3 rounded-xl border bg-white p-4"><input required value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Subject" className="w-full border rounded p-2"/><textarea required value={description} onChange={e=>setDescription(e.target.value)} placeholder="Describe the issue" className="w-full border rounded p-2"/><button className="rounded bg-slate-900 px-5 py-2 text-white">Create ticket</button></form>{items.map(x=><div key={x.TicketID} className="rounded-xl border bg-white p-4"><div className="font-semibold">#{x.TicketID} {x.Subject}</div><div className="text-sm text-slate-500">{x.Priority} · {x.Status}</div></div>)}</div>
}
