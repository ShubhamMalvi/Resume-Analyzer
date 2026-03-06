const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
    fileName: String,
    jobDescription: String,
    score: Number,
    matchedSkills: [String],
    missingSkills: [String],
    feedback: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Resume", ResumeSchema);