const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { username, name, password, passwordConfirm } = req.body;
    // VALIDATE
    try {
        if (!username || !name || !password || !passwordConfirm) {
            return res.status(400).json({
                errorMessage: "Please enter all required fields.",
            });
        }

        if (password !== passwordConfirm) {
            return res.status(400).json({
                errorMessage: "Password and confirmation do not match.",
            });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                errorMessage: "An account with this username already exists.",
            });
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // SAVE USER
        const newUser = new User({
            username,
            name,
            passwordHash,
        });

        const savedUser = await newUser.save();

        // JWT TOKEN
        const token = jwt.sign(
            {
                id: savedUser._id,
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite:
                process.env.NODE_ENV === "development"
                    ? "lax"
                    : process.env.NODE_ENV === "production" && "none",
            secure:
                process.env.NODE_ENV === "development"
                    ? false
                    : process.env.NODE_ENV === "production" && true,
        }).send();
    } catch (err) {
        res.status(500).send();
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // validation

        if (!username || !password)
            return res.status(400).json({
                errorMessage: "Please enter all required fields.",
            });

        // get user account

        const existingUser = await User.findOne({ username });
        if (!existingUser)
            return res.status(401).json({
                errorMessage: "Wrong username or password.",
            });

        const correctPassword = await bcrypt.compare(
            password,
            existingUser.passwordHash
        );

        if (!correctPassword)
            return res.status(401).json({
                errorMessage: "Wrong username or password.",
            });

        // create a JWT token

        const token = jwt.sign(
            {
                id: existingUser._id,
            },
            process.env.JWT_SECRET
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite:
                process.env.NODE_ENV === "development"
                    ? "lax"
                    : process.env.NODE_ENV === "production" && "none",
            secure:
                process.env.NODE_ENV === "development"
                    ? false
                    : process.env.NODE_ENV === "production" && true,
        }).send();
    } catch (err) {
        res.status(500).send();
    }
});

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.json(null);

        const validatedUser = jwt.verify(token, process.env.JWT_SECRET);

        res.json(validatedUser.id);
    } catch (err) {
        return res.json(null);
    }
});

router.get("/logOut", (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            sameSite:
                process.env.NODE_ENV === "development"
                    ? "lax"
                    : process.env.NODE_ENV === "production" && "none",
            secure:
                process.env.NODE_ENV === "development"
                    ? false
                    : process.env.NODE_ENV === "production" && true,
            expires: new Date(0),
        }).send();
    } catch (err) {
        return res.json(null);
    }
});

module.exports = router;
