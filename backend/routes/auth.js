const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersFilePath = path.join(__dirname, "..", "data", "users.json");

// Helper: read users.json
function readUsersFile() {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
  }
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
}

// Helper: write to users.json
function writeUsersFile(data) {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
}

// POST /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const users = readUsersFile();

  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });
  writeUsersFile(users);

  res.status(201).json({ message: "User registered successfully" });
});

// POST /auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const users = readUsersFile();
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const accessToken = jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ accessToken });
});

module.exports = router;
