import React from "react";

function TaskFilters({ filter, setFilter }) {
  return (
    <div className="flex gap-2 justify-center">
      <input
        type="button"
        value=" ALL "
        onClick={() => setFilter("all")}
        className={
          filter === "all"
            ? "bg-blue-600 text-white px-4 py-2 rounded-lg"
            : "bg-gray-700 text-gray-300 px-4 py-2 rounded-lg"
        }
      />
      <input
        type="button"
        value=" COMPLETED "
        onClick={() => setFilter("completed")}
        className={
          filter === "completed"
            ? "bg-blue-600 text-white px-4 py-2 rounded-lg"
            : "bg-gray-700 text-gray-300 px-4 py-2 rounded-lg"
        }
      />
      <input
        type="button"
        value=" PENDING "
        onClick={() => setFilter("pending")}
        className={
          filter === "pending"
            ? "bg-blue-600 text-white px-4 py-2 rounded-lg"
            : "bg-gray-700 text-gray-300 px-4 py-2 rounded-lg"
        }
      />
    </div>
  );
}

export default TaskFilters;
