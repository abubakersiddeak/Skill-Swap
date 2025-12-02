import React, { use, useState } from "react";

import { Menu, LogIn, LogOut, UserPlus } from "lucide-react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const { currentUser, signout } = use(AuthContext);

  const links = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold " : "text-gray-700 font-bold"
        }
        to="/"
      >
        Home{" "}
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          isActive ? "text-blue-500 font-bold " : "text-gray-700 font-bold"
        }
        to="/about"
      >
        About{" "}
      </NavLink>
      {currentUser ? (
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold " : "text-gray-700 font-bold"
          }
          to="/profile"
        >
          My Profile{" "}
        </NavLink>
      ) : null}
    </>
  );

  const handleLogout = () => {
    try {
      signout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold text-indigo-600 tracking-wider flex items-center cursor-pointer"
          >
            <span className="text-3xl mr-1">🤝</span> SkillSwap
          </button>
          <div className="hidden md:flex md:space-x-8 items-center">
            {links}
          </div>
          <div className="hidden md:flex md:space-x-8 items-center">
            <div className="ml-6 flex items-center space-x-3">
              {currentUser ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                    }}
                    className="relative"
                    onMouseEnter={() => setIsProfileHovered(true)}
                    onMouseLeave={() => setIsProfileHovered(false)}
                  >
                    <img
                      className="h-10 w-10 rounded-full object-cover border-2 border-indigo-500 cursor-pointer transition transform hover:scale-105"
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                    />
                    {isProfileHovered && (
                      <div className="absolute top-full mt-2 right-0 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-50 whitespace-nowrap">
                        <p className="text-sm font-semibold text-gray-900">
                          {currentUser.displayName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {currentUser.email}
                        </p>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg transition duration-150 shadow-md cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 rounded-lg transition duration-150 cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-150 shadow-md cursor-pointer"
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 py-2">
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col ">
            {links}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-100">
            {currentUser ? (
              <div className="flex items-center px-5">
                <div className="flex shrink-0">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-900">
                    {currentUser.displayName}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {currentUser.email}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex items-center space-x-1.5 px-3 py-1 text-sm font-medium text-white bg-black rounded-full transition duration-150"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex space-x-3 px-5">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 w-full px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 rounded-full transition duration-150"
                >
                  <LogIn className="w-4 h-4 inline-block mr-1" /> Login
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="flex-1 w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition duration-150"
                >
                  <UserPlus className="w-4 h-4 inline-block mr-1" /> Signup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
