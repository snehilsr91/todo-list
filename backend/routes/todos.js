const express = require("express");
const fs = require("fs");
const path = require("path");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

const todosFilePath = path.join(__dirname, "..", "data", "todos.json");

// Helper: read todos.json
function readTodosFile() {
  if (!fs.existsSync(todosFilePath)) {
    fs.writeFileSync(todosFilePath, JSON.stringify({}, null, 2));
  }
  const data = fs.readFileSync(todosFilePath, "utf-8");
  return JSON.parse(data);
}

// Helper: write to todos.json
function writeTodosFile(data) {
  fs.writeFileSync(todosFilePath, JSON.stringify(data, null, 2));
}

// GET /todos
router.get("/", verifyJWT, (req, res) => {
  const todosData = readTodosFile();
  const userTodos = todosData[req.user] || [];
  res.json(userTodos);
});

// POST /todos
router.post("/", verifyJWT, (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  const todosData = readTodosFile();

  if (!todosData[req.user]) {
    todosData[req.user] = [];
  }

  const newTodo = {
    id: Date.now(),
    task,
    done: false,
  };

  todosData[req.user].push(newTodo);
  writeTodosFile(todosData);

  res.status(201).json(newTodo);
});

// PATCH /todos/:id - toggle done status
router.patch("/:id", verifyJWT, (req, res) => {
  const todoId = Number(req.params.id);
  const todosData = readTodosFile();

  if (!todosData[req.user]) {
    return res.status(404).json({ message: "No todos found for user" });
  }

  const userTodos = todosData[req.user];
  const todo = userTodos.find((t) => t.id === todoId);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  // Toggle done status
  todo.done = !todo.done;

  writeTodosFile(todosData);

  res.json(todo);
});

module.exports = router;
