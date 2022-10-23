const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// --description:   Register new user
// --route:  POST /api/users/
// --access: Public
// ---------------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please add all fields!" });
    throw new Error("Please add all fields!");
  }

  // Check user if already registered
  const userRegistered = await User.findOne({ email });

  if (userRegistered) {
    res.status(400).json({ message: "This user already registered" });
    throw new Error("This user already registered");
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
    throw new Error("Invalid user data");
  }
});

// --description:   Authenticate a user
// --route:  POST /api/users/login
// --access: Public
// ---------------------------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Incorrect email or password!" });
    throw new Error("Incorrect email or password!");
  }
});

// --description:   Get user data
// --route:  GET /api/users/dashboard
// --access: Private
// ---------------------------------
const getDashboard = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate Json Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getDashboard,
};
