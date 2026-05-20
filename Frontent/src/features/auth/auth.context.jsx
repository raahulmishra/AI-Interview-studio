import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "./services/auth.api.js";

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); //  start true

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getCurrentUser();

        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log("Not logged in");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getAndSetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
