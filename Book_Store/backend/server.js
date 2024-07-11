const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoose");
const sequelize = require("./config/sequelize");
const { protect, authorize } = require("./middleware/authMiddleware");
const Book = require("./models/Book");
const User = require("./models/User");

dotenv.config();

connectDB();
sequelize.sync();

const app = express();
app.use(express.json());

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  const { title, author, description, publishedDate } = req.body;
  try {
    const newBook = new Book({ title, author, description, publishedDate });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, description, publishedDate } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.publishedDate = publishedDate || book.publishedDate;
    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.remove();
    res.status(200).json({ message: "Book removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Routes
app.get("/api/books", protect, authorize("VIEW_ALL", "VIEWER"), getBooks);
app.post("/api/books", protect, authorize("CREATOR"), createBook);
app.get(
  "/api/books/:id",
  protect,
  authorize("VIEW_ALL", "VIEWER"),
  getBookById
);
app.put("/api/books/:id", protect, authorize("CREATOR"), updateBook);
app.patch("/api/books/:id", protect, authorize("CREATOR"), updateBook);
app.delete("/api/books/:id", protect, authorize("CREATOR"), deleteBook);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
