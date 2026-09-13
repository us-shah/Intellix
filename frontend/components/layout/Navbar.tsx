"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, GraduationCap, Building2 } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/90 text-white backdrop-blur-xl">
      <nav className="container-px mx-auto flex h-18 max-w-7xl items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-black text-white shadow-lg shadow-blue-500/25">IX</span>
          <div>
            <div className="text-lg font-black tracking-tight text-white">Intellix</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">Enterprise + Academy</div>
          </div>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-slate-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/register/student" className="rounded-xl px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/5 hover:text-white">
            Student
          </Link>
          <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500">
            Platform Login <ArrowRight size={16}/>
          </Link>
        </div>

        <button className="rounded-lg p-2 text-white lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X/> : <Menu/>}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#07101f] px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="font-semibold text-slate-300 hover:text-white">
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link href="/register/student" className="flex items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 font-bold text-blue-200"><GraduationCap size={17}/>Student</Link>
              <Link href="/register/client" className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 font-bold text-cyan-200"><Building2 size={17}/>Client</Link>
            </div>
            <Link href="/login" className="rounded-xl bg-blue-600 px-4 py-3 text-center font-extrabold text-white">Platform Login</Link>
          </div>
        </div>
      )}
    </header>
  );
}
