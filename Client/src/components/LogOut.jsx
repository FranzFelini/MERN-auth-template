import axios from "axios";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext";

function Logout() {
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      // First clear the user context to ensure immediate logout state
      setUser(null);

      // Then make the logout API call
      await axios.post("/logout");

      // Show success message
      toast.success("Logged out successfully!");

      // Use a small delay to ensure state updates are processed
      setTimeout(() => {
        // Force navigation using absolute path
        window.location.replace("/login");
      }, 100);
    } catch (error) {
      console.error("Logout failed:", error);

      // Ensure user is logged out locally
      setUser(null);

      toast.error("Something went wrong, but you've been logged out.");

      setTimeout(() => {
        window.location.replace("/login");
      }, 100);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
    >
      Logout
    </button>
  );
}

export default Logout;
