import { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

/**
 * Login Component - Handles user or owner login functionality
 */
const Login = () => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  /**
   * Handle form submit for Login
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log(res.data);

      // Store user details and token in localStorage
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);

      alert(res.data.message);

      // Navigate based on user role
      if (res.data.user.role === "owner") {
        navigate("/owner");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light px-4">
      {/* App Logo */}
      <img src={assets.logo} alt="Logo" className="h-12 mb-6" />

      {/* Page Title */}
      <h1 className="text-3xl font-semibold mb-4">Login</h1>

      {/* Login Form */}
      <form
        className="flex flex-col gap-4 max-w-sm w-full"
        onSubmit={handleLogin}
      >
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Submit Button */}
        <button className="bg-primary text-white py-2 rounded hover:bg-primary-dull">
          Login
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="mt-4 text-gray-600">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-primary cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
