import { useState } from "react";
import { login, register, me, logout } from "../api/auth";
import type { AxiosError } from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [whoami, setWhoami] = useState<string>("(not loaded)");

  const showErr = (err: unknown, fallback: string) => {
    const e = err as AxiosError<{ detail?: string }>;
    alert(e?.response?.data?.detail ?? fallback);
  };

  return (
    <div style={{ maxWidth: 420, margin: "24px auto" }}>
      <h2>Auth</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await login({ username, password });
            alert("Logged in");
          } catch (err) {
            showErr(err, "Login failed");
          }
        }}
        style={{ display: "grid", gap: 8 }}
      >
        <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Login</button>
          <button
            type="button"
            onClick={async () => {
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
                showErr(err, "Register failed");
              }
            }}
          >
            Register
          </button>
        </div>
      </form>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          onClick={async () => {
            try {
              const u = await me();
              setWhoami(`${u.first_name} ${u.last_name} (@${u.username})`);
            } catch {
              setWhoami("Failed");
            }
          }}
        >
          Who am I?
        </button>
        <button onClick={() => { logout(); alert("Logged out"); }}>Logout</button>
      </div>

      <p>Me: {whoami}</p>
    </div>
  );
}
