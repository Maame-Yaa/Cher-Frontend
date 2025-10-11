import { Link, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LeadsPage from "./pages/LeadsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #eee" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/leads">Leads</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/auth">Auth</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/auth" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
