/* eslint-disable no-unused-vars */
// components/AddBookPage.js
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import BookFormCmp from "../components/BookFromCmp";

const AddBookPage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
        <div className="bg-white p-6 rounded-lg shadow-xl text-center text-gray-900">
          <h2 className="text-xl font-semibold">
            You must be logged in to add a book.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-950 via-indigo-600 to-indigo-900 min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <BookFormCmp user={user} />
    </div>
  );
};

export default AddBookPage;
