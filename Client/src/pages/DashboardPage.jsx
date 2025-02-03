import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function Dash() {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-950 via-blue-950 to-indigo-600">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-80">
          <p className="text-gray-500 animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  const profilePicUrl = user.profilePic.startsWith("http")
    ? user.profilePic
    : `http://localhost:8000${user.profilePic}`;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-950 via-blue-950 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-3xl p-8 text-center w-full sm:w-96">
        <div className="flex justify-center">
          <img
            src={profilePicUrl || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-600 shadow-lg"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
          {user.name}
        </h1>
        <p className="text-gray-600 text-sm">{user.email}</p>

        <div className="mt-6 space-y-3">
          <Link
            to="/editprofile"
            className="block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Edit Profile
          </Link>

          <Link
            to="/dashboard"
            className="block px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Back to Dashboard
          </Link>

          {/* Add Book button */}
          <Link
            to="/add-book"
            className="block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
          >
            Add Book
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dash;
