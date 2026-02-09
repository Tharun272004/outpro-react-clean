// Modules
const express = require("express");
const cors = require("cors");
require('dotenv').config();


// database connection
const connectDB = require("./config/db");


// ✅ import routes
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const Contact = require("./models/contact");


// middleware setup
const app = express();
app.use(cors());
app.use(express.json());


// routes middleware
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Outpro Backend is running successfully!");
});
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working fine!" });
});
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
});


// server start 
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
    console.log('http://localhost:' + PORT);
    console.log('-------- connected --------');
  });
};
startServer();
 