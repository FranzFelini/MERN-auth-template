import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const BookForm = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !rating) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/books/add",
        { title, description, rating },
        { withCredentials: true }
      );

      toast.success(response.data.message); // Success message from the backend
      setTitle("");
      setDescription("");
      setRating("");
    } catch (error) {
      console.error("Error uploading book", error);
      toast.error("Failed to upload book. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto mt-12">
          <p className="text-center text-lg text-gray-700">
            You must be logged in to add a book.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full sm:w-96 md:w-[600px] lg:w-[700px] mx-auto mt-12">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Add a New Book
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 text-gray-800 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter a brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-4 text-gray-800 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="rating"
            >
              Rating (1-5)
            </label>
            <input
              type="number"
              id="rating"
              placeholder="Enter rating (1-5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-4 text-gray-800 bg-gray-100 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
