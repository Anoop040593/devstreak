import React from "react";

function TaskList({
  filteredTasks,
  toggleTask,
  editValue,
  handleEditChange,
  editTaskFunc,
  cancelSave,
  deleteTask,
  editId,
}) {
  return (
    <div>
      <ul>
        {filteredTasks?.map((t) => (
          <li key={t.id}>
            <span
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            >
              {t.id === editId ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditChange}
                />
              ) : (
                t.text
              )}
            </span>
            <p>
              Created at:{" "}
              {t.createdAt
                ? new Date(t.createdAt).toLocaleDateString()
                : "Unknown"}
            </p>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />
            <label htmlFor="completed"> Completed</label>
            <input
              type="button"
              onClick={() => editTaskFunc(t.id, t)}
              value={t.id === editId ? " SAVE " : " EDIT "}
              style={{ marginLeft: "5px" }}
              disabled={editValue.trim() === t.text.trim()}
            />
            {t.id === editId && (
              <input
                type="button"
                onClick={cancelSave}
                value="Cancel"
                style={{ marginLeft: "5px" }}
              />
            )}
            <input
              type="button"
              onClick={() => deleteTask(t.id)}
              value=" DELETE "
              style={{ marginLeft: "5px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
