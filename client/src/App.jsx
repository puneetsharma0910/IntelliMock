import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import UserProvider from "./contexts/UserContext";
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/interview-prep/:sessionId"
              element={<InterviewPrep />}
            />
          </Routes>

          <Toaster   
            position="top-right"
            toastOptions={{
              success: {
                theme: {
                            primary: "green",
                },
              },
            }}
          />
          <Analytics/>
        </div>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
