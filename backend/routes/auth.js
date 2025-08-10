const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = [
  {
    username: "testuser",
    password: "$2b$10$TPS17Z8gOnewkuVZ0iQ2betdZyObP/gNlA3waMkfr.vxUiG.Z/.cy", // hashed "password123"
  },
];

// POST /auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user)
    return res.status(401).json({ message: "Invalid username or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Invalid username or password" });

  const accessToken = jwt.sign(
    { username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ accessToken });
});

module.exports = router;
