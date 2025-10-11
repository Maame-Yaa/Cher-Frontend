// src/pages/LeadsPage.tsx
import { useEffect, useState } from "react";
import { listLeads, createLead, deleteLead } from "../api/leads";
import type { Lead } from "../types";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busyId, setBusyId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    const rows = await listLeads(0, 20);
    setLeads(rows);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createLead({
        first_name,
        last_name,
        email,
        phone,
        status: "new",
        source: "website",
      });
      setFirst("");
      setLast("");
      setEmail("");
      setPhone("");
      await load();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeactivate(id: number) {
    setBusyId(id);
    try {
      await deleteLead(id);
      await load();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "24px auto" }}>
      <h2>Leads</h2>

      <form
        onSubmit={handleCreate}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 8,
          alignItems: "center",
        }}
      >
        <input
          placeholder="First"
          value={first_name}
          onChange={(e) => setFirst(e.target.value)}
          required
        />
        <input
          placeholder="Last"
          value={last_name}
          onChange={(e) => setLast(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add"}
        </button>
      </form>

      <table width="100%" style={{ marginTop: 16, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Email</th>
            <th align="left">Status</th>
            <th align="left">Activities</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id} style={{ borderTop: "1px solid #eee" }}>
              <td>
                {l.first_name} {l.last_name}
              </td>
              <td>{l.email}</td>
              <td>{l.status}</td>
              <td>{l.activity_count}</td>
              <td>
                <button
                  onClick={() => handleDeactivate(l.id)}
                  disabled={busyId === l.id}
                  title="Soft-delete (set is_active=false)"
                >
                  {busyId === l.id ? "Deactivating..." : "Deactivate"}
                </button>
              </td>
            </tr>
          ))}
          {!leads.length && (
            <tr>
              <td colSpan={5} style={{ padding: 12, color: "#666" }}>
                No leads yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
