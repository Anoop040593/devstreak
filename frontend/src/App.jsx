import "./App.css";
import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import DashboardStats from "./components/DashboardStats";
import ClearCompleted from "./components/clearCompleted";
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
  // const [streakStatus, setStreakStatus] = useState(false); //can be derived
  // const [totalTasksCount, setTotalTasksCount] = useState(0); //can be derived
  // const [completedTasksCount, setCompletedTasksCount] = useState(0); //can be derived
  // const [pendingTasksCount, setPendingTasksCount] = useState(0); //can be derived
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");
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
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  // if (filter === "all") {
  //   filteredTasks = tasks;
  // } else if (filter === "completed") {
  //   filteredTasks = tasks.filter((t) => t.completed);
  // } else {
  //   filteredTasks = tasks.filter((t) => !t.completed);
  // }

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
      <ClearCompleted clearCompleted={clearCompleted} />
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
    </div>
  );
}

export default App;
