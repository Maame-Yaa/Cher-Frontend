import { api } from "./client";
// import type { Lead } from "./leads";

export type Activity = {
  id: number;
  lead_id: number;
  user_id: number;
  activity_type: string;
  title: string;
  notes?: string | null;
  duration?: number | null;
  activity_date: string; // date
  created_at: string;
};

export type DashboardStats = {
  total_leads: number;
  new_leads_this_week: number;
  closed_leads_this_month: number;
  total_activities: number;
  leads_by_status: { status: string; count: number }[];
  recent_activities: Activity[];
};

export async function getDashboard(): Promise<DashboardStats> {
  const res = await api.get<DashboardStats>("/dashboard");
  return res.data;
}
