require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoute = require("./routes/userRoute.js");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3000", "https://primelodge.vercel.app"],
        credentials: true
    })
);

// Routes
app.use("/api/users", userRoute); // Removed the comma in the route definition

app.get("/", (req, res) => {
    res.send("Home Page");
});

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on ${PORT}`);
        });
    })
    .catch((err) => console.error("MongoDB Connection Error:", err));
