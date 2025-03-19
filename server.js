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
app.use(
  cors({
    origin: "http://localhost:3000", // or your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const inputField = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Remove 'new' keyword here - it's incorrect syntax
const InputItems = mongoose.model("itemField", inputField);

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await InputItems.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const itemsData = new InputItems({ name, email, password });
    await itemsData.save();

    res.json({
      success: true,
      message: "User registered successfully",
      user: itemsData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Failed to register user",
    });
  }
});

app.get("/api/auth/register", async (req, res) => {
  try {
    const users = await InputItems.find();
    res.json({ registrations: users }); // Match frontend expectation
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Failed to fetch users",
    });
  }
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
