import { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

/**
 * Signup Component - Handles manual signup and Google OAuth Signup
 */
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;
  /**
   * Google Signup using Firebase + Register on your backend
   */

  const handleGoogleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      console.log(user);

      await axios.post(`${BASE_URL}/api/auth/register`, {
        name: user.displayName,
        email: user.email,
        password: user.uid, 
      });

      alert("Signup Successful, Please Login");
      navigate("/login"); 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  /**
   * Manual Signup with name, email, password
   */
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light px-4">
      <img src={assets.logo} alt="Logo" className="h-12 mb-6" />

      <h1 className="text-3xl font-semibold mb-4">Create Account</h1>

      {/* Signup Form */}
      <form
        className="flex flex-col gap-4 max-w-sm w-full"
        onSubmit={handleSignup}
      >
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <button className="bg-primary text-white py-2 rounded hover:bg-primary-dull">
          Sign Up
        </button>

        {/* Google Signup Button */}
        <button
          type="button"
          className="bg-primary text-white py-2 rounded hover:bg-primary-dull"
          onClick={handleGoogleSignup}
        >
          Sign Up with Google
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-primary cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
