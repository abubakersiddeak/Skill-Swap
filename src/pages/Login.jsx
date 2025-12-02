import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { use, useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import googelLogo from "../assets/icons8-google-logo-48.png";
export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { loginUser, signupWithGoogle } = use(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("example@gmail.com");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    try {
      loginUser(email, password)
        .then(() => {
          setLoading(false);
          navigate(from, { replace: true });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast("Invalide Password or Gmail");
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleGoogeButton = () => {
    try {
      signupWithGoogle()
        .then(() => {
          navigate(from, { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-wave px-4">
      <div className="login-card w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => {
                setShowPass(!showPass);
              }}
              className="absolute right-3 top-8 cursor-pointer"
            >
              {showPass ? <Eye /> : <EyeOff />}
            </button>
          </div>

          <div className="text-right">
            <Link
              to={`/forgot-password/${email}`}
              className="text-sm text-blue-600 hover:underline hover:text-blue-700 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
          >
            {loading ? (
              <span className="loading loading-spinner text-neutral"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <button
          onClick={handleGoogeButton}
          className="btn w-full  text-black font-semibold transition-all mt-4"
        >
          <span>
            <img className="h-7" src={googelLogo} alt="" />
          </span>{" "}
          <span>Google</span>
        </button>

        <div className="divider text-gray-400">or</div>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
