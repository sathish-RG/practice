const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true,
    },
    receiverName: {
        type: String,
        required: true,
    },
    superpowers: {
        type: [String],
    },
    customMessage: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Wish", wishSchema);
