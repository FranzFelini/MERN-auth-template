// controllers/authController.js
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hash } = require("../helpers/authEncryption.js");
const UserModel = require("../models/user.js");

// Test route
const test = (req, res) => {
  res.json("test is working");
};

// POST req for register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({ error: "Name is required" });
    }

    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]).{8,}$/;
    if (!password || password.length <= 7) {
      return res.json({ error: "Password must be 7+ characters long" });
    } else if (!passwordRegex.test(password)) {
      return res.json({
        error: "Password must contain at least one special character",
      });
    }

    // Email validation
    const exist = await UserModel.findOne({ email });
    const regex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/;
    if (exist) {
      return res.json({ error: "Email already taken" });
    } else if (!regex.test(email)) {
      return res.json({
        error: "Invalid email format (format : your.email@domain.com)",
      });
    }

    const hashedPass = await hash(password);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPass,
      profilePic: "/default-avatar.png", // Default profile picture
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(503).json({ error: "Server error" });
  }
};

// POST req for login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    const match = await compare(password, user.password);
    if (match) {
      // Ensure profile picture has complete URL
      const userProfile = {
        email: user.email,
        id: user._id,
        name: user.name,
        profilePic: user.profilePic
          ? user.profilePic.startsWith("http")
            ? user.profilePic
            : `/uploads/${user.profilePic.split("/").pop()}`
          : "/default-avatar.png",
      };

      jwt.sign(
        userProfile,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to generate token" });
          }
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 3600000, // 1 hour
            })
            .json({ user: userProfile });
        }
      );
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

// GET req for user profile
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

// POST req for updating profile (name & profile picture)
// In authController.js
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id;

    if (!userId) {
      console.log("User ID is missing");
      return res
        .status(400)
        .json({ error: "User ID is missing. Please log in." });
    }

    let updateFields = {};

    if (name) updateFields.name = name;
    if (email) {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
      }
      updateFields.email = email;
    }

    // Handle profilePic
    if (req.file) {
      console.log("File uploaded:", req.file);
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: "Invalid file type." });
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (req.file.size > maxSize) {
        return res.status(400).json({ error: "File size too large." });
      }
      updateFields.profilePic = `/uploads/${req.file.filename}`;
    }

    // Ensure we have valid fields to update
    if (Object.keys(updateFields).length === 0) {
      console.log("No valid fields provided to update.");
      return res.status(400).json({ error: "No valid fields to update." });
    }

    console.log("Updating user profile with data:", updateFields);

    // Attempt to find and update the user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      console.log("User not found:", userId);
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error); // Enhanced error logging
    res.status(500).json({
      error: "Failed to update profile.",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// POST req for logout
const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Server error during logout" });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser,
};
