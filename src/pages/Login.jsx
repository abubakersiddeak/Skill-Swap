import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import googleLogo from "../assets/icons8-google-logo-48.png";

export default function Login() {
  const { loginUser, signupWithGoogle } = useContext(AuthContext);

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formEmail = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);

    try {
      await loginUser(formEmail, password);
      setLoading(false);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Invalid Password or Email");
    }
  };

  const handleGoogleButton = async () => {
    try {
      await signupWithGoogle();
      toast.success("Signed in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-In Failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden py-12 px-4">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-primary-900/5 border border-primary-100 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 text-primary-600 mb-4">
              <LogIn size={24} />
            </div>
            <h1 className="text-3xl font-extrabold text-primary-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
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
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                  required
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
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-primary-600 transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right mt-2">
                <Link
                  // Fix: Prevents broken URL if email is empty
                  to={
                    email
                      ? `/forgot-password/${email}`
                      : "/forgot-password/unknown"
                  }
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
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
                "Sign In"
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
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleButton}
            className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-sm hover:shadow-md"
          >
            <img className="h-5 w-5" src={googleLogo} alt="Google" />
            <span>Google</span>
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary-600 font-bold hover:underline hover:text-primary-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
