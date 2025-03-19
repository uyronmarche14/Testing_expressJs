const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const dotenv = require("dotenv");
const { default: mongoose, Schema } = require("mongoose");

const registrations = [];

// Add body-parser middleware
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newUser = {
    id: registrations.length + 1,
    name,
    email,
    password, // Note: Should hash password in production
  };

  registrations.push(newUser);
  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

app.get("/api/auth/register", (req, res) => {
  res.json({ registrations });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Handle 404
app.use((req, res) => {
  res.status(404).send("Not found");
});
