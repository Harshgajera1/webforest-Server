import express from "express";
import mongoose from "mongoose";

const route = express.Router();

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

route.post("/signup", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating user" });
  }
});

route.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
      password: password
    });
    if (user) {
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error during login" });
  }
});

export default route;
