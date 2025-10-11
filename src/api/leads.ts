import { api } from "./client";
import type { Lead, LeadCreate, LeadUpdate } from "../types";

export async function listLeads(skip = 0, limit = 20): Promise<Lead[]> {
  const res = await api.get<Lead[]>(`/leads`, { params: { skip, limit } });
  return res.data;
}

export async function createLead(data: LeadCreate): Promise<Lead> {
  const res = await api.post<Lead>("/leads", data);
  return res.data;
}

export async function getLead(id: number): Promise<Lead> {
  const res = await api.get<Lead>(`/leads/${id}`);
  return res.data;
}

export async function updateLead(id: number, data: LeadUpdate): Promise<Lead> {
  const res = await api.patch<Lead>(`/leads/${id}`, data);
  return res.data;
}

export async function deleteLead(id: number): Promise<{ detail: string }> {
  const res = await api.delete<{ detail: string }>(`/leads/${id}`);
  return res.data;
}
