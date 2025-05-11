import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../pages/utils/axiosInstance";
import { API_PATHS } from "../pages/utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) return;
    const accesstoken = localStorage.getItem("token");
    if (!accesstoken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.log("user not found", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  };
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");

  };
  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
