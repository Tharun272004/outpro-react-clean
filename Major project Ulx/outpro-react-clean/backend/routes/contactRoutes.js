const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const protectAdmin = require("../middleware/authMiddleware");

/* ================= PUBLIC ================= */

// POST: /api/contact/send-message
router.post("/send-message", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Required fields validation
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Phone validation (India)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. Must be 10 digits.",
      });
    }

    // DUPLICATE CHECK (IMPORTANT)
    // same email + phone + service + message = duplicate
   const existingContact = await Contact.findOne({
     name: name.trim(),
     email: email.trim().toLowerCase(),
     phone: phone.trim(),
     service: service.trim(),
     message: message.trim(),
    });
    
    if (existingContact) {
      return res.status(409).json({
        success: false,
        message:
          "Your request is already received. Our team will contact you soon.",
      });
    }

    // Save new contact
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service.trim(),
      message: message.trim(),
      status: "Pending",
     });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully and we will get back to you soon!",
    });
  } catch (error) {
    console.error("Contact save error:", error.message);
if (error.code === 11000) {
  return res.status(409).json({
    success: false,
    message:
      "Your request is already received. We will contact you soon.",
  });
}

res.status(500).json({
  success: false,
  message: "Server error",
});
  }
});

/* ================= ADMIN ================= */

// ADMIN: get all contacts
router.get("/", protectAdmin, async (req, res) => {
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

// ADMIN: delete contact
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});

// ADMIN: update status
router.patch("/status/:id", protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    await Contact.findByIdAndUpdate(req.params.id, { status });

    res.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
});

// ADMIN: edit full contact (EDIT BUTTON)
router.put("/:id", protectAdmin, async (req, res) => {
  try {
    const { name, email, phone, service, message, status } = req.body;

    // basic validation
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        service: service.trim(),
        message: message.trim(),
        status: status || "Pending",
      },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.json({
      success: true,
      message: "Message updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Edit error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update message",
    });
  }
});


module.exports = router;
