const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { requireAuth } = require("../middleware/authMiddleware"); // Make sure you import it

const {
  test,
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// CORS configuration
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Clean the original filename
    const cleanFileName = file.originalname.replace(/[^a-zA-Z0-9.]/g, "-");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${cleanFileName}`);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File size is too large. Maximum size is 5MB." });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// Routes
router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

// Profile update route with error handling
router.post(
  "/update-profile",
  requireAuth, // Ensure the authentication middleware is used
  upload.single("profilePic"), // Multer upload middleware
  handleMulterError, // Multer error handler
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.profilePicPath = `/uploads/${req.file.filename}`;
      }
      next(); // Continue to updateProfile handler
    } catch (error) {
      next(error); // Pass errors to next middleware
    }
  },
  updateProfile // This must be a function in your controller
);

router.post("/logout", logoutUser);

// Serve uploaded files statically
router.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

module.exports = router;
