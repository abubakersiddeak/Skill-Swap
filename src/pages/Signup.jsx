import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Camera,
  Lock,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import googelLogo from "../assets/icons8-google-logo-48.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  // Switched to useContext for standard React compatibility
  const { SiginupUser, signupWithGoogle, ubdateUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(null);
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
    setErrorMessage(null);

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
      setErrorMessage(error.message);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setErrorMessage(null);
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

      toast.success(`Welcome, ${user.displayName}!`);
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
      toast.error("Google sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden py-12 px-4">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="w-full max-w-xl relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-primary-900/5 border border-primary-100 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mb-4">
              <UserPlus size={24} />
            </div>
            <h1 className="text-3xl font-extrabold text-primary-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Join our community of learners and experts today.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary-500 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary-500 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                  required
                />
              </div>
            </div>

            {/* Photo URL Input */}
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2 ml-1">
                Photo URL{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative group">
                <Camera
                  className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary-500 transition-colors"
                  size={18}
                />
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-primary-700 mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary-500 transition-colors"
                  size={18}
                />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={`w-full pl-12 pr-12 py-3 rounded-xl bg-gray-50 border focus:bg-white focus:ring-2 focus:border-transparent outline-none transition-all font-medium text-gray-700 ${
                    passwordError
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-primary-500"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-primary-600 transition-colors cursor-pointer"
                >
                  {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {/* Password Validation Error */}
              {passwordError && (
                <div className="flex items-start gap-1 mt-2 text-red-500 text-xs">
                  <AlertCircle size={12} className="mt-0.5" />
                  <span>{passwordError}</span>
                </div>
              )}
            </div>

            {/* General Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-xl flex items-center gap-2">
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary-600/30 
                flex items-center justify-center transition-all duration-300
                ${
                  loading
                    ? "bg-primary-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700 hover:shadow-primary-600/40 hover:-translate-y-1 cursor-pointer"
                }
              `}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 font-medium">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-sm hover:shadow-md"
          >
            <img className="h-5 w-5" src={googelLogo} alt="Google" />
            <span>Google</span>
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 font-bold hover:underline hover:text-primary-700"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
