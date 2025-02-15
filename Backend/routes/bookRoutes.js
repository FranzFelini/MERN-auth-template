const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const BookModel = require("../models/book");
const UserModel = require("../models/user");
const router = express.Router();

// POST route to submit a new book
router.post("/add", requireAuth, async (req, res) => {
  const { title, description, rating } = req.body;

  if (!title || !description || !rating) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const newBook = new BookModel({
      title,
      description,
      rating,
      user: req.user._id, // The user who is adding the book
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error); // Detailed log
    res.status(500).json({ error: "Server error" });
  }
});

// GET route to fetch all books
router.get("/", async (req, res) => {
  try {
    const books = await BookModel.find()
      .populate("user", "name email profilePic")
      .exec(); // Populating user information
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error); // Detailed log
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE route to remove a book
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    await BookModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ADD/Modify Book Review - POST
router.post("/:bookId/review", requireAuth, async (req, res) => {
  const { reviewText, rating } = req.body;
  const userId = req.user._id;

  try {
    const book = await BookModel.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const review = {
      user: userId,
      reviewText,
      rating,
    };

    book.reviews.push(review);
    await book.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE Book Review
router.delete("/:bookId/review/:reviewId", requireAuth, async (req, res) => {
  const { bookId, reviewId } = req.params;
  const userId = req.user._id;

  try {
    const book = await BookModel.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const reviewIndex = book.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );
    if (reviewIndex === -1)
      return res.status(404).json({ message: "Review not found" });

    if (book.reviews[reviewIndex].user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this review" });
    }

    book.reviews.splice(reviewIndex, 1);
    await book.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
