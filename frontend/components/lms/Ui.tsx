import React from "react";
export function PageTitle({title,description,action}:{title:string;description?:string;action?:React.ReactNode}){return <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h1>{description&&<p className="mt-1 text-slate-500">{description}</p>}</div>{action}</header>}
export function Card({children,className=""}:{children:React.ReactNode;className?:string}){return <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>}
export function Empty({text}:{text:string}){return <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">{text}</div>}
export function ErrorBox({text}:{text:string}){return <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{text}</div>}
export const input="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
export const btn="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50";
export const secondary="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50";
