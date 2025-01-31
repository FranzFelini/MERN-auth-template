import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function Logout() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null); // Ensure that the user state is reset
  }, [setUser]);

  const handleLogout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      setUser(null);
      console.log("Logging out, navigating to /register...");
      navigate("/register"); // Ensure this path is correct and registered
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
