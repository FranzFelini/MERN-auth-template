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

// Middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // Frontend URL (update it as per your setup)
  })
);

//First test the routes
router.get("/", test);

//Other routes, since this is a template, in most cases you will change them right away
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
