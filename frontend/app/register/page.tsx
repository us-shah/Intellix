import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, GraduationCap, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-5 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(37,99,235,.22),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,.12),transparent_30%)]"/>
      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl items-center justify-center">
        <div className="w-full">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={16}/>Back to Intellix</Link>
          <div className="text-center"><p className="eyebrow">Create your account</p><h1 className="mt-4 text-4xl font-black sm:text-5xl">How will you use Intellix?</h1><p className="mx-auto mt-4 max-w-2xl text-slate-400">Choose the account type that matches your role. Staff and administrators are created by authorized administrators.</p></div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            <Link href="/register/student" className="group rounded-3xl border border-indigo-400/25 bg-indigo-500/10 p-8 shadow-panel transition hover:-translate-y-1 hover:border-indigo-300/50 hover:bg-indigo-500/15"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-400/15 text-indigo-200"><GraduationCap size={28}/></div><h2 className="mt-6 text-2xl font-black">Student account</h2><p className="mt-3 leading-7 text-slate-400">Access enrolled courses, lessons, progress, assignments, submissions and results.</p><span className="mt-7 inline-flex items-center gap-2 font-extrabold text-indigo-300">Register as student <ArrowRight size={17}/></span></Link>
            <Link href="/register/client" className="group rounded-3xl border border-cyan-400/25 bg-cyan-500/10 p-8 shadow-panel transition hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-cyan-500/15"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200"><Building2 size={28}/></div><h2 className="mt-6 text-2xl font-black">Client account</h2><p className="mt-3 leading-7 text-slate-400">Access client-facing projects, communication, services and account information.</p><span className="mt-7 inline-flex items-center gap-2 font-extrabold text-cyan-300">Register as client <ArrowRight size={17}/></span></Link>
          </div>
          <div className="mx-auto mt-8 flex max-w-4xl items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[.03] px-5 py-4 text-sm text-slate-400"><ShieldCheck size={17} className="text-emerald-300"/>Already registered? <Link href="/login" className="font-extrabold text-blue-300 hover:text-white">Sign in to Intellix</Link></div>
        </div>
      </div>
    </main>
  );
}
