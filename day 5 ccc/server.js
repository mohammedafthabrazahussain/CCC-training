const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./bookRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/books", bookRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});