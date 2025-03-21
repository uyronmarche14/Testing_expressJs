const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // or your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorHandler);

// Handle 404
app.use(notFound);

module.exports = app;
