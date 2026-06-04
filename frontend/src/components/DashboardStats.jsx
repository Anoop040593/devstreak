import React from "react";

function DashboardStats({
  totalTasksCount,
  completedTasksCount,
  pendingTasksCount,
  streakStatus,
}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="border rounded-lg p-4">
        Total Tasks: {totalTasksCount}
      </div>
      <div className="border rounded-lg p-4">
        Completed Tasks: {completedTasksCount}
      </div>
      <div className="border rounded-lg p-4">
        Pending Tasks: {pendingTasksCount}
      </div>
      <div className="border rounded-lg p-4">
        {streakStatus ? "🔥 Streak Active" : "No Active Streak"}
      </div>
    </div>
  );
}

export default DashboardStats;
