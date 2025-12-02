import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative bg-linear-to-b from-blue-50 via-blue-100 to-blue-200 py-20">
      {/* Background floating shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
          About Skillswap
        </h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Skillswap is a futuristic platform where learners and skill providers
          meet. Swap your knowledge, enhance your skills, and discover
          opportunities like never before. Our mission is to empower creators
          and learners in a seamless, innovative environment.
        </p>

        {/* Features cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">Top Providers</h3>
            <p className="text-gray-600">
              Access top-rated skill providers and learn from the best in the
              industry.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">Seamless Learning</h3>
            <p className="text-gray-600">
              Enjoy smooth, interactive lessons with real-time updates and
              flexible slots.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-600">
              Join a vibrant community of learners and creators, exchange
              skills, and grow together.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
