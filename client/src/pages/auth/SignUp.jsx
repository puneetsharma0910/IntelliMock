import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { validateEmail } from "../utils/helper";

const Signup = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilepic, setProfilepic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    let profilepicUrl = "";
    if(!fullName){
      setError("Full name is required")
      return;
    }
    if(!validateEmail(email)){
      setError("Invalid email")
      return;
    }
    if(!password){
      setError("Password is required")
      return;
    }
    setError("");
    try {
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, Please try again later");
      }
    }
    
    
  };
  return (
    <>
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center ">
        <h3 className="text-2xl font-semibold text-black">Create an account</h3>
        <p className="text-sm text-slate-700 mt-[5px] mb-6">Join IntelliMock to create your account</p>
        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector  image={profilepic} setImage={setProfilepic}/>
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
          <button type="submit" className="btn-primary">
            Sign up
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
