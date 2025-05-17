// import React, { useContext } from "react";
// import Navbar from "./Navbar";
// import { UserContext } from "../../contexts/UserContext";

// const DashboardLayout = ({ children }) => {
//   const { user, loading } = useContext(UserContext);
//   console.log("DashboardLayout - User:", user);
//   console.log("DashboardLayout - Loading:", loading);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     console.log("No user found, redirecting to login...");
//     return null;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div>{children}</div>
//     </div>
//   );
// };

// export default DashboardLayout;



import React, { useContext } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../../contexts/UserContext";

const DashboardLayout = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-orange-400 shadow-md"></div>
      </div>
    );
  }

  if (!user) {
    // Optionally, redirect to login or show a message
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <Navbar />
      <main className="pt-4 md:pt-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;