const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

const todos = {
  testuser: [
    { id: 1, task: "Learn Node.js", done: false },
    { id: 2, task: "Build Todo App", done: false },
  ],
};

// GET /todos
router.get("/", verifyJWT, (req, res) => {
  res.json(todos[req.user] || []);
});

module.exports = router;
