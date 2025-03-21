const app = require("./src/app");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8080;

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
