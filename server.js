const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 CONNECT MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/resumeDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 🔥 API ROUTE
app.use("/api", uploadRoute);

// 🔥 SERVE FRONTEND
app.use(express.static(path.join(__dirname, "../frontend")));

// 🔥 DEFAULT ROUTE (IMPORTANT)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});