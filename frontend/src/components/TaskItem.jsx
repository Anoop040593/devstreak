import React from "react";

function TaskItem({
  task,
  editId,
  editValue,
  handleEditChange,
  toggleTask,
  editTaskFunc,
  cancelSave,
  deleteTask,
}) {
  return (
    <div>
      <li>
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.id === editId ? (
            <input type="text" value={editValue} onChange={handleEditChange} />
          ) : (
            task.text
          )}
        </span>
        <p>
          Created at:{" "}
          {task.createdAt
            ? new Date(task.createdAt).toLocaleDateString()
            : "Unknown"}
        </p>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <label htmlFor="completed"> Completed</label>
        <input
          type="button"
          onClick={() => editTaskFunc(task.id, task)}
          value={task.id === editId ? " SAVE " : " EDIT "}
          style={{ marginLeft: "5px" }}
          disabled={editValue.trim() === task.text.trim()}
        />
        {task.id === editId && (
          <input
            type="button"
            onClick={cancelSave}
            value="Cancel"
            style={{ marginLeft: "5px" }}
          />
        )}
        <input
          type="button"
          onClick={() => deleteTask(task.id)}
          value=" DELETE "
          style={{ marginLeft: "5px" }}
        />
      </li>
    </div>
  );
}

export default TaskItem;
