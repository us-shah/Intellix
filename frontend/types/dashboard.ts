export interface DashboardStats {
  customers: number;
  leads: number;
  deals: number;
  revenue: number;
  pipeline_value: number;
  projects: number;
  companies: number;
  users: number;
  students: number;
  courses: number;
  clients: number;
  tasks_due_today: number;
  meetings_today: number;
}

export interface DashboardResponse {
  generated_at: string;
  stats: DashboardStats;
  monthly_revenue: Array<{ month: string; revenue: number }>;
  deal_stages: Array<{ stage: string; total: number }>;
  recent_activities: Array<{
    id: number;
    action: string;
    table: string;
    record_id: number;
    user_id?: number;
    time?: string;
  }>;
  upcoming_tasks: Array<{
    id: number;
    title: string;
    priority?: string;
    status?: string;
    due_date?: string;
  }>;
  upcoming_meetings: Array<{
    id: number;
    title: string;
    location?: string;
    meeting_date?: string;
  }>;
  recent_deals: Array<{
    id: number;
    title: string;
    amount: number;
    stage?: string;
    created_at?: string;
  }>;
}
