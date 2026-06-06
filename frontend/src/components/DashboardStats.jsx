import React from "react";

function DashboardStats({
  totalTasksCount,
  completedTasksCount,
  pendingTasksCount,
  streakStatus,
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div className="border rounded-xl p-4 shadow-md">
        Total Tasks: {totalTasksCount}
      </div>
      <div className="border rounded-xl p-4 shadow-md">
        Completed Tasks: {completedTasksCount}
      </div>
      <div className="border rounded-xl p-4 shadow-md">
        Pending Tasks: {pendingTasksCount}
      </div>
      <div
        className={
          streakStatus
            ? "border rounded-xl p-4 shadow-md bg-green-700"
            : "border rounded-xl p-4 shadow-md"
        }
      >
        {streakStatus ? "🔥 Streak Active" : "No Active Streak"}
      </div>
    </div>
  );
}

export default DashboardStats;
