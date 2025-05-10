import React from "react";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuSparkles } from "react-icons/lu";
import ai1 from "../../assets/ai1.jpg";
import Modal from "../../components/loader/Modal";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    setOpenAuthModal(true);
  };

  return (
    <>
      {/* Hero Section with Background */}
      <div className="w-full min-h-screen bg-gradient-to-br from-[#FFFCEF] to-[#FFF8E0]">
        {/* Decorative Blur */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-200/30 blur-[80px] pointer-events-none rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-100/30 blur-[65px] pointer-events-none rounded-full"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-[200px] relative z-10">
          {/* Header/Navigation */}
          <header className="flex justify-between items-center mb-20 py-4">
            <div className="text-xl text-black font-bold flex items-center">
              <span className="text-[#FF9324] mr-2">
                <LuSparkles className="inline-block" size={20} />
              </span>
              IntelliMock
            </div>

            <button
              className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-8 py-3 rounded-full hover:shadow-md hover:shadow-amber-200/50 transition-all duration-300 cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Login/Signup
            </button>
          </header>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-3/5 md:pr-8">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-amber-100/80 text-amber-800 px-4 py-2 rounded-full text-sm font-medium border border-amber-200/50 shadow-sm">
                  <LuSparkles size={16} />
                  <span>AI Powered Interview Assistance</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9324] to-[#e99a4b]">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>

              <p className="text-lg text-gray-700 mb-10 max-w-xl leading-relaxed">
                Get personalized interview preparation with our AI-powered
                platform. Practice real interview scenarios and receive instant
                feedback to improve your skills.
              </p>

              <button
                onClick={handleCTA}
                className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white font-medium px-10 py-4 rounded-full shadow-lg shadow-amber-200/30 hover:shadow-xl hover:shadow-amber-300/40 transition-all duration-300 text-lg"
              >
                Get Started
              </button>
            </div>

            <div className="w-full md:w-2/5 hidden md:block">
              {/* Placeholder for a hero illustration if needed */}
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-orange-200/30 rounded-full blur-sm"></div>
                <div className="absolute -bottom-8 -right-5 w-16 h-16 bg-amber-300/40 rounded-full blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full relative z-10 mb-36">
        <section className="flex items-center justify-center -mt-36">
          <img
            className="w-[85vw] max-w-[1400px] rounded-xl shadow-xl shadow-amber-100/30 border border-amber-100/20"
            src={ai1}
            alt="AI Interview Preparation Platform"
          />
        </section>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gradient-to-b from-[#FFFCEF] to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <section className="mt-5">
            <h2 className="text-3xl font-semibold text-center mb-4">
              Features that make you shine
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
              Our platform is designed to help you prepare for interviews with
              confidence and precision.
            </p>

            <div className="flex flex-col items-center gap-10">
              {/* Top row of feature cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6 lg:gap-8">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFFEF8] p-8 rounded-xl shadow-md hover:shadow-xl shadow-amber-100/60 transition-all duration-300 border border-amber-100/50 group hover:-translate-y-1"
                  >
                    <div className="bg-amber-100/60 w-12 h-12 rounded-lg flex items-center justify-center mb-5 group-hover:bg-amber-200/70 transition-colors duration-300">
                      <LuSparkles className="text-amber-700" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom row of feature cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFFEF8] p-8 rounded-xl shadow-md hover:shadow-xl shadow-amber-100/60 transition-all duration-300 border border-amber-100/50 group hover:-translate-y-1"
                  >
                    <div className="bg-amber-100/60 w-12 h-12 rounded-lg flex items-center justify-center mb-5 group-hover:bg-amber-200/70 transition-colors duration-300">
                      <LuSparkles className="text-amber-700" size={20} />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Simple Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="font-bold flex items-center justify-center mb-4">
            <span className="text-[#FF9324] mr-2">
              <LuSparkles className="inline-block" size={18} />
            </span>
            IntelliMock
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} IntelliMock. All rights reserved.
          </p>
        </div>
      </footer>

      {/* <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal> */}
      <Modal
  isOpen={openAuthModal}
  onClose={() => {
    setOpenAuthModal(false);
    setCurrentPage("login");
  }}
  title={currentPage === "login" ? "Login" : "Sign Up"}
  // Remove hideHeader
>
  {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
  {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
</Modal>
    </>
  );
};

export default LandingPage;
