/* eslint-disable react/prop-types */
// UserContext.jsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to refresh user data
  const refreshUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/user/profile",
        {
          withCredentials: true,
        }
      );
      if (data) {
        // Ensure profile picture URL is complete
        if (data.profilePic && !data.profilePic.startsWith("http")) {
          data.profilePic = `http://localhost:8000${data.profilePic}`;
        }
        setUser(data);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
