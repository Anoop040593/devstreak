import React from "react";

export default function TaskInput({ addTask, handleTaskChange, inputValue }) {
  return (
    <>
      <input
        type="text"
        id="task"
        value={inputValue}
        onChange={handleTaskChange}
        className="border rounded-lg px-3 py-2 w-80"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />
      <button
        onClick={addTask}
        disabled={!inputValue}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2"
      >
        Add Task
      </button>
    </>
  );
}
