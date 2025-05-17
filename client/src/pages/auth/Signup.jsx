
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { validateEmail } from "../utils/helper";
import { UserContext } from "../../contexts/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import uploadImage from "../utils/uploadImage";

const Signup = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!fullName) {
        setError("Full name is required");
        setIsLoading(false);
        return;
      }
      if (!validateEmail(email)) {
        setError("Invalid email format");
        setIsLoading(false);
        return;
      }
      if (!password) {
        setError("Password is required");
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        setIsLoading(false);
        return;
      }

      let profileImageUrl = "";

      if (profilePic) {
        try {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || "";
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          setError("Failed to upload profile image. Please try again.");
          setIsLoading(false);
          return;
        }
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      } else {
        setError("Registration successful but no token received");
      }
    } catch (error) {
      console.error("Signup error:", error);

      if (error.response) {
        if (error.response.status === 409) {
          setError("An account with this email already exists");
        } else if (error.response.status === 400) {
          setError(error.response.data.message || "Invalid input data");
        } else if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        setError(
          "No response from server. Please check your internet connection."
        );
      } else {
        setError("Failed to connect to the server. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[95vw] max-w-[400px] md:w-[35vw] p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex flex-col justify-center border border-amber-100/50 glass-card animate-fade-in">
      <h3 className="text-2xl font-bold mb-1 text-center animate-text-shine bg-gradient-to-r from-[#FF9324] via-[#e99a4b] to-[#FF9324] bg-clip-text text-transparent">
        Create an account
      </h3>
      <p className="text-xs text-amber-600 mb-3 text-center">
        Join IntelliMock to create your account
      </p>
      <form onSubmit={handleSignup} className="space-y-3">
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid gap-2">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="rounded-md border border-amber-300 focus:ring-1 focus:ring-amber-400 focus:border-amber-500 text-lg"
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="rounded-md border border-amber-300 focus:ring-1 focus:ring-amber-400 focus:border-amber-500 text-lg"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="rounded-md border border-amber-300 focus:ring-1 focus:ring-amber-400 focus:border-amber-500 text-lg"
          />
        </div>
        {error && (
          <p className="text-red-600 text-xs font-medium text-center">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-full text-white font-semibold text-sm transition duration-300 cta-glow ${
            isLoading
              ? "bg-amber-500/70 cursor-not-allowed"
              : "bg-gradient-to-r from-[#FF9324] to-[#e99a4b] hover:scale-105"
          }`}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </form>
      <p className="mt-4 text-center text-amber-900 text-xs">
        Already have an account?{" "}
        <button
          className="text-amber-600 font-medium underline hover:text-amber-700 cursor-pointer"
          onClick={() => setCurrentPage("login")}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
