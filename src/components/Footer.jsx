import React from "react";
import splogo from "../assets/Gemini_Generated_Image_11uq1011uq1011uq.png";
import { Link } from "react-router";

export default function Footer() {
  return (
    // Set background to primary-700 (Dark Blue), border-t to primary-100 (Very Light Blue)
    <footer className="bg-primary-700 border-t border-primary-100 pt-16 pb-8 text-white">
      {/* Container ensures responsiveness and centering */}
      <div className="container mx-auto px-4 flex flex-col items-center text-center max-w-7xl">
        {/* Brand / Logo Area */}
        <div className="mb-10  flex flex-col justify-center items-center">
          <div className="items-center">
            {" "}
            <Link
              to={"/"}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img
                src={splogo}
                alt="SkillSwap"
                className="h-8 w-auto rounded-lg"
              />
              <span className="text-3xl font-bold text-white">SkillSwap</span>
            </Link>
          </div>
          <p className="text-primary-100 text-base mt-2 max-w-sm mx-auto">
            Connecting experts with learners to foster growth and community.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 font-medium text-primary-200">
          <Link
            to={"/about"}
            className="hover:text-primary-400 transition-colors duration-300"
          >
            About us
          </Link>
          <Link
            to={"/contact"}
            className="hover:text-primary-400 transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to={"/support"}
            className="hover:text-primary-400 transition-colors duration-300"
          >
            Support
          </Link>
        </nav>

        {/* Social Media Icons */}
        <nav className="mb-10">
          <div className="flex gap-6">
            {/* Facebook Icon: Primary-600 background for contrast, White text, Primary-400 hover */}
            <a
              href="https://www.facebook.com/abubakar.siddeak/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-12 h-12 flex items-center justify-center rounded-full 
                bg-primary-600 text-white 
                hover:bg-primary-400 hover:scale-110 hover:shadow-xl hover:shadow-primary-500/50
                transition-all duration-300 cursor-pointer
              "
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.407.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.407 24 22.674V1.326C24 .593 23.406 0 22.675 0z" />
              </svg>
            </a>

            {/* Github Icon: Primary-600 background, Gray-800 hover (maintaining original intent) */}
            <a
              href="https://github.com/abubakersiddeak"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-12 h-12 flex items-center justify-center rounded-full 
                bg-primary-600 text-white 
                hover:bg-gray-800 hover:scale-110 hover:shadow-xl hover:shadow-gray-500/50
                transition-all duration-300 cursor-pointer
              "
              aria-label="Github"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.776.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.931 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.48 11.48 0 0 1 3.003-.404 11.5 11.5 0 0 1 3.003.404c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.84 1.236 1.912 1.236 3.222 0 4.61-2.803 5.628-5.475 5.922.429.37.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>

            {/* LinkedIn Icon: Primary-600 background, LinkedIn blue hover */}
            <a
              href="https://www.linkedin.com/in/abubaker-siddik-zisan/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-12 h-12 flex items-center justify-center rounded-full 
                bg-primary-600 text-white 
                hover:bg-[#0077b5] hover:scale-110 hover:shadow-xl hover:shadow-blue-500/50
                transition-all duration-300 cursor-pointer
              "
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.77 24h20.46c.978 0 1.77-.773 1.77-1.729V1.729C24 .774 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.633a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.123zm15.112 12.819h-3.558v-5.591c0-1.332-.026-3.048-1.856-3.048-1.857 0-2.14 1.448-2.14 2.944v5.695h-3.558V9h3.417v1.561h.048c.476-.9 1.637-1.85 3.367-1.85 3.597 0 4.266 2.368 4.266 5.448v6.293z" />
              </svg>
            </a>
          </div>
        </nav>

        {/* Copyright & Border */}
        <div className="border-t border-primary-200 w-full pt-8 mt-2">
          <p className="text-primary-100 text-sm">
            Copyright &copy; {new Date().getFullYear()} - All rights reserved by{" "}
            <span className="text-primary-400 font-semibold">
              SkillSwap LTD
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
