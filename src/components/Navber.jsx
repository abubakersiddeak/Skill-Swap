import React, { use, useState } from "react";
import { Menu, LogIn, LogOut, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import spLogo from "../assets/Gemini_Generated_Image_11uq1011uq1011uq.png";
export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const { currentUser, signout } = use(AuthContext);

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "All Skills", path: "/all-skills" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Support", path: "/support" },
  ];

  const handleLogout = async () => {
    try {
      await signout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-primary-600 sticky top-0 z-50 shadow-lg">
      <div className="max-width mx-auto  ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 w-60  cursor-pointer"
          >
            <img
              src={spLogo}
              alt="SkillSwap"
              className="h-8 w-auto rounded-lg"
            />
            <span className="text-xl font-bold text-white">SkillSwap</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 ">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? "bg-white text-primary-600"
                      : "text-white hover:bg-primary-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2 justify-end  w-60 ">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {/* Profile Picture with Hover Info */}
                <div className="relative">
                  <Link
                    to={"/profile"}
                    className="cursor-pointer"
                    onMouseEnter={() => setShowProfileInfo(true)}
                    onMouseLeave={() => setShowProfileInfo(false)}
                  >
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover border-2 border-white hover:border-primary-300 transition-all duration-200"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary-400 flex items-center justify-center border-2 border-white hover:border-primary-300 transition-all duration-200">
                        <span className="text-white text-lg font-medium">
                          {currentUser.displayName?.charAt(0) ||
                            currentUser.email?.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Hover Information Card */}
                    {showProfileInfo && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 px-3 z-50 border border-gray-200">
                        <div className="space-y-2">
                          <div className="border-b border-gray-100 pb-2">
                            <p className="text-sm font-semibold text-gray-800">
                              {currentUser.displayName || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {currentUser.email}
                            </p>
                          </div>
                          <div className="text-xs text-gray-500">
                            <p>
                              Joined:{" "}
                              {new Date(
                                currentUser.metadata.creationTime
                              ).toLocaleDateString()}
                            </p>
                            <p>
                              Last Login:{" "}
                              {new Date(
                                currentUser.metadata.lastSignInTime
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => navigate("/profile")}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-primary-700 hover:bg-primary-800 rounded-md transition duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center ">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-white hover:bg-primary-500 rounded-md transition duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-primary-600 bg-white hover:bg-gray-100 rounded-md transition duration-200 flex items-center space-x-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:bg-primary-500 cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-primary-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                    isActive
                      ? "bg-primary-600 text-white"
                      : "text-gray-700 hover:bg-primary-50"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Auth Section */}
            {currentUser ? (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center px-3 py-2 space-x-3">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover border-2 border-primary-600"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-400 flex items-center justify-center border-2 border-primary-600">
                      <span className="text-white text-lg font-medium">
                        {currentUser.displayName?.charAt(0) ||
                          currentUser.email?.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {currentUser.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-2 w-full px-3 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-primary-600 border border-primary-600 rounded-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-white bg-primary-600 rounded-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
