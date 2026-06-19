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
      <li className="border rounded-lg p-4 my-2">
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.id === editId ? (
            <input type="text" value={editValue} onChange={handleEditChange} />
          ) : (
            task.text
          )}
        </span>
        <p className="py-1">
          Created at:{" "}
          {task.createdAt
            ? new Date(task.createdAt).toLocaleString("en-GB", {
                hour12: false,
              })
            : "Unknown"}
        </p>
        {task.updatedAt && (
          <p className="py-1">
            Updated At:{" "}
            {new Date(task.updatedAt).toLocaleString("en-GB", {
              hour12: false,
            })}
          </p>
        )}
        {task.completedAt && task.completed && (
          <p className="py-1">
            Completed At:{" "}
            {new Date(task.completedAt).toLocaleString("en-GB", {
              hour12: false,
            })}
          </p>
        )}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <label htmlFor="completed"> Completed</label>
        {!task.completed && (
          <input
            type="button"
            onClick={() => editTaskFunc(task.id, task)}
            value={task.id === editId ? " SAVE " : " EDIT "}
            className={
              task.id === editId
                ? "bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 cursor-pointer hover:bg-blue-700"
                : "bg-gray-600 text-white px-4 py-2 rounded-lg ml-2 cursor-pointer hover:bg-gray-700"
            }
            style={{ marginLeft: "5px" }}
            disabled={editValue.trim() === task.text.trim()}
          />
        )}
        {task.id === editId && (
          <input
            type="button"
            onClick={cancelSave}
            value="Cancel"
            style={{ marginLeft: "5px" }}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2 cursor-pointer hover:bg-gray-700"
          />
        )}
        <input
          type="button"
          onClick={() => deleteTask(task.id)}
          value=" DELETE "
          style={{ marginLeft: "5px" }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 cursor-pointer hover:bg-red-700"
        />
      </li>
    </div>
  );
}

export default TaskItem;
