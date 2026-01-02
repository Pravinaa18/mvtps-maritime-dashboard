// src/pages/Dashboard.js
import React from "react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2>Maritime Live Tracking</h2>
      <p>{user?.name} ({user?.role})</p>
    </div>
  );
}

export default Dashboard;   // ✅
