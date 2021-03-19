const router = require("express").Router();
const Snippet = require("../models/snippetModel");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
    try {
        const { wpm, accuracy } = req.body;
        res.json(savedSnippet);
    } catch (err) {
        res.status(500).send();
    }
});
