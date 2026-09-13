import Link from "next/link";
import { Github, Linkedin, Facebook, ArrowUpRight } from "lucide-react";

const columns = [
  { title: "Company", links: [["About","/about"],["Team","/team"],["Careers","/careers"],["Contact","/contact"]] },
  { title: "Platform", links: [["Platform Login","/login"],["Student Registration","/register/student"],["Client Registration","/register/client"],["Academy","/academy"]] },
  { title: "Explore", links: [["Services","/services"],["Portfolio","/portfolio"],["Case Studies","/case-studies"],["Resources","/resources"]] },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030611] text-white">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-[1.45fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-3 text-xl font-black">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm shadow-lg shadow-blue-500/20">IX</span>
              Intellix
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">One connected ecosystem for enterprise software, CRM, LMS, projects, analytics, AI and technology education.</p>
            <div className="mt-6 flex gap-3 text-slate-400">
              <a className="rounded-lg border border-white/10 p-2 transition hover:border-blue-400 hover:text-blue-300" href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={17}/></a>
              <a className="rounded-lg border border-white/10 p-2 transition hover:border-blue-400 hover:text-blue-300" href="https://github.com" aria-label="GitHub"><Github size={17}/></a>
              <a className="rounded-lg border border-white/10 p-2 transition hover:border-blue-400 hover:text-blue-300" href="https://facebook.com" aria-label="Facebook"><Facebook size={17}/></a>
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-extrabold text-white">{column.title}</h3>
              <ul className="mt-5 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 transition hover:text-white">{label}<ArrowUpRight size={13}/></Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Intellix. All rights reserved.</span>
          <span>Pakistan · Enterprise Software · AI · Academy</span>
        </div>
      </div>
    </footer>
  );
}
