
import React from "react";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { LuSparkles } from "react-icons/lu";
import ai1 from "../../assets/ai1.jpg";
import Modal from "../../components/loader/Modal";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import { UserContext } from "../../contexts/UserContext";
import ProfileInfoCard from "../../components/cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    // Remove the user check and navigation
    setOpenAuthModal(true);
  };
 return (
    <>
      <div className="relative w-full min-h-screen bg-gradient-to-br from-[#FFFDF4] via-[#FFFBEB] to-[#FFF3D6] overflow-x-hidden animate-gradient-move">
        {/* Decorative Blurs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-100/20 blur-[80px] pointer-events-none rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-50/20 blur-[65px] pointer-events-none rounded-full"></div>

        <div className="container mx-auto px-6 lg:px-12 pt-10 pb-[200px] relative z-10 max-w-7xl">
          {/* Header */}
          <header className="flex justify-between items-center mb-20 py-6">
            <div className="text-2xl font-extrabold text-black flex items-center gap-2 tracking-wide select-none">
              <LuSparkles className="text-[#FFB459]" size={26} />
              IntelliMock
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#FFB459] to-[#FFC887] text-white text-base font-semibold px-10 py-3 rounded-full shadow-lg hover:shadow-amber-300 transition-shadow duration-300"
                onClick={() => setOpenAuthModal(true)}
                aria-label="Login or Signup"
              >
                Login / Signup
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 animate-fade-in">
            <div className="w-full md:w-3/5 md:pr-12">
              <div className="inline-flex items-center gap-3 bg-amber-200/60 text-amber-800 px-5 py-3 rounded-full text-sm font-semibold border border-amber-300 shadow-md shadow-amber-300">
                <LuSparkles size={18} />
                AI Powered Interview Assistance
              </div>

              <h1 className="mt-8 mb-10 text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                Ace Interviews with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB459] to-[#FFC887]">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>

              <p className="text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed mb-12">
                Get personalized interview preparation with our AI-powered platform. Practice
                real interview scenarios and receive instant feedback to improve your skills.
              </p>

              <button
                onClick={handleCTA}
                className="inline-block bg-gradient-to-r from-[#FFB459] to-[#FFC887] text-white font-semibold text-lg px-12 py-4 rounded-full shadow-lg hover:shadow-amber-300 transition-all duration-300 ring-2 ring-[#FFB459]/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#FFB459]/40"
                aria-label="Get Started"
              >
                Get Started
              </button>
            </div>

            <div className="hidden md:block md:w-2/5 relative">
              <img
                src={ai1}
                alt="AI Interview Preparation"
                className="rounded-xl shadow-2xl shadow-amber-300 border border-amber-200"
              />
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-amber-200/20 rounded-full blur-md animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-amber-300/30 rounded-full blur-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-[#FFFDF4] to-white py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <h2 className="text-4xl font-extrabold text-center mb-6 text-gray-900">
            Features that make you shine
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 text-lg">
            Our platform is designed to help you prepare for interviews with confidence and precision.
          </p>

          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            {APP_FEATURES.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-md hover:shadow-2xl shadow-amber-100/50 transition-transform duration-300 transform hover:-translate-y-2 border border-amber-100/50 cursor-pointer glass-card"
              >
                <div className="flex items-center justify-center mb-6 w-14 h-14 rounded-lg bg-amber-200/60 group-hover:bg-amber-300 transition-colors duration-300">
                  <LuSparkles className="text-amber-700" size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-1 md:grid-cols-2">
            {APP_FEATURES.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-md hover:shadow-2xl shadow-amber-100/50 transition-transform duration-300 transform hover:-translate-y-2 border border-amber-100/50 cursor-pointer glass-card"
              >
                <div className="flex items-center justify-center mb-6 w-14 h-14 rounded-lg bg-amber-200/60 group-hover:bg-amber-300 transition-colors duration-300">
                  <LuSparkles className="text-amber-700" size={26} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 max-w-7xl text-center select-none">
          <div className="font-extrabold flex items-center justify-center mb-4 gap-2 text-gray-900">
            <LuSparkles className="text-[#FFB459]" size={18} />
            IntelliMock
          </div>
          <p className="text-gray-500 text-sm select-text">
            © {new Date().getFullYear()} IntelliMock. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        title={currentPage === "login" ? "Login" : "Sign Up"}
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
      </Modal>

      {/* Tailwind custom animation utilities */}
      <style>
        {`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-move {
            background-size: 200% 200%;
            animation: gradient-move 8s ease-in-out infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: none; }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}
      </style>
    </>
  );
};

export default LandingPage;