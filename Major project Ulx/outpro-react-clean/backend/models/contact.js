const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        service: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            match: [/^[6-9]\d{9}$/, "Invalid phone number"],
        },
        status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending",
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema);