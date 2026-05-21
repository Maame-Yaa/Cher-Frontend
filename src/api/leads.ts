import { api } from "./client";
import type { Lead, LeadCreate } from "../types";

export type { Lead, LeadCreate };

export async function listLeads(skip = 0, limit = 20): Promise<Lead[]> {
  const res = await api.get<Lead[]>("/leads", { params: { skip, limit } });
  return res.data;
}

export async function createLead(data: LeadCreate): Promise<Lead> {
  const res = await api.post<Lead>("/leads", data);
  return res.data;
}

export async function deleteLead(id: number): Promise<{ detail: string }> {
  const res = await api.delete<{ detail: string }>(`/leads/${id}`);
  return res.data;
}