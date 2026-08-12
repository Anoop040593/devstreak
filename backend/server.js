const express = require("express");
const cors = require("cors");

const app = express();

let tasks = [
  {
    id: 1,
    text: "Learn Express",
    completed: false,
    createdAt: "2026-07-14T16:00:00.000Z",
    completedAt: null,
    updatedAt: null,
  },
  {
    id: 2,
    text: "Finish DevStreak backend",
    completed: true,
    createdAt: "2026-07-13T16:00:00.000Z",
    completedAt: "2026-07-29T10:30:00.000Z",
    updatedAt: null,
  },
];
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/health", (req, res) => {
  res.send("Server is running!");
});

app.get("/api/tasks", (req, res) => {
  return res.status(200).json({
    success: true,
    data: tasks,
  });
});

app.post("/api/tasks", (req, res) => {
  const task = req.body;
  const newTask = {
    id: tasks.length + 1,
    text: task.text,
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
    updatedAt: null,
  };

  tasks = [newTask, ...tasks];

  return res.status(201).json({
    success: true,
    data: newTask,
  });
});

app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  let newTask;
  let foundIndex = tasks.findIndex((x) => x.id == Number(id));
  if (foundIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Id doesn't match",
    });
  }
  let task = tasks[foundIndex];

  newTask = {
    ...task,
    completed: !task.completed,
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks[foundIndex] = newTask;

  return res.status(200).json({
    success: true,
    data: newTask,
  });
});

app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  let foundIndex = tasks.findIndex((x) => x.id === Number(id));
  if (foundIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Id doesn't match",
    });
  }

  let task = tasks[foundIndex];

  let updatedTasks = tasks.filter((t) => t.id !== task.id);
  tasks = updatedTasks;
  console.log(updatedTasks);

  return res.status(200).json({
    success: true,
    data: updatedTasks,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
