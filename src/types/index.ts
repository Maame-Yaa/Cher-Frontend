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

export type LeadUpdate = Partial<LeadCreate> & { status?: string };

export type Activity = {
  id: number;
  lead_id: number;
  user_id: number;
  activity_type: string;
  title: string;
  notes?: string | null;
  duration?: number | null;
  activity_date: string;    
  created_at: string;
};

export type ActivityCreate = {
  lead_id: number;
  activity_type: string;
  title: string;
  notes?: string;
  duration?: number;
  activity_date: string;    
};

export type DashboardStats = {
  total_leads: number;
  new_leads_this_week: number;
  closed_leads_this_month: number;
  total_activities: number;
  leads_by_status: { status: string; count: number }[];
  recent_activities: Activity[];
};
