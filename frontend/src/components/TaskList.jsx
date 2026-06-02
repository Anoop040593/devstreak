import React from "react";
import TaskItem from "./TaskItem";

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
          <TaskItem
            key={t.id}
            task={t}
            editId={editId}
            editValue={editValue}
            handleEditChange={handleEditChange}
            toggleTask={toggleTask}
            editTaskFunc={editTaskFunc}
            cancelSave={cancelSave}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
