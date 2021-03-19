const router = require("express").Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const testSchema = new mongoose.Schema(
    {
        wpm: { type: Number },
        accuracy: { type: Number },
        //user: { type: ObjectId, required: true },
    },
    {
        timestamps: true,
    }
);

const Test = mongoose.model("test", testSchema);

module.exports = Test;
