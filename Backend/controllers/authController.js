import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { hash } from "../helpers/authEncryption.js";
import UserModel from "../models/user.js";

const test = (req, res) => {
  res.json("test is working");
};

// POST req for register endpoint
const registerUser = async (req, res) => {
  try {
    //name validation - check if name exists
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "name is reqired",
      });
    }
    //password validation - check if the password exists and if's over 8 chars long
    if (!password || password < 8) {
      return res.json({
        error: "Password must be 8+ charachters long",
      });
    }
    //email validation - check if the email is taken (if it exists in the DB) // add email validation
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
    console.log(error).status(503);
  }
};

// POST req for login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    // Check password match
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

export default { test, registerUser, loginUser, getProfile };
