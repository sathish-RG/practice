const express = require("express");
const router = express.Router();
const Wish = require("../models/Wish");

// POST /api/wishes — Save a new wish
router.post("/", async (req, res) => {
    try {
        const { senderName, receiverName, superpowers, customMessage } = req.body;

        const wish = new Wish({ senderName, receiverName, superpowers, customMessage });
        const savedWish = await wish.save();

        res.status(201).json({ id: savedWish._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/wishes/:id — Fetch a wish by ID
router.get("/:id", async (req, res) => {
    try {
        const wish = await Wish.findById(req.params.id);

        if (!wish) {
            return res.status(404).json({ error: "Wish not found" });
        }

        res.json(wish);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
