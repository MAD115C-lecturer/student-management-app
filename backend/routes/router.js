const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json("Please fill out all fields");
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(422).json("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User registered successfully");
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json("Please fill out all fields");
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json("Invalid password");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
});

module.exports = router;