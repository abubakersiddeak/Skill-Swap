import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import { Mail, KeyRound, ArrowLeft, Send } from "lucide-react";

export default function ForgotPassword() {
  const { resetPassword } = useContext(AuthContext);
  const { email } = useParams(); // Get email from URL if available

  const [emailInput, setEmailInput] = useState(
    email === "unknown" ? "" : email || ""
  );
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(emailInput);
      toast.success("Reset link sent! Check your inbox.");
      // Optional: Open Gmail in new tab for convenience
      setTimeout(() => {
        window.open("https://mail.google.com/", "_blank");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
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
              <KeyRound size={24} />
            </div>
            <h1 className="text-3xl font-extrabold text-primary-900 tracking-tight">
              Forgot Password?
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              No worries! Enter your email and we'll send you a reset
              instructions.
            </p>
          </div>

          <form onSubmit={handleReset} className="space-y-6">
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
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary-600/30 
                flex items-center justify-center gap-2 transition-all duration-300
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
                <>
                  Reset Password <Send size={18} />
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
