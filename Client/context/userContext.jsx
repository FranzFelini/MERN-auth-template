import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create the context
export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

// UserContextProvider component
// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the user on app load
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/profile", { withCredentials: true });
        if (data && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
        setUser(null); // Reset user if there's an error
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
