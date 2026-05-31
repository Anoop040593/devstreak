import React from "react";

function TaskFilters({ setFilter }) {
  return (
    <div>
      <input type="button" value=" ALL " onClick={() => setFilter("all")} />
      <input
        type="button"
        value=" COMPLETED "
        onClick={() => setFilter("completed")}
      />
      <input
        type="button"
        value=" PENDING "
        onClick={() => setFilter("pending")}
      />
    </div>
  );
}

export default TaskFilters;
