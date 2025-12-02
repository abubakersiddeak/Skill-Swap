import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
const steps = [
  {
    id: 1,
    title: "Browse Skills",
    description:
      "Explore a wide variety of skills offered by top providers in your area of interest.",
  },
  {
    id: 2,
    title: "Book a Session",
    description:
      "Select your preferred skill provider, check their rating, and book a convenient slot.",
  },
  {
    id: 3,
    title: "Learn & Grow",
    description:
      "Attend sessions, interact with experts, and enhance your skills seamlessly.",
  },
];

export default function WorkGuide() {
  return (
    <section className="relative py-20 bg-custom-wave rounded-2xl">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer border border-blue-400/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white mb-4 shadow-lg">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 neon-text">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Neon Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    </section>
  );
}
