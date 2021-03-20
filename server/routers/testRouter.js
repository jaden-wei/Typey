const router = require("express").Router();
const Test = require("../models/testModel");
const auth = require("../middleware/auth");

//get test data
router.get("/", auth, async (req, res) => {
    try {
        const data = await Test.find({ user: req.user });
        res.json(data);
    } catch (err) {
        res.status(500).send();
    }
});

//save test data
router.post("/", auth, async (req, res) => {
    try {
        const { wpm, accuracy } = req.body;

        const newTest = new Test({
            wpm,
            accuracy,
            user: req.body.user,
        });

        const savedTest = await newTest.save();

        res.json(savedTest);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;
