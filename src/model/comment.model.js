const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        user : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        movie : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Movie",
        },
        content : {
            type: String,
            required: true,
        },
        rating : {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Comment", CommentSchema, "comments");