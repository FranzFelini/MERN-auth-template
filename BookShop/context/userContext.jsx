import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Creating the UserContext
export const UserContext = createContext({});

// Provider Component
// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Fetch user info when app loads
  useEffect(() => {
    axios
      .get("/profile", { withCredentials: true }) // Ensure credentials (cookies) are sent
      .then(({ data }) => {
        setUser(data); // Set user state with data from backend
      })
      .catch(() => {
        setUser(null); // Reset user on error (like expired session)
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
