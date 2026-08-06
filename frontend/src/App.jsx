import "./App.css";
import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import DashboardStats from "./components/DashboardStats";
import ClearCompleted from "./components/ClearCompleted";
import {
  calculateCurrentStreak,
  calculateLongestStreak,
} from "./utils/streakUtils";
function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const completedTasksCount = tasks?.filter((task) => task.completed).length;
  const pendingTasksCount = tasks?.filter((task) => !task.completed).length;
  const totalTasksCount = tasks?.length;
  const streakStatus = tasks?.some((task) => task.completed);
  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:3000/api/tasks");
      const taskData = await response.json();
      setTasks(taskData.data);
    } catch (err) {
      console.error("Error Occured", err);
    } finally {
    }
  }

  function handleTaskChange(e) {
    setInputValue(e.target.value);
  }

  function handleEditChange(e) {
    setEditValue(e.target.value);
  }

  async function addTask() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: trimmed,
      }),
    });
    if (!response.ok) {
      console.error("Failed to create task");
      return;
    }
    const addedTaskData = await response.json();
    setTasks((prev) => {
      return [addedTaskData.data, ...prev];
    });

    setInputValue("");
  }

  async function toggleTask(id) {
    console.log("toggleTask called", id);
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    const updatedTask = await response.json();

    console.log("Task: ", updatedTask);

    setTasks((prev) => {
      return prev.map((task) => {
        if (task.id === id) {
          return updatedTask.data;
        } else {
          return task;
        }
      });
    });
  }

  function deleteTask(id) {
    setTasks((prev) => {
      return prev.filter((task) => task.id !== id);
    });
  }

  function editTaskFunc(index, task) {
    if (editId !== index) {
      //"the clicked task is NOT the currently editing task"
      setEditValue(task.text);
      setEditId(index);
    } else {
      setTasks((prev) => {
        return prev.map((task) => {
          if (task.id === editId) {
            return {
              ...task,
              text: editValue,
              updatedAt: new Date().toISOString(),
            };
          } else {
            return task;
          }
        });
      });
      setEditId(null);
      setEditValue("");
    }
  }

  function cancelSave() {
    setEditId(null);
    setEditValue("");
  }

  function clearCompleted() {
    setTasks((prev) => {
      return prev.filter((task) => !task.completed);
    });
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setLongestStreak(calculateLongestStreak(tasks));
    setStreak(calculateCurrentStreak(tasks));
  }, [tasks]);

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
        ? tasks.filter((t) => t.completed)
        : tasks.filter((t) => !t.completed);
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">DevStreak Dashboard</h1>
      <TaskInput
        addTask={addTask}
        handleTaskChange={handleTaskChange}
        inputValue={inputValue}
      />
      <h3>Task List </h3>

      <TaskFilters filter={filter} setFilter={setFilter} />
      {filteredTasks?.length === 0 && (
        <p>
          <div className="border rounded-xl m-4 shadow-md">
            📝 No tasks yet <br />
            Create your first task to start your streak
          </div>{" "}
        </p>
      )}

      <TaskList
        filteredTasks={filteredTasks}
        toggleTask={toggleTask}
        editValue={editValue}
        handleEditChange={handleEditChange}
        editTaskFunc={editTaskFunc}
        cancelSave={cancelSave}
        deleteTask={deleteTask}
        editId={editId}
      />
      {completedTasksCount > 0 && (
        <ClearCompleted clearCompleted={clearCompleted} />
      )}
      <DashboardStats
        totalTasksCount={totalTasksCount}
        completedTasksCount={completedTasksCount}
        pendingTasksCount={pendingTasksCount}
        streakStatus={streakStatus}
        streak={streak}
        longestStreak={longestStreak}
      />

      {/* <p>
        Completed Dates:{completedDates} -------- {uniqueDates} -------{" "}
        {JSON.stringify(uniqueCompletedDates.toReversed())}
      </p> */}
    </div>
  );
}

export default App;
