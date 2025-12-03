import React from "react";
import { Link } from "react-router";
import { Home, AlertOctagon } from "lucide-react";

export default function ErrorPage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 overflow-hidden px-4">
      {/* Background Blobs (Using standard Tailwind animate-pulse for movement) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none animate-pulse delay-1000"></div>

      {/* Icon Decoration */}
      <div className="mb-6 text-primary-200 animate-bounce">
        <AlertOctagon size={80} />
      </div>

      {/* 404 Number */}
      <h1 className="text-[9rem] md:text-[13rem] leading-none font-extrabold text-transparent bg-clip-text bg-linear-to-b from-primary-400 to-primary-900 drop-shadow-sm select-none hover:scale-105 transition-transform duration-500 cursor-default">
        404
      </h1>

      {/* Main Heading */}
      <h2 className="text-3xl md:text-5xl font-bold text-primary-900 mt-2 mb-4 tracking-tight text-center">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-lg md:text-xl text-primary-600/80 text-center max-w-lg mb-10 leading-relaxed">
        Oops! The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="
          cursor-pointer
          inline-flex items-center gap-2
          px-8 py-4 
          text-lg font-bold text-white 
          bg-primary-600 hover:bg-primary-700 
          rounded-full shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 
          transform hover:-translate-y-1 hover:scale-105 
          transition-all duration-300
        "
      >
        <Home size={20} />
        Go Back Home
      </Link>
    </section>
  );
}
