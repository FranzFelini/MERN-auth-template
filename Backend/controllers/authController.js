import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { hash } from "../helpers/authEncryption.js";
import TodoModel from "../models/todo.js";
import UserModel from "../models/user.js";

// Test route
const test = (req, res) => {
  res.json("test is working");
};

// POST req for register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!password || password.length < 8) {
      return res.json({
        error: "Password must be 8+ characters long",
      });
    }

    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email already taken",
      });
    }

    const hashedPass = await hash(password);
    const user = await UserModel.create({ name, email, password: hashedPass });

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
      return res.json({
        error: "No user found",
      });
    }

    const match = await compare(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: "Failed to generate token",
            });
          }
          res.cookie("token", token).json({ token, user });
        }
      );
    } else {
      res.json({
        error: "Passwords don't match",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Server error",
    });
  }
};

// Get profile route (user info from token)
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

// Add a new to-do item for the logged-in user
const addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const userId = req.user.id; // Get the logged-in user's ID from the token

    const newTodo = new TodoModel({
      task,
      user: userId,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to add todo" });
  }
};

// Get all to-do items for the logged-in user
const getTodos = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID from the token
    const todos = await TodoModel.find({ user: userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Mark a to-do item as completed
const completeTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    if (todo.user.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    todo.isCompleted = true;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark todo as completed" });
  }
};

// Delete a to-do item
const deleteTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    if (todo.user.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    await todo.remove();
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

export default {
  test,
  registerUser,
  loginUser,
  getProfile,
  addTodo,
  getTodos,
  completeTodo,
  deleteTodo,
};
