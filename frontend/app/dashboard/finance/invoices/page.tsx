"use client";
import { FormEvent, useEffect, useState } from "react";
import { enterpriseApi } from "@/services/enterprise.service";
export default function InvoicesPage(){
 const [items,setItems]=useState<any[]>([]); const [number,setNumber]=useState(""); const [amount,setAmount]=useState(0);
 const load=()=>enterpriseApi.invoices().then(setItems); useEffect(()=>{void load()},[]);
 async function submit(e:FormEvent){e.preventDefault();await enterpriseApi.createInvoice({InvoiceNumber:number,Subtotal:amount,TaxAmount:0,TotalAmount:amount,PaidAmount:0,Currency:"PKR",Status:"draft"});setNumber("");setAmount(0);await load()}
 return <div className="p-6 space-y-6"><h1 className="text-3xl font-bold">Invoices</h1><form onSubmit={submit} className="grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-3"><input required value={number} onChange={e=>setNumber(e.target.value)} placeholder="Invoice number" className="border rounded p-2"/><input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} placeholder="Amount" className="border rounded p-2"/><button className="rounded bg-slate-900 text-white">Create invoice</button></form><div className="grid gap-3">{items.map(x=><div key={x.InvoiceID} className="rounded-xl border bg-white p-4 flex justify-between"><span>{x.InvoiceNumber}</span><span>PKR {Number(x.TotalAmount).toLocaleString()} · {x.Status}</span></div>)}</div></div>
}
