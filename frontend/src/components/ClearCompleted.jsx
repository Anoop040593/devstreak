import React from "react";

function ClearCompleted({ clearCompleted }) {
  return (
    <div>
      <input
        type="button"
        onClick={clearCompleted}
        value="❌ Clear Completed Tasks"
        style={{ marginLeft: "5px" }}
      />
    </div>
  );
}

export default ClearCompleted;
