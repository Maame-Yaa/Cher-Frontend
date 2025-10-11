import { api } from "./client";
import type { Lead } from "../types";

export async function listLeads(skip = 0, limit = 20): Promise<Lead[]> {
  const res = await api.get<Lead[]>("/leads", { params: { skip, limit } });
  return res.data;
}

type CreateLeadBody = {
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

export async function createLead(data: CreateLeadBody): Promise<Lead> {
  const res = await api.post<Lead>("/leads", data);
  return res.data;
}

export async function deleteLead(id: number): Promise<{ detail: string }> {
  const res = await api.delete<{ detail: string }>(`/leads/${id}`);
  return res.data;
}
