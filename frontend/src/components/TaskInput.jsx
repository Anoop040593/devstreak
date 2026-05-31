import React from "react";

export default function TaskInput({ addTask, handleTaskChange, inputValue }) {
  return (
    <>
      <input
        type="text"
        id="task"
        value={inputValue}
        onChange={handleTaskChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />
      <button onClick={addTask} disabled={!inputValue}>
        Add Task
      </button>
    </>
  );
}
