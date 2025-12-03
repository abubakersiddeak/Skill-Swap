import React from "react";
import { motion } from "framer-motion";
import { Search, CalendarCheck, Zap, ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse Skills",
    description:
      "Explore a wide variety of skills offered by top-rated providers tailored to your specific needs.",
    icon: Search,
  },
  {
    id: 2,
    title: "Book a Session",
    description:
      "Select your preferred expert, review their schedule, and secure a convenient time slot instantly.",
    icon: CalendarCheck,
  },
  {
    id: 3,
    title: "Learn & Grow",
    description:
      "Connect via video or in-person, master new skills, and achieve your personal goals.",
    icon: Zap,
  },
];

export default function WorkGuide() {
  return (
    <section className="relative py-10 overflow-hidden  max-width">
      {/* Background Blobs (Subtler to match theme) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 translate-x-1/2 translate-y-1/2"></div>

      <div className=" mx-auto w-full   relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            How It Works
          </h2>
          <p className="text-primary-700 text-lg">
            Get started in three simple steps. We make it easy to find the right
            expert and start learning.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative ">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 border-t-2 border-dashed border-primary-200 -z-10" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12  ">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  className="
                    group relative bg-white/80 backdrop-blur-md 
                    border border-primary-100 rounded-2xl p-8 
                    shadow-sm hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-300
                    transition-all duration-300 flex flex-col items-center text-center
                  "
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.5,
                    type: "spring",
                  }}
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 bg-white border border-primary-100 text-primary-600 text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                    Step 0{step.id}
                  </div>

                  {/* Icon Container */}
                  <div className="mb-6 relative">
                    <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary-100">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    {/* Mobile Connector Arrow (only visible on mobile between items) */}
                    {index !== steps.length - 1 && (
                      <div className="md:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 text-primary-200">
                        <ArrowRight className="rotate-90 w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
