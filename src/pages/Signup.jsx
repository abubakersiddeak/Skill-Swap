import { Eye, EyeOff } from "lucide-react";
import React, { useState, use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import googelLogo from "../assets/icons8-google-logo-48.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const { SiginupUser, signupWithGoogle, ubdateUser } = use(AuthContext);
  const [errorMassage, setErrorMassage] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validatePassword(formData.password)) {
      setLoading(false);
      return;
    }
    try {
      const { name, email, password, photoURL } = formData;

      const userCredential = await SiginupUser(email, password);
      const user = userCredential.user;

      await ubdateUser(
        user,
        name,
        photoURL || "https://via.placeholder.com/150"
      );

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMassage(error.message);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const result = await signupWithGoogle();
      const user = result.user;

      if (!user.displayName || !user.photoURL) {
        await ubdateUser(
          user,
          user.displayName || "User",
          user.photoURL || "https://via.placeholder.com/150"
        );
      }

      toast.success(`Signed in as ${user.displayName}`);
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrorMassage(err.message);
      toast.error(err.message || "Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-wave px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Enter your photo URL"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type={showPass ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-8 cursor-pointer"
            >
              {showPass ? <Eye /> : <EyeOff />}
            </button>
          </div>
          {passwordError && <p className="text-red-500 p-4">{passwordError}</p>}

          {errorMassage && <p className="text-red-500 p-4">{errorMassage}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all rounded-md"
          >
            {loading ? (
              <span className="loading loading-spinner text-neutral"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="btn w-full text-black font-semibold transition-all mt-4 flex items-center justify-center gap-2"
        >
          <img className="h-7" src={googelLogo} alt="Google Logo" /> Google
        </button>

        <div className="divider text-gray-400">or</div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
