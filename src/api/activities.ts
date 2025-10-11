import { api } from "./client";
import type { Activity, ActivityCreate } from "../types";

export async function listActivities(lead_id?: number): Promise<Activity[]> {
  const res = await api.get<Activity[]>("/activities", {
    params: lead_id ? { lead_id } : undefined,
  });
  return res.data;
}

export async function createActivity(data: ActivityCreate): Promise<Activity> {
  const res = await api.post<Activity>("/activities", data);
  return res.data;
}

export async function deleteActivity(id: number): Promise<{ detail: string }> {
  const res = await api.delete<{ detail: string }>(`/activities/${id}`);
  return res.data;
}
