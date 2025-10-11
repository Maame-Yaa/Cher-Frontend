import { useEffect, useState } from "react";
import { listActivities, createActivity, deleteActivity } from "../api/activities";
import type { Activity } from "../types";

export default function ActivitiesPage() {
  const [leadId, setLeadId] = useState<number | "">("");
  const [items, setItems] = useState<Activity[]>([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("call");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));

  async function load() {
    const lid = typeof leadId === "number" ? leadId : undefined;
    setItems(await listActivities(lid));
  }

  useEffect(() => { load(); }, [leadId]);

  return (
    <div style={{ maxWidth: 800, margin: "24px auto" }}>
      <h2>Activities</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          placeholder="Filter by lead_id"
          value={leadId}
          onChange={(e) => setLeadId(e.target.value ? Number(e.target.value) : "")}
        />
        <button onClick={load}>Refresh</button>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (typeof leadId !== "number") return alert("Enter lead_id to create");
          await createActivity({ lead_id: leadId, activity_type: type, title, activity_date: date });
          setTitle("");
          await load();
        }}
        style={{ display: "flex", gap: 8, marginTop: 12 }}
      >
        <input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="call">call</option>
          <option value="email">email</option>
          <option value="meeting">meeting</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <ul style={{ marginTop: 16 }}>
        {items.map(a => (
          <li key={a.id} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            <strong>Lead {a.lead_id}</strong> – {a.activity_type} – {a.title} – {a.activity_date.slice(0,10)}
            <button style={{ marginLeft: 8 }} onClick={async () => { await deleteActivity(a.id); await load(); }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
