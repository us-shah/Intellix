"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession } from "@/lib/auth";
import { BookOpen, ClipboardList, GraduationCap, LayoutDashboard, LogOut, School, Send, Users } from "lucide-react";

const sets = {
  admin:[
    ["Overview","/dashboard/lms",LayoutDashboard], ["Courses","/dashboard/lms/courses",BookOpen],
    ["Assignments","/dashboard/lms/assignments",ClipboardList], ["Enrollments","/dashboard/lms/enrollments",Users],
    ["Submissions","/dashboard/lms/submissions",Send],
  ],
  student:[
    ["Dashboard","/portal/student/dashboard",LayoutDashboard], ["My Courses","/portal/student/courses",BookOpen],
    ["Assignments","/portal/student/assignments",ClipboardList], ["Submissions","/portal/student/submissions",Send],
    ["Results","/portal/student/results",GraduationCap],
  ],
  instructor:[
    ["Dashboard","/portal/instructor/dashboard",LayoutDashboard], ["Courses","/portal/instructor/courses",BookOpen],
    ["Assignments","/portal/instructor/assignments",ClipboardList], ["Submissions","/portal/instructor/submissions",Send],
    ["Gradebook","/portal/instructor/gradebook",School],
  ]
} as const;

export default function LmsShell({mode,children}:{mode:keyof typeof sets;children:React.ReactNode}){
 const path=usePathname(); const router=useRouter();
 return <div className="min-h-screen bg-slate-100 lg:flex">
  <aside className="w-full bg-slate-950 text-white lg:min-h-screen lg:w-64">
   <div className="border-b border-slate-800 p-5"><p className="text-xl font-bold">Intellix Academy</p><p className="text-xs text-slate-400">{mode.toUpperCase()} PORTAL</p></div>
   <nav className="flex gap-1 overflow-x-auto p-3 lg:block lg:space-y-1">{sets[mode].map(([label,href,Icon])=><Link key={href} href={href} className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm ${path===href||path.startsWith(href+'/')?'bg-blue-600':'text-slate-300 hover:bg-slate-800'}`}><Icon size={18}/>{label}</Link>)}</nav>
   <button onClick={()=>{clearSession();router.push('/login')}} className="m-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"><LogOut size={18}/>Logout</button>
  </aside><main className="min-w-0 flex-1 p-5 md:p-8">{children}</main>
 </div>
}
