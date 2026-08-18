"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Building2, UserRound, Target, Briefcase, FolderKanban,
  CheckSquare, CalendarDays, FileText, Newspaper, Settings, Shield, GraduationCap,
  Bot, BrainCircuit, Building, WalletCards, Headphones, History, BellRing, ContactRound
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Enterprise", href: "/dashboard/enterprise", icon: Building },
  { name: "AI Assistant", href: "/dashboard/ai", icon: Bot },
  { name: "Knowledge Base", href: "/dashboard/knowledge", icon: BrainCircuit },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Roles", href: "/dashboard/roles", icon: Shield },
  { name: "Companies", href: "/dashboard/companies", icon: Building2 },
  { name: "Customers", href: "/dashboard/customers", icon: UserRound },
  { name: "Contacts", href: "/dashboard/contacts", icon: ContactRound },
  { name: "Leads", href: "/dashboard/leads", icon: Target },
  { name: "Deals", href: "/dashboard/deals", icon: Briefcase },
  { name: "Projects", href: "/dashboard/project", icon: FolderKanban },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Meetings", href: "/dashboard/meetings", icon: CalendarDays },
  { name: "LMS", href: "/dashboard/lms", icon: GraduationCap },
  { name: "HR", href: "/dashboard/hr/employees", icon: Users },
  { name: "Finance", href: "/dashboard/finance/invoices", icon: WalletCards },
  { name: "Support", href: "/dashboard/support/tickets", icon: Headphones },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
  { name: "Activity Logs", href: "/dashboard/activity-log", icon: History },
  { name: "Notifications", href: "/dashboard/notification", icon: BellRing },
  { name: "Blogs", href: "/dashboard/blogs", icon: Newspaper },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-950 text-white lg:block">
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-black tracking-tight">Intellix</h1>
        <p className="mt-1 text-xs font-medium text-slate-400">Enterprise Platform</p>
      </div>
      <nav className="space-y-1 p-3">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30" : "text-slate-300 hover:bg-slate-900 hover:text-white"}`}>
              <Icon size={18}/><span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
