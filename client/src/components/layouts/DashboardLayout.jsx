import React, { useContext } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../../contexts/UserContext";

const DashboardLayout = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  console.log("DashboardLayout - User:", user);
  console.log("DashboardLayout - Loading:", loading);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!user) {
    console.log("No user found, redirecting to login...");
    return null;
  }

  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
