const router = require("express").Router();
const Test = require("../models/testModel");

router.post("/", async (req, res) => {
    try {
        const { wpm, accuracy } = req.body;

        const newTest = new Test({
            wpm,
            accuracy,
            //user: req.user,
        });

        const savedTest = await newTest.save();

        res.json(savedTest);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
