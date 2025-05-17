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
        setError("Failed to  connect to the server. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-amber-50 rounded-lg shadow-md">
      <h3 className="text-3xl font-extrabold text-amber-900 mb-2 text-center">
        Create an account
      </h3>
      <p className="text-sm text-amber-600 mb-6 text-center">
        Join IntelliMock to create your account
      </p>
      <form onSubmit={handleSignup} className="space-y-5">
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid gap-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            className="rounded-md border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="rounded-md border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="rounded-md border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm font-medium text-center">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </form>
      <p className="mt-6 text-center text-amber-900 text-sm">
        Already have an account?{" "}
        <button
          className="text-amber-600 font-medium underline hover:text-amber-700 cursor-pointer"
          onClick={() => setCurrentPage("login")}
        >
          Login
        </button>
      </p>
      console.log("hi");
    </div>
  );
};

export default Signup;
