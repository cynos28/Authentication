require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

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
