const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
    question: String,
    answer: String,
    note: String,
    isPinned: { type: String, default: false }
}, { timestamps: true })

module.exports = mongoose.model("Question", questionSchema)