const mongoose = require("mongoose");

// Define the review schema for books
const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

// Define the book schema
const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    isbn: { type: String, required: true, unique: true }, // ISBN added
    author: { type: String, required: true }, // Author added
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who added the book
    reviews: [reviewSchema], // Array of reviews added to each book
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Book", BookSchema);
