import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../../contexts/UserContext";

const Login = ({ setCurrentPage }) => {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
 <div className="w-[90vw] md:w-[33vw] p-8 bg-amber-50 rounded-lg shadow-md flex flex-col justify-center">
  <h3 className="text-3xl font-extrabold text-amber-900 mb-1">Welcome Back</h3>
  <p className="text-sm text-amber-700 mb-8">
    Please enter your details to log in
  </p>
  <form onSubmit={handleLogin} className="space-y-6">
    <Input
      onChange={(e) => setEmail(e.target.value)}
      label="Email Address"
      value={email}
      placeholder="Enter your email"
      type="email"
      required
      className="border-amber-300 focus:border-amber-600"
    />
    <Input
      onChange={(e) => setPassword(e.target.value)}
      label="Password"
      value={password}
      placeholder="Min 8 characters"
      type="password"
      required
      className="border-amber-300 focus:border-amber-600"
    />
    {error && <p className="text-red-600 text-sm">{error}</p>}
    <button
      type="submit"
      className={`w-full py-3 rounded-md text-white font-semibold text-lg transition duration-300 ${
        isLoading
          ? "bg-amber-500/70 cursor-not-allowed"
          : "bg-amber-600 hover:bg-amber-700"
      }`}
      disabled={isLoading}
    >
      {isLoading ? "Logging in..." : "Login"}
    </button>
  </form>
  <p className="text-center text-amber-900 text-sm mt-6">
    Don't have an account?{" "}
    <button
      className="text-amber-600 font-medium underline hover:text-amber-700 transition duration-200"
      onClick={() => setCurrentPage("signup")}
      type="button"
    >
      Sign up
    </button>
  </p>
</div>

  );
};

export default Login;
