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
  const {updateUser} = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Validate inputs
      if(!fullName){
        setError("Full name is required");
        return;
      }
      if(!validateEmail(email)){
        setError("Invalid email format");
        return;
      }
      if(!password){
        setError("Password is required");
        return;
      }
      if(password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      let profileImageUrl = "";
      
      // Handle profile image upload
      if(profilePic){
        try {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || "";
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          setError("Failed to upload profile image. Please try again.");
          return;
        }
      }

      // Attempt registration
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl
      });

      const {token} = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      } else {
        setError("Registration successful but no token received");
      }
    } catch (error) {
      console.error("Signup error:", error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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
        // The request was made but no response was received
        setError("No response from server. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Failed to connect to the server. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center ">
        <h3 className="text-2xl font-semibold text-black">Create an account</h3>
        <p className="text-sm text-slate-700 mt-[5px] mb-6">Join IntelliMock to create your account</p>
        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector  image={profilePic} setImage={setProfilePic}/>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button 
            type="submit" 
            className={`btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
          <p className="text-[13px] text-slate-800 mt-2">
            Already have an account?{" "}
            <button
              className="text-primary font-medium underline cursor-pointer"
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
