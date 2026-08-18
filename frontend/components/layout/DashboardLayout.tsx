"use client";

import { ReactNode } from "react";
import { Bell, Menu, Search } from "lucide-react";
import Sidebar from "./Sidebar";

interface Props { children: ReactNode }

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open navigation"><Menu size={20}/></button>
            <div>
              <div className="text-sm font-bold text-slate-950">Intellix Command Center</div>
              <div className="text-xs text-slate-500">Enterprise operations workspace</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex"><Search size={16}/><span>Search workspace</span></div>
            <button className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 hover:bg-slate-50" aria-label="Notifications"><Bell size={18}/></button>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
