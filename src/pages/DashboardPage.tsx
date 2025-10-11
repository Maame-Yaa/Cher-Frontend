import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";
import type { DashboardStats } from "../types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardStats | null>(null);

  useEffect(() => {
    getDashboard().then(setData).catch(() => setData(null));
  }, []);

  if (!data) return <div style={{ margin: 24 }}>Loading…</div>;

  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <h2>Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        <Stat label="Total Leads" value={data.total_leads} />
        <Stat label="New This Week" value={data.new_leads_this_week} />
        <Stat label="Closed This Month" value={data.closed_leads_this_month} />
        <Stat label="Total Activities" value={data.total_activities} />
      </div>

      <h3 style={{ marginTop: 24 }}>Leads by Status</h3>
      <ul>
        {data.leads_by_status.map(s => (
          <li key={s.status}>{s.status}: {s.count}</li>
        ))}
      </ul>

      <h3>Recent Activities</h3>
      <ul>
        {data.recent_activities.map(a => (
          <li key={a.id}>
            Lead {a.lead_id} – {a.activity_type} – {a.title} – {a.activity_date.slice(0,10)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
