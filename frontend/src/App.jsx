import "./App.css";
import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import DashboardStats from "./components/DashboardStats";
import ClearCompleted from "./components/ClearCompleted";
import { calculateStreak } from "./utils/streakUtils";
function App() {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (err) {
      console.error("Invalid localStorage data");
      localStorage.removeItem("tasks");
      return [];
    }
  });
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [streak, setStreak] = useState(0);
  const completedTasksCount = tasks?.filter((task) => task.completed).length;
  const pendingTasksCount = tasks?.filter((task) => !task.completed).length;
  const totalTasksCount = tasks?.length;
  const streakStatus = tasks?.some((task) => task.completed);

  async function fetchMessage() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/message");
      const messageData = await response.json();
      const { message, time } = messageData;
      setMessage((prev) => {
        return [...prev, { text: message, time: time, completed: false }];
      });
    } catch (err) {
      console.error("Error Occured", err);
    } finally {
      setLoading(false);
    }
  }
  function properDate(dateNew) {
    const year = dateNew.getFullYear();
    const month = (dateNew.getMonth() + 1).toString().padStart(2, "0");
    const date = dateNew.getDate().toString().padStart(2, "0");
    const hours = dateNew.getHours().toString().padStart(2, "0");
    const mins = dateNew.getMinutes().toString().padStart(2, "0");
    const secs = dateNew.getSeconds().toString().padStart(2, "0");
    const properDate = `${year}-${month}-${date} ${hours}:${mins}:${secs}`;
    return properDate;
  }

  function handleTaskChange(e) {
    setInputValue(e.target.value);
  }

  function handleEditChange(e) {
    setEditValue(e.target.value);
  }

  function addTask() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setTasks((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          text: trimmed,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ];
    });

    setInputValue("");
  }

  function toggleTask(id) {
    setTasks((prev) => {
      return prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
            completedAt: !task.completed ? new Date().toISOString() : null,
          };
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
    fetchMessage();
  }, []);

  useEffect(() => {
    let streak = calculateStreak(tasks);
    setStreak(streak);
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
        setStreak={setStreak}
      />

      {/* <p>
        Completed Dates:{completedDates} -------- {uniqueDates} -------{" "}
        {JSON.stringify(uniqueCompletedDates.toReversed())}
      </p> */}
    </div>
  );
}

export default App;
