const express = require("express");
const router = express.Router();
const {
  register,
  getUsers,
  updateUser,
} = require("../controllers/authController");

// AUTH ROUTES
router.post("/register", register);
router.get("/register", getUsers);
router.patch("/register", updateUser);

module.exports = router;
