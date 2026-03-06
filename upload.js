const express = require("express");
const router = express.Router();
const axios = require("axios");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Resume = require("../models/resume");

const upload = multer();

router.post("/upload", upload.single("resume"), async (req, res) => {

    try {

        const jobDesc = req.body.jobDesc;

        // Convert PDF to text
        const data = await pdfParse(req.file.buffer);
        const resumeText = data.text;

        console.log("Resume Text Length:", resumeText.length);

        // Send to Python AI
        const response = await axios.post("http://127.0.0.1:8000/analyze", {
            resumeText: resumeText,
            jobDesc: jobDesc
        });

        const { score, feedback } = response.data;

        const newResume = new Resume({
            jobDesc,
            score
        });

        await newResume.save();

        res.json({
            score,
            feedback
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }

});

module.exports = router;