import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import "./nav.css";

function NavCmp() {
  const { user, setUser } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setUser(null);
        localStorage.removeItem("user");
        toast.success("Logged out successfully");

        setTimeout(() => {
          window.location.href = "/login";
        }, 300);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setUser(null);
      localStorage.removeItem("user");

      toast.error(
        "Logout encountered an error, but you've been logged out locally"
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 300);
    }
  };

  return (
    <nav className="bg-gray-950 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-3xl font-bold text-white hover:text-gray-300 transition duration-300 transform hover:scale-105"
          >
            BookShop
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-105"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-gray-300 transition duration-300 transform hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white space-y-4 py-4 px-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-lg hover:text-gray-300 transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-lg py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-lg hover:text-gray-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-lg hover:text-gray-300 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavCmp;
