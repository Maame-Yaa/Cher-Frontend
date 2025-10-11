import { api } from "./client";

export type Lead = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  budget_min?: number | null;
  budget_max?: number | null;
  property_interest?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  activity_count: number;
};

export type LeadCreate = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status?: string;
  source?: string;
  budget_min?: number | null;
  budget_max?: number | null;
  property_interest?: string | null;
};

export async function listLeads(skip = 0, limit = 20): Promise<Lead[]> {
  const res = await api.get<Lead[]>("/leads", { params: { skip, limit } });
  return res.data;
}

export async function createLead(body: LeadCreate): Promise<Lead> {
  const res = await api.post<Lead>("/leads", body);
  return res.data;
}
