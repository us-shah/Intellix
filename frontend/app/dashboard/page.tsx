"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CircleDollarSign,
  FolderKanban,
  GraduationCap,
  Handshake,
  ListTodo,
  RefreshCw,
  Target,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import StatCard from "@/components/dashboard/StatCard";
import { getDashboardStats } from "@/services/dashboard.service";
import type { DashboardResponse } from "@/types/dashboard";

const money = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

function formatDate(value?: string) {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setData(await getDashboardStats());
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard data. Confirm the backend is running and you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const cards = useMemo(() => {
    if (!data) return [];
    const s = data.stats;
    return [
      { label: "Revenue Won", value: money.format(s.revenue), icon: CircleDollarSign, description: `Pipeline ${money.format(s.pipeline_value)}` },
      { label: "Customers", value: s.customers, icon: Users },
      { label: "Leads", value: s.leads, icon: Target },
      { label: "Deals", value: s.deals, icon: Handshake },
      { label: "Projects", value: s.projects, icon: FolderKanban },
      { label: "Students", value: s.students, icon: GraduationCap },
      { label: "Courses", value: s.courses, icon: BookOpen },
      { label: "Clients", value: s.clients, icon: BriefcaseBusiness },
      { label: "Companies", value: s.companies, icon: Building2 },
      { label: "Tasks Due Today", value: s.tasks_due_today, icon: ListTodo },
      { label: "Meetings Today", value: s.meetings_today, icon: CalendarDays },
    ];
  }, [data]);

  if (loading) {
    return <main className="p-8 text-slate-300">Loading dashboard…</main>;
  }

  if (error || !data) {
    return (
      <main className="p-8 text-white">
        <div className="rounded-2xl border border-red-900/50 bg-red-950/30 p-6">
          <p>{error || "Dashboard data is unavailable."}</p>
          <button onClick={() => void load()} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2">
            <RefreshCw size={16} /> Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-8 p-6 text-white md:p-8">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">Intellix Command Center</h1>
          <p className="mt-2 text-slate-400">Live CRM, academy, client and operational overview.</p>
        </div>
        <button onClick={() => void load()} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:bg-slate-800">
          <RefreshCw size={16} /> Refresh
        </button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => <StatCard key={card.label} {...card} />)}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-5 text-lg font-semibold">Monthly won revenue</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthly_revenue}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => money.format(Number(value))} />
                <Line type="monotone" dataKey="revenue" stroke="currentColor" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-5 text-lg font-semibold">Deal pipeline by stage</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.deal_stages}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="stage" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="currentColor" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Panel title="Upcoming tasks">
          {data.upcoming_tasks.length === 0 ? <Empty /> : data.upcoming_tasks.map((item) => (
            <Row key={item.id} title={item.title} meta={`${item.priority || "Normal"} · ${formatDate(item.due_date)}`} />
          ))}
        </Panel>
        <Panel title="Upcoming meetings">
          {data.upcoming_meetings.length === 0 ? <Empty /> : data.upcoming_meetings.map((item) => (
            <Row key={item.id} title={item.title} meta={`${item.location || "Online"} · ${formatDate(item.meeting_date)}`} />
          ))}
        </Panel>
        <Panel title="Recent deals">
          {data.recent_deals.length === 0 ? <Empty /> : data.recent_deals.map((item) => (
            <Row key={item.id} title={item.title} meta={`${item.stage || "New"} · ${money.format(item.amount)}`} />
          ))}
        </Panel>
      </section>

      <Panel title="Recent activity">
        {data.recent_activities.length === 0 ? <Empty /> : data.recent_activities.map((item) => (
          <Row key={item.id} title={`${item.action} on ${item.table}`} meta={`Record #${item.record_id} · ${formatDate(item.time)}`} />
        ))}
      </Panel>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="divide-y divide-slate-800">{children}</div>
    </section>
  );
}

function Row({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <p className="font-medium text-slate-100">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{meta}</p>
    </div>
  );
}

function Empty() {
  return <p className="py-4 text-sm text-slate-500">No records available.</p>;
}
