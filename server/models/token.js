const mongoose = require("mongoose");

// JSON Refresh WebToken schema

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model("Token", tokenSchema);
