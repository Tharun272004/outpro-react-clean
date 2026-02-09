const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/auth");

const router = express.Router();

/**
 * TEMP: Create Admin (RUN ONLY ONCE)
 * GET /api/auth/create-admin
 */
router.get("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({
      email: "admin@outpro.com",
    });

    if (existingAdmin) {
      return res.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      email: "admin@outpro.com",
      password: hashedPassword,
    });

    await admin.save();

    res.json({
      message: "Admin created successfully",
      email: "admin@outpro.com",
      password: "admin123",
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating admin" });
  }
});

/**
 * POST /api/auth/login
 * Admin Login
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;