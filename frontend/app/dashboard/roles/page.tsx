"use client";

import { useEffect, useState } from "react";
import { KeyRound, LockKeyhole, Pencil, Plus, Save, Shield, Trash2, X } from "lucide-react";
import api from "@/lib/api";

type Role = { RoleID: number; RoleName: string; Description?: string | null };
type Permission = { PermissionID: number; Code: string; Name: string; Description?: string | null };

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPermissions, setSavingPermissions] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  async function load() {
    try {
      setLoading(true); setError("");
      const [r, p] = await Promise.all([api.get("/roles/"), api.get("/permissions/")]);
      setRoles(Array.isArray(r.data) ? r.data : []);
      setPermissions(Array.isArray(p.data) ? p.data : []);
    } catch (e: any) { setError(e?.response?.data?.detail || "Unable to load access control data."); }
    finally { setLoading(false); }
  }
  useEffect(()=>{ void load(); }, []);

  async function chooseRole(role: Role) {
    setSelectedRole(role); setNotice(""); setError("");
    if (role.RoleName === "SUPER_ADMIN") { setSelectedPermissionIds(permissions.map((p)=>p.PermissionID)); return; }
    try { const r = await api.get(`/permissions/roles/${role.RoleID}`); setSelectedPermissionIds(Array.isArray(r.data?.PermissionIDs) ? r.data.PermissionIDs : []); }
    catch (e: any) { setError(e?.response?.data?.detail || "Unable to load role permissions."); }
  }

  function start(role?: Role) { setEditing(role || null); setName(role?.RoleName || ""); setDesc(role?.Description || ""); setOpen(true); }
  async function saveRole() {
    if (!name.trim()) return setError("Role name is required.");
    try {
      const payload = { RoleName: name.trim(), Description: desc.trim() };
      editing ? await api.put(`/roles/${editing.RoleID}`, payload) : await api.post("/roles/", payload);
      setOpen(false); setNotice(editing ? "Role updated." : "Role created. Assign its permissions next."); await load();
    } catch (e: any) { setError(e?.response?.data?.detail || "Unable to save role."); }
  }
  async function remove(role: Role) {
    if (!confirm(`Delete role ${role.RoleName}?`)) return;
    try { await api.delete(`/roles/${role.RoleID}`); if (selectedRole?.RoleID === role.RoleID) setSelectedRole(null); await load(); }
    catch (e: any) { setError(e?.response?.data?.detail || "Unable to delete role."); }
  }
  function togglePermission(id: number) { setSelectedPermissionIds((current)=>current.includes(id) ? current.filter((x)=>x!==id) : [...current,id]); }
  async function savePermissions() {
    if (!selectedRole || selectedRole.RoleName === "SUPER_ADMIN") return;
    try { setSavingPermissions(true); setError(""); await api.put(`/permissions/roles/${selectedRole.RoleID}`, { PermissionIDs: selectedPermissionIds }); setNotice(`Permissions saved for ${selectedRole.RoleName.replaceAll("_"," ")}.`); }
    catch (e: any) { setError(e?.response?.data?.detail || "Unable to save permissions."); }
    finally { setSavingPermissions(false); }
  }

  return <div className="space-y-6 text-slate-900">
    <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-7 text-white shadow-xl">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><div className="flex items-center gap-2 text-cyan-300"><LockKeyhole size={18}/><span className="text-xs font-black uppercase tracking-[.18em]">Owner-only security</span></div><h1 className="mt-3 text-3xl font-black sm:text-4xl">Roles & Permissions</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">Only SUPER_ADMIN can create organizational roles or define what they can access. SUPER_ADMIN itself always bypasses permission checks.</p></div><button onClick={()=>start()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-black text-white shadow-lg shadow-blue-950 hover:bg-blue-500"><Plus size={18}/>Create Role</button></div>
    </div>
    {error && <div className="rounded-2xl border border-red-300 bg-red-50 p-4 font-semibold text-red-800">{error}</div>}
    {notice && <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 font-semibold text-emerald-800">{notice}</div>}

    <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5"><div className="flex items-center gap-2"><Shield className="text-blue-700"/><h2 className="text-xl font-black text-slate-950">Platform Roles</h2></div><p className="mt-1 text-sm text-slate-500">Select a role to configure its permissions.</p></div>
        {loading ? <div className="p-10 text-center text-slate-600">Loading...</div> : <div className="divide-y divide-slate-200">{roles.map((role)=><button key={role.RoleID} onClick={()=>void chooseRole(role)} className={`flex w-full items-center justify-between gap-4 p-5 text-left transition ${selectedRole?.RoleID===role.RoleID?"bg-blue-50":"hover:bg-slate-50"}`}><div><p className="font-black text-slate-950">{role.RoleName.replaceAll("_"," ")}</p><p className="mt-1 text-sm text-slate-500">{role.Description || "No description"}</p></div><div className="flex shrink-0 gap-2">{role.RoleName!=="SUPER_ADMIN"&&<><span onClick={(e)=>{e.stopPropagation();start(role)}} className="rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"><Pencil size={15}/></span><span onClick={(e)=>{e.stopPropagation();void remove(role)}} className="rounded-lg bg-red-50 p-2 text-red-700 hover:bg-red-100"><Trash2 size={15}/></span></>}</div></button>)}</div>}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5"><div className="flex items-center gap-2"><KeyRound className="text-cyan-700"/><h2 className="text-xl font-black text-slate-950">Permission Matrix</h2></div><p className="mt-1 text-sm text-slate-500">{selectedRole ? `Configuring ${selectedRole.RoleName.replaceAll("_"," ")}` : "Select a role on the left."}</p></div>
        {!selectedRole ? <div className="p-12 text-center text-slate-500">Choose a role to view its permissions.</div> : <div className="p-5">
          {selectedRole.RoleName === "SUPER_ADMIN" && <div className="mb-5 rounded-xl border border-blue-300 bg-blue-50 p-4 font-semibold text-blue-900">SUPER_ADMIN always has full platform access and cannot be restricted.</div>}
          <div className="grid gap-3 sm:grid-cols-2">{permissions.map((permission)=>{const checked=selectedRole.RoleName==="SUPER_ADMIN"||selectedPermissionIds.includes(permission.PermissionID);return <label key={permission.PermissionID} className={`flex gap-3 rounded-xl border p-4 ${checked?"border-blue-300 bg-blue-50":"border-slate-200 bg-white"}`}><input type="checkbox" checked={checked} disabled={selectedRole.RoleName==="SUPER_ADMIN"} onChange={()=>togglePermission(permission.PermissionID)} className="mt-1 h-4 w-4 accent-blue-700"/><span><span className="block font-black text-slate-900">{permission.Name}</span><span className="mt-1 block font-mono text-xs text-slate-500">{permission.Code}</span></span></label>})}</div>
          {selectedRole.RoleName!=="SUPER_ADMIN"&&<button onClick={()=>void savePermissions()} disabled={savingPermissions} className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 font-black text-white hover:bg-slate-800 disabled:opacity-60"><Save size={17}/>{savingPermissions?"Saving...":"Save Permissions"}</button>}
        </div>}
      </section>
    </div>

    {open&&<div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4"><div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-black text-slate-950">{editing?"Edit Role":"Create Role"}</h2><button onClick={()=>setOpen(false)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><X size={20}/></button></div><div className="space-y-4"><div><label className="mb-2 block text-sm font-bold text-slate-800">Role name</label><input value={name} onChange={(e)=>setName(e.target.value)} placeholder="e.g. OPERATIONS_MANAGER" className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 font-bold text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"/></div><div><label className="mb-2 block text-sm font-bold text-slate-800">Description</label><textarea value={desc} onChange={(e)=>setDesc(e.target.value)} className="min-h-28 w-full rounded-xl border border-slate-300 bg-white p-4 text-slate-950 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"/></div><button onClick={()=>void saveRole()} className="h-12 w-full rounded-xl bg-blue-700 font-black text-white hover:bg-blue-800">{editing?"Update Role":"Create Role"}</button></div></div></div>}
  </div>;
}
