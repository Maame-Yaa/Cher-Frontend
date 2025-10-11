import { useState } from "react";
import type { AxiosError } from "axios";
import { login, me, logout, register } from "./api/auth";
import { listLeads, createLead, type LeadCreate, type Lead } from "./api/leads";
import { getDashboard, type DashboardStats } from "./api/dashboard";

export default function App() {
  // auth
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [whoami, setWhoami] = useState<string>("(not loaded)");

  // leads
  const [leads, setLeads] = useState<Lead[]>([]);
  const [newLead, setNewLead] = useState<LeadCreate>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    status: "new",
    source: "website",
  });

  // dashboard
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // helpers
  function showAxiosError(err: unknown, fallback: string) {
    const e = err as AxiosError<{ detail?: string }>;
    alert(e?.response?.data?.detail ?? fallback);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    try {
      await register({
        username,
        password,
        email: `${username}@example.com`,
        first_name: "Test",
        last_name: "User",
      });
      alert("Registered. Now login.");
    } catch (err) {
      showAxiosError(err, "Register failed");
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login({ username, password });
      alert("Logged in!");
    } catch (err) {
      showAxiosError(err, "Login failed");
    }
  }

  async function handleMe() {
    try {
      const user = await me();
      setWhoami(`${user.first_name} ${user.last_name} (@${user.username})`);
    } catch (err) {
      const e = err as AxiosError<{ detail?: string }>;
      setWhoami(e?.response?.data?.detail ?? "Failed");
    }
  }

  function handleLogout() {
    logout();
    alert("Logged out");
  }

  async function loadLeads() {
    try {
      const data = await listLeads(0, 20);
      setLeads(data);
    } catch (err) {
      showAxiosError(err, "Failed to load leads");
    }
  }

  async function addLead(e: React.FormEvent) {
    e.preventDefault();
    try {
      const created = await createLead(newLead);
      setLeads((prev) => [created, ...prev]);
      setNewLead({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        status: "new",
        source: "website",
      });
      alert("Lead created!");
    } catch (err) {
      showAxiosError(err, "Failed to create lead");
    }
  }

  async function loadDashboard() {
    try {
      const d = await getDashboard();
      setStats(d);
    } catch (err) {
      showAxiosError(err, "Failed to load dashboard");
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "32px auto", fontFamily: "Inter, system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 8 }}>Cher CRM </h1>
      <small>Backend: <code>{import.meta.env.VITE_API_URL}</code></small>

      {/* Auth */}
      <section style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, marginTop: 16 }}>
        <h2>Auth</h2>
        <form onSubmit={handleLogin} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
          <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">Login</button>
            <button onClick={handleRegister}>Register</button>
            <button type="button" onClick={handleMe}>Who am I?</button>
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        </form>
        <p>Me: {whoami}</p>
      </section>

      {/* Leads */}
      <section style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, marginTop: 16 }}>
        <h2>Leads</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={loadLeads}>Load Leads</button>
        </div>

        <form onSubmit={addLead} style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(3, 1fr)" }}>
          <input placeholder="First name" value={newLead.first_name}
                 onChange={(e) => setNewLead({ ...newLead, first_name: e.target.value })} />
          <input placeholder="Last name" value={newLead.last_name}
                 onChange={(e) => setNewLead({ ...newLead, last_name: e.target.value })} />
          <input placeholder="Email" value={newLead.email}
                 onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} />
          <input placeholder="Phone" value={newLead.phone}
                 onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })} />
          <input placeholder="Status (new/contacted/...)" value={newLead.status ?? ""}
                 onChange={(e) => setNewLead({ ...newLead, status: e.target.value })} />
          <input placeholder="Source (website/referral/...)" value={newLead.source ?? ""}
                 onChange={(e) => setNewLead({ ...newLead, source: e.target.value })} />
          <button style={{ gridColumn: "1 / -1" }} type="submit">Create Lead</button>
        </form>

        <ul style={{ marginTop: 12 }}>
          {leads.map((l) => (
            <li key={l.id}>
              <strong>{l.first_name} {l.last_name}</strong> — {l.email} — <em>{l.status}</em>
            </li>
          ))}
        </ul>
      </section>

      {/* Dashboard */}
      <section style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, marginTop: 16 }}>
        <h2>Dashboard</h2>
        <button onClick={loadDashboard}>Load Dashboard</button>
        {stats && (
          <div style={{ marginTop: 12 }}>
            <p>Total leads: {stats.total_leads}</p>
            <p>New leads this week: {stats.new_leads_this_week}</p>
            <p>Closed leads this month: {stats.closed_leads_this_month}</p>
            <p>Total activities: {stats.total_activities}</p>
            <div>
              <strong>Leads by status:</strong>
              <ul>
                {stats.leads_by_status.map((s) => (
                  <li key={s.status}>{s.status}: {s.count}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
