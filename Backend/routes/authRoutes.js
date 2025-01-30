const express = require("express");
const cors = require("cors");
const { test, registerUser, loginUser, getProfile } =
  require("../controllers/authController").default;

const router = express.Router();

//middleware for routes

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.get("/", test);
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

module.exports = router;
