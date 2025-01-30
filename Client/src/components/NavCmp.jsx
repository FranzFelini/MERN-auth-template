import axios from "axios";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      setUser(null); // Clear user context
      toast.success("Logged out successfully");
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Example page
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-300 transition duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="hover:text-gray-300 transition duration-300"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
