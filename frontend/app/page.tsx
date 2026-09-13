import Link from "next/link";
import {
  ArrowRight, BrainCircuit, Building2, CheckCircle2, GraduationCap,
  LayoutDashboard, LineChart, LockKeyhole, Network, Sparkles, Users, Workflow
} from "lucide-react";

const modules = [
  ["CRM & Sales", "Customers, leads, deals and activities in one command center.", Users],
  ["LMS & Academy", "Courses, lessons, enrollment, progress, assignments and grading.", GraduationCap],
  ["Projects", "Plan work, assign tasks, track meetings and delivery progress.", Workflow],
  ["AI Workspace", "RAG-powered assistance grounded in authorized Intellix knowledge.", BrainCircuit],
  ["Analytics", "Live operational metrics, revenue, performance and reporting.", LineChart],
  ["Enterprise", "A scalable foundation for HR, finance, clients and operations.", Network],
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#050816] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,.22),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(6,182,212,.15),transparent_28%),linear-gradient(180deg,#07101f_0%,#050816_100%)]"/>
        <div className="absolute inset-0 -z-10 bg-grid-dark bg-[size:38px_38px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"/>
        <div className="container-px mx-auto grid max-w-7xl items-center gap-14 py-24 sm:py-28 lg:grid-cols-[1.05fr_.95fr] lg:py-32">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-blue-200">
              <Sparkles size={15}/> AI-first enterprise platform
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.03] tracking-[-.045em] text-white sm:text-6xl lg:text-7xl">
              Run your business, academy and clients from <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">one intelligent platform.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">Intellix combines CRM, LMS, projects, portals, analytics and AI into a secure workspace designed for teams, students, instructors and clients.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500">Platform Login <ArrowRight size={17}/></Link>
              <Link href="/register/student" className="inline-flex items-center gap-2 rounded-xl border border-blue-400/35 bg-blue-400/10 px-6 py-3.5 text-sm font-extrabold text-blue-100 transition hover:bg-blue-400/15"><GraduationCap size={17}/> Student Registration</Link>
              <Link href="/register/client" className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-3.5 text-sm font-extrabold text-cyan-100 transition hover:bg-cyan-400/15"><Building2 size={17}/> Client Registration</Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-400">
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300"/>Role-based access</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300"/>Neon PostgreSQL</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-300"/>FastAPI + Next.js</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-12 rounded-full bg-blue-600/15 blur-3xl"/>
            <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/75 p-5 shadow-panel backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[.18em] text-blue-300">Intellix Command Center</p>
                  <h2 className="mt-2 text-xl font-black">Enterprise overview</h2>
                </div>
                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">Live</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[["Customers","128"],["Courses","18"],["Projects","42"],["AI Queries","1.8k"]].map(([label,value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
                    <p className="mt-2 text-3xl font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-blue-400/15 bg-gradient-to-br from-blue-600/15 to-cyan-500/5 p-5">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs font-bold text-slate-400">Platform health</p><p className="mt-1 text-2xl font-black">98.4%</p></div>
                  <LayoutDashboard className="text-blue-300"/>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full w-[98%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"/></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="divisions" className="container-px mx-auto max-w-7xl py-20 sm:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">One ecosystem</p>
          <h2 className="mt-4 text-3xl font-black sm:text-5xl">Everything your organization needs to operate, teach and grow.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">Each module shares the same users, permissions and data foundation, so your organization does not have to stitch together disconnected tools.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map(([title,description,Icon]: any) => (
            <div key={title} className="group rounded-2xl border border-white/10 bg-slate-900/55 p-6 transition hover:-translate-y-1 hover:border-blue-400/35 hover:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20"><Icon size={21}/></div>
              <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/60">
        <div className="container-px mx-auto grid max-w-7xl gap-8 py-20 lg:grid-cols-3">
          <div className="lg:col-span-1"><p className="eyebrow">Choose your access</p><h2 className="mt-4 text-3xl font-black">One login. The right workspace for every role.</h2></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            <Link href="/login" className="rounded-2xl border border-blue-400/25 bg-blue-500/10 p-6 transition hover:bg-blue-500/15"><LockKeyhole className="text-blue-300"/><h3 className="mt-5 text-xl font-black">Staff & Admin Login</h3><p className="mt-2 text-sm leading-6 text-slate-400">Super Admin, Admin, Instructor, staff and existing users.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-300">Sign in <ArrowRight size={15}/></span></Link>
            <Link href="/register/student" className="rounded-2xl border border-indigo-400/25 bg-indigo-500/10 p-6 transition hover:bg-indigo-500/15"><GraduationCap className="text-indigo-300"/><h3 className="mt-5 text-xl font-black">Student Registration</h3><p className="mt-2 text-sm leading-6 text-slate-400">Create an Academy account and access enrolled courses and assignments.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-300">Join Academy <ArrowRight size={15}/></span></Link>
            <Link href="/register/client" className="rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-6 transition hover:bg-cyan-500/15"><Building2 className="text-cyan-300"/><h3 className="mt-5 text-xl font-black">Client Registration</h3><p className="mt-2 text-sm leading-6 text-slate-400">Create a client account for projects, communication and service visibility.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">Create client account <ArrowRight size={15}/></span></Link>
            <Link href="/academy" className="rounded-2xl border border-violet-400/25 bg-violet-500/10 p-6 transition hover:bg-violet-500/15"><Sparkles className="text-violet-300"/><h3 className="mt-5 text-xl font-black">Explore Academy</h3><p className="mt-2 text-sm leading-6 text-slate-400">Browse published Intellix courses before creating a student account.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-violet-300">Browse courses <ArrowRight size={15}/></span></Link>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-20 sm:py-24">
        <div className="rounded-[2rem] border border-blue-400/20 bg-gradient-to-r from-blue-700/30 via-indigo-700/20 to-cyan-600/20 p-8 sm:p-12 lg:flex lg:items-center lg:justify-between">
          <div><p className="eyebrow">Ready to enter Intellix?</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Your platform, academy and client workspace are one click away.</h2><p className="mt-4 max-w-2xl text-slate-300">Sign in if you already have an account, or create the account type that matches how you use Intellix.</p></div>
          <div className="mt-7 flex flex-wrap gap-3 lg:mt-0 lg:pl-8"><Link href="/login" className="rounded-xl bg-white px-5 py-3 font-extrabold text-slate-950 transition hover:bg-blue-50">Login</Link><Link href="/register" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-extrabold text-white transition hover:bg-white/10">Create account</Link></div>
        </div>
      </section>
    </div>
  );
}
