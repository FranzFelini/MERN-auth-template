/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import trash icon

const Home = () => {
  const [books, setBooks] = useState([]);
  const baseUrl = "http://localhost:8000/uploads/"; // Base URL for images

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/books/${bookId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setBooks(books.filter((book) => book._id !== bookId)); // Remove the book from the list
      } else {
        console.error("Error deleting book:", response.data);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-600 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-light text-center text-white mb-16">
          Your Book Collection
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-gray-800 text-white rounded-lg shadow-xl p-6 flex flex-col justify-between relative overflow-hidden items-center"
            >
              <div className="flex-grow text-center mb-4">
                <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-300">{book.description}</p>
                <p className="text-gray-400 mt-3">Rating: {book.rating}</p>
              </div>

              <div className="flex justify-center flex-row gap-1 items-center mb-10">
                <img
                  src={
                    book.user.profilePic
                      ? `${baseUrl}${book.user.profilePic}`
                      : "/default-avatar.png"
                  }
                  className="w-12 h-12 rounded-full border-2 border-indigo-600 mr-3"
                />
                <span className="text-sm">{book.user.name}</span>
              </div>

              <button
                onClick={() => handleDelete(book._id)}
                className="reltive w-[2.7em] flex  justify-center bottom-[-2em] right-[7em] p-3 bg-red-600 text-white rounded-full shadow-lg focus:outline-none hover:bg-red-700 transition-all duration-300"
              >
                <FaTrash size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
