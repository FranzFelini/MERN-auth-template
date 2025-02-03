const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected!");
  })
  .catch((error) => {
    console.log("database NOT connected", error);
  });

// Configure CORS with specific options
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something broke!",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Mount routes under /api/user
app.use("/api/user", require("./routes/authRoutes"));

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
