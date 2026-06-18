const express = require("express");
const router = express.Router();
const Book = require("./Book");

// GET all books

router.get("/", async (req, res) => {

    try {

        const books = await Book.find();

        res.json(books);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ADD book

router.post("/", async (req, res) => {

    try {

        const book = new Book(req.body);

        await book.save();

        res.status(201).json(book);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;