const express = require("express");
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  addTodo,
  getTodos,
  completeTodo,
  deleteTodo,
} = require("../controllers/authController").default;

const router = express.Router();

// Middleware for routes
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // Frontend URL (update it as per your setup)
  })
);

// Test route
router.get("/", test);

// Authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
});

router.post("/todo", addTodo);
router.get("/todos", getTodos);
router.put("/todo/:id", completeTodo);
router.delete("/todo/:id", deleteTodo);

module.exports = router;
