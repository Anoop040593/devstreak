import "./App.css";
import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import DashboardStats from "./components/DashboardStats";
function App() {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [streakStatus, setStreakStatus] = useState(false);
  const [totalTasksCount, setTotalTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [pendingTasksCount, setPendingTasksCount] = useState(0);
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
  let filteredTasks = [];

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
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (err) {
      console.error("Invalid localStorage data");
      localStorage.removeItem("tasks");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setCompletedTasksCount(tasks?.filter((task) => task.completed).length);
    setPendingTasksCount(tasks?.filter((task) => !task.completed).length);
    setTotalTasksCount(tasks?.length);
    setStreakStatus(tasks?.some((task) => task.completed));
  }, [tasks]);
  if (filter === "all") {
    filteredTasks = tasks;
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  } else {
    filteredTasks = tasks.filter((t) => !t.completed);
  }
  return (
    <>
      <h1>DevStreak Dashboard</h1>
      <TaskInput
        addTask={addTask}
        handleTaskChange={handleTaskChange}
        inputValue={inputValue}
      />
      <h3>Task List </h3>

      <TaskFilters setFilter={setFilter} />
      {filteredTasks?.length === 0 && <p>No tasks found</p>}

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
      <input
        type="button"
        onClick={clearCompleted}
        value="❌ Clear Completed Tasks"
        style={{ marginLeft: "5px" }}
      />
      {/* <button onClick={fetchMessage}>Refresh Message</button>
      <h3>
        {loading ? (
          <span>Loading...</span>
        ) : (
          message.map((m, index) => (
            <div key={index}>
              {m.text}- {new Date(m.time).toLocaleTimeString()}
            </div>
          ))
        )}
      </h3> */}
      <DashboardStats
        totalTasksCount={totalTasksCount}
        completedTasksCount={completedTasksCount}
        pendingTasksCount={pendingTasksCount}
        streakStatus={streakStatus}
      />
    </>
  );
}

export default App;
