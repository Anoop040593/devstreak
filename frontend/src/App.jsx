import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

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

  useEffect(() => {
    fetchMessage();
  }, []);

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
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            >
              {t.text}{" "}
            </span>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(index)}
            />
            <label htmlFor="completed"> Completed</label>
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
    </>
  );
}

export default App;
