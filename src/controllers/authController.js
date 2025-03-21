const User = require("../models/User");

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Failed to register user",
    });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ registrations: users }); // Match frontend expectation
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Failed to fetch users",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, getUsers, updateUser };
