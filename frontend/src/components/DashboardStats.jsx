import React from "react";

function DashboardStats({
  totalTasksCount,
  completedTasksCount,
  pendingTasksCount,
  streakStatus,
}) {
  return (
    <div>
      <h4>Total Tasks: {totalTasksCount}</h4>
      <h4>Completed Tasks: {completedTasksCount}</h4>
      <h4>Pending Tasks: {pendingTasksCount}</h4>
      <h4>{streakStatus ? "🔥 Streak Active" : "No Active Streak"}</h4>
    </div>
  );
}

export default DashboardStats;
