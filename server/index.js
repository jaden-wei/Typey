const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// SETUP EXPRESS SERVER

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: [
            "http://192.168.86.147:3000",
            "https://snippetmanager21.netlify.app",
        ],
        credentials: true,
    })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// CONNECT TO MONGODB

mongoose.connect(
    process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) return console.error(err);
        console.log("Connected to databse.");
    }
);