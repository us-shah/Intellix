"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ShieldCheck, UserCog, UserRoundCheck, UserRoundX } from "lucide-react";
import api from "@/lib/api";

type Role = { RoleID: number; RoleName: string; Description?: string | null };
type User = {
  UserID: number;
  FullName: string;
  Email: string;
  Phone?: string | null;
  RoleID: number;
  RoleName?: string | null;
  IsActive: boolean;
  CreatedAt?: string;
};

export default function UsersAccessPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [currentRole, setCurrentRole] = useState("");

  const isSuperAdmin = currentRole === "SUPER_ADMIN";

  async function load() {
    try {
      setLoading(true);
      setError("");
      const [userRes, roleRes] = await Promise.all([api.get("/users/"), api.get("/roles/")]);
      setUsers(Array.isArray(userRes.data) ? userRes.data : []);
      setRoles(Array.isArray(roleRes.data) ? roleRes.data : []);
    } catch (e: any) {
      setError(e?.response?.data?.detail || "Unable to load users and roles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setCurrentRole((sessionStorage.getItem("user_role") || localStorage.getItem("user_role") || "").toUpperCase());
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => `${u.FullName} ${u.Email} ${u.Phone || ""} ${u.RoleName || ""}`.toLowerCase().includes(q));
  }, [users, query]);

  async function assignRole(user: User, roleId: number) {
    if (!isSuperAdmin || roleId === user.RoleID) return;
    const role = roles.find((r) => r.RoleID === roleId);
    if (!role) return;
    if (!confirm(`Assign ${role.RoleName.replaceAll("_", " ")} to ${user.FullName}?\n\nThe user's existing login sessions will be revoked and they must sign in again.`)) return;
    try {
      setSaving(user.UserID);
      setError("");
      setNotice("");
      await api.patch(`/users/${user.UserID}/role`, { RoleID: roleId });
      setNotice(`${user.FullName} is now ${role.RoleName.replaceAll("_", " ")}. Existing sessions were signed out.`);
      await load();
    } catch (e: any) {
      setError(e?.response?.data?.detail || "Unable to assign role.");
    } finally {
      setSaving(null);
    }
  }

  async function toggleActive(user: User) {
    if (!isSuperAdmin) return;
    const next = !user.IsActive;
    if (!confirm(`${next ? "Activate" : "Deactivate"} ${user.FullName}?${next ? "" : " Their active sessions will be revoked."}`)) return;
    try {
      setSaving(user.UserID);
      await api.patch(`/users/${user.UserID}/active`, { IsActive: next });
      await load();
    } catch (e: any) {
      setError(e?.response?.data?.detail || "Unable to update user status.");
    } finally {
      setSaving(null);
    }
  }

  return <div className="space-y-6 text-slate-900">
    <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-7 text-white shadow-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-300"><UserCog size={18}/><span className="text-xs font-black uppercase tracking-[.18em]">Identity & Access</span></div>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">Users & Role Assignment</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Super Admin controls organizational roles. Changing a role immediately revokes the user's current sessions so old permissions cannot remain active.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Signed-in authority</p><p className="mt-1 font-black text-cyan-300">{currentRole.replaceAll("_", " ") || "Loading..."}</p></div>
      </div>
    </div>

    {!isSuperAdmin && <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 font-semibold text-amber-900"><ShieldCheck className="mr-2 inline" size={18}/>You can view users, but only SUPER_ADMIN can assign roles, activate, or deactivate accounts.</div>}
    {error && <div className="rounded-2xl border border-red-300 bg-red-50 p-4 font-semibold text-red-800">{error}</div>}
    {notice && <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 font-semibold text-emerald-800">{notice}</div>}

    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search name, email, phone or role" className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 font-medium text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"/></div>
      <div className="text-sm font-bold text-slate-600">{filtered.length} user{filtered.length === 1 ? "" : "s"}</div>
    </div>

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {loading ? <div className="p-12 text-center font-semibold text-slate-600">Loading users...</div> : <div className="overflow-x-auto"><table className="w-full min-w-[900px]">
        <thead className="bg-slate-950 text-left text-xs font-black uppercase tracking-wider text-slate-300"><tr><th className="px-5 py-4">User</th><th className="px-5 py-4">Contact</th><th className="px-5 py-4">Current Role</th><th className="px-5 py-4">Assign Role</th><th className="px-5 py-4">Status</th></tr></thead>
        <tbody>{filtered.map((user) => <tr key={user.UserID} className="border-t border-slate-200 align-middle hover:bg-slate-50">
          <td className="px-5 py-4"><p className="font-black text-slate-950">{user.FullName}</p><p className="mt-1 text-xs text-slate-500">User #{user.UserID}</p></td>
          <td className="px-5 py-4"><p className="font-semibold text-slate-800">{user.Email}</p><p className="mt-1 text-sm text-slate-500">{user.Phone || "No phone"}</p></td>
          <td className="px-5 py-4"><span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-black text-blue-800">{(user.RoleName || "UNASSIGNED").replaceAll("_", " ")}</span></td>
          <td className="px-5 py-4"><select disabled={!isSuperAdmin || saving === user.UserID} value={user.RoleID || ""} onChange={(e)=>void assignRole(user, Number(e.target.value))} className="h-10 min-w-48 rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500">{roles.map((role)=><option key={role.RoleID} value={role.RoleID}>{role.RoleName.replaceAll("_", " ")}</option>)}</select></td>
          <td className="px-5 py-4"><button disabled={!isSuperAdmin || saving === user.UserID} onClick={()=>void toggleActive(user)} className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-black disabled:cursor-not-allowed disabled:opacity-60 ${user.IsActive ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>{user.IsActive ? <UserRoundCheck size={16}/> : <UserRoundX size={16}/>} {user.IsActive ? "Active" : "Inactive"}</button></td>
        </tr>)}</tbody>
      </table></div>}
    </div>
  </div>;
}
