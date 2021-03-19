const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const snippetSchema = new mongoose.Schema(
    {
        wpm: { type: Number },
        accuracy: { type: Number },
        //user: { type: ObjectId, required: true },
    },
    {
        timestamps: true,
    }
);

const Snippet = mongoose.model("snippet", snippetSchema);

module.exports = Snippet;
