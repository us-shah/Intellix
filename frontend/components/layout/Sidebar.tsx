"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X, LayoutDashboard, Users, Building2, UserRound, Target, Briefcase,
  FolderKanban, CheckSquare, CalendarDays, FileText, Newspaper, Settings,
  Shield, GraduationCap, Bot, BrainCircuit, Building, WalletCards,
  Headphones, History, BellRing, ContactRound,
} from "lucide-react";

type MenuItem = {
  name: string;
  href: string;
  icon: any;
  permission?: string;
  ownerOnly?: boolean;
};

const menu: MenuItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Enterprise", href: "/dashboard/enterprise", icon: Building, permission: "users.manage" },
  { name: "AI Assistant", href: "/dashboard/ai", icon: Bot, permission: "ai.use" },
  { name: "Knowledge Base", href: "/dashboard/knowledge", icon: BrainCircuit, permission: "lms.manage" },
  { name: "Users", href: "/dashboard/users", icon: Users, permission: "users.view" },
  { name: "Roles & Access", href: "/dashboard/roles", icon: Shield, ownerOnly: true },
  { name: "Companies", href: "/dashboard/companies", icon: Building2, permission: "crm.view" },
  { name: "Customers", href: "/dashboard/customers", icon: UserRound, permission: "crm.view" },
  { name: "Contacts", href: "/dashboard/contacts", icon: ContactRound, permission: "crm.view" },
  { name: "Leads", href: "/dashboard/leads", icon: Target, permission: "crm.view" },
  { name: "Deals", href: "/dashboard/deals", icon: Briefcase, permission: "crm.view" },
  { name: "Projects", href: "/dashboard/project", icon: FolderKanban, permission: "projects.view" },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Meetings", href: "/dashboard/meetings", icon: CalendarDays },
  { name: "LMS", href: "/dashboard/lms", icon: GraduationCap, permission: "lms.manage" },
  { name: "HR", href: "/dashboard/hr/employees", icon: Users, permission: "hr.view" },
  { name: "Finance", href: "/dashboard/finance/invoices", icon: WalletCards, permission: "finance.view" },
  { name: "Support", href: "/dashboard/support/tickets", icon: Headphones, permission: "support.view" },
  { name: "Documents", href: "/dashboard/documents", icon: FileText, permission: "projects.view" },
  { name: "Activity Logs", href: "/dashboard/activity-log", icon: History, permission: "audit.view" },
  { name: "Notifications", href: "/dashboard/notification", icon: BellRing },
  { name: "Blogs", href: "/dashboard/blogs", icon: Newspaper, permission: "content.manage" },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, permission: "settings.manage" },
];

export default function Sidebar({ mobileOpen = false, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const currentRole = (sessionStorage.getItem("user_role") || localStorage.getItem("user_role") || "").toUpperCase();
    setRole(currentRole);
    try {
      const raw = sessionStorage.getItem("user_permissions");
      setPermissions(new Set(raw ? JSON.parse(raw) : []));
    } catch { setPermissions(new Set()); }
  }, []);

  const isOwner = role === "SUPER_ADMIN";
  const items = menu.filter((item) => {
    if (isOwner) return true;
    if (item.ownerOnly) return false;
    if (!item.permission) return true;
    return permissions.has(item.permission) || permissions.has("*");
  });

  return <>
    <div onClick={onClose} className={`fixed inset-0 z-40 bg-slate-950/50 lg:hidden ${mobileOpen ? "block" : "hidden"}`} />
    <aside className={`fixed inset-y-0 left-0 z-50 h-screen w-72 shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-950 text-white transition-transform lg:sticky lg:top-0 lg:z-20 lg:w-64 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-slate-800 p-5"><div><h1 className="text-2xl font-black">Intellix</h1><p className="mt-1 text-xs font-medium text-slate-400">{role ? role.replaceAll("_", " ") : "Secure"} Workspace</p></div><button className="rounded-lg p-2 text-slate-300 lg:hidden" onClick={onClose}><X size={20}/></button></div>
      <nav className="space-y-1 p-3">{items.map((item) => {
        const Icon = item.icon;
        const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
        return <Link onClick={onClose} key={item.name} href={item.href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30" : "text-slate-300 hover:bg-slate-900 hover:text-white"}`}><Icon size={18}/><span>{item.name}</span></Link>;
      })}</nav>
    </aside>
  </>;
}
