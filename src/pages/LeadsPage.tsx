import { useEffect, useState } from "react";
import { listLeads, createLead, deleteLead } from "../api/leads";
import type { Lead } from "../types";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function load() {
    setLeads(await listLeads(0, 20));
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ maxWidth: 800, margin: "24px auto" }}>
      <h2>Leads</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createLead({ first_name, last_name, email, phone, status: "new", source: "website" });
          setFirst(""); setLast(""); setEmail(""); setPhone("");
          await load();
        }}
        style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, alignItems: "center" }}
      >
        <input placeholder="First" value={first_name} onChange={(e) => setFirst(e.target.value)} />
        <input placeholder="Last" value={last_name} onChange={(e) => setLast(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <button type="submit">Add</button>
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
              <td>{l.first_name} {l.last_name}</td>
              <td>{l.email}</td>
              <td>{l.status}</td>
              <td>{l.activity_count}</td>
              <td>
                <button onClick={async () => { await deleteLead(l.id); await load(); }}>
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
          {!leads.length && (
            <tr><td colSpan={5} style={{ padding: 12, color: "#666" }}>No leads yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
