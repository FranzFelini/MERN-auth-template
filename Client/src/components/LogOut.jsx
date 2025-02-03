import axios from "axios";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext";

const API_URL = "http://localhost:8000/api/user";

function Logout() {
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const loadingToast = toast.loading("Logging out...");

      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.dismiss(loadingToast);

      if (response.status === 200) {
        setUser(null);

        toast.success("Logged out successfully");

        setTimeout(() => {
          window.location.href = "/login";
        }, 300);
      }
    } catch (error) {
      console.error("Logout error:", error);

      setUser(null);

      toast.error(
        "Logout encountered an error, but you've been logged out locally"
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 300);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}

export default Logout;
