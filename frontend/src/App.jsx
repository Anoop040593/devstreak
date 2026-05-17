import "./App.css";
import { useEffect, useState } from "react";
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
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);

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
      return [...prev, { text: trimmed, completed: false }];
    });

    setInputValue("");
  }

  function toggleTask(index) {
    setTasks((prev) => {
      return prev.map((task, i) => {
        if (i === index) {
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

  function deleteTask(index) {
    setTasks((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  }

  function editTaskFunc(index, task) {
    if (editIndex !== index) {
      //"the clicked task is NOT the currently editing task"
      setEditValue(task.text);
      setEditIndex(index);
    } else {
      setTasks((prev) => {
        return prev.map((task, i) => {
          if (i === editIndex) {
            return {
              ...task,
              text: editValue,
            };
          } else {
            return task;
          }
        });
      });
      setEditIndex(null);
      setEditValue("");
    }
  }

  useEffect(() => {
    fetchMessage();
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setCompletedTasksCount(tasks.filter((task) => task.completed).length);
    setPendingTasksCount(tasks.filter((task) => !task.completed).length);
    setTotalTasksCount(tasks.length);
    setStreakStatus(tasks.some((task) => task.completed));
    if (filter === "all") {
      setFilteredTasks(tasks);
    } else if (filter === "completed") {
      setFilteredTasks(tasks.filter((t) => t.completed));
    } else {
      setFilteredTasks(tasks.filter((t) => !t.completed));
    }
  }, [tasks, filter]);

  return (
    <>
      <h1>DevStreak Dashboard</h1>
      <input
        type="text"
        id="task"
        value={inputValue}
        onChange={handleTaskChange}
      />
      <button onClick={addTask} disabled={!inputValue}>
        Add Task
      </button>
      <h3>Task List </h3>
      <input type="button" value=" ALL " onClick={() => setFilter("all")} />
      <input
        type="button"
        value=" COMPLETED "
        onClick={() => setFilter("completed")}
      />
      <input
        type="button"
        value=" PENDING "
        onClick={() => setFilter("pending")}
      />

      <ul>
        {filteredTasks.map((t, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            >
              {index === editIndex ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditChange}
                />
              ) : (
                t.text
              )}
            </span>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(index)}
            />
            <label htmlFor="completed"> Completed</label>
            <input
              type="button"
              onClick={() => editTaskFunc(index, t)}
              value={index === editIndex ? " SAVE " : " EDIT "}
              style={{ marginLeft: "5px" }}
            />
            <input
              type="button"
              onClick={() => deleteTask(index)}
              value=" DELETE "
              style={{ marginLeft: "5px" }}
            />
          </li>
        ))}
      </ul>
      <button onClick={fetchMessage}>Refresh Message</button>
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
      </h3>
      <h4>Total Tasks: {totalTasksCount}</h4>
      <h4>Completed Tasks: {completedTasksCount}</h4>
      <h4>Pending Tasks: {pendingTasksCount}</h4>
      <h4>{streakStatus ? "🔥 Streak Active" : "No Active Streak"}</h4>
    </>
  );
}

export default App;
