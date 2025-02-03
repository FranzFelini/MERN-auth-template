import axios from "axios";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function NavCmp() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      // Make sure we're using the full URL path
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
        // Clear user context
        setUser(null);

        // Clear any stored data
        localStorage.removeItem("user");

        toast.success("Logged out successfully");

        setTimeout(() => {
          window.location.href = "/login";
        }, 300);
      }
    } catch (error) {
      console.error("Logout failed:", error);

      // Force logout anyway
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
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Home
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavCmp;
