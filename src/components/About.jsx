import React from "react";
import { motion } from "framer-motion";
import { Award, Zap, Users, Sparkles } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Top-Rated Experts",
    description:
      "Access a curated network of verified professionals and industry leaders ready to share their expertise.",
    icon: Award,
    // Using Orange/Yellow as a complementary accent to the Primary Blue
    color: "bg-orange-50 text-orange-500",
  },
  {
    id: 2,
    title: "Seamless Learning",
    description:
      "Experience a smooth journey with instant booking, integrated video calls, and real-time feedback loops.",
    icon: Zap,
    // Using the Brand Primary Color here
    color: "bg-primary-50 text-primary-600",
  },
  {
    id: 3,
    title: "Community Driven",
    description:
      "Join a vibrant ecosystem of creators. Swap skills, collaborate on projects, and grow your network.",
    icon: Users,
    // Using Teal/Green as a complementary accent
    color: "bg-teal-50 text-teal-500",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
};

export default function About() {
  return (
    <section className="relative py-24 overflow-hidden bg-gray-50">
      {/* Background Elements (Theme Matched) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 shadow-sm text-primary-600 text-sm font-semibold mb-6"
          >
            <Sparkles size={16} />
            <span>Our Mission</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-primary-900 mb-6 tracking-tight"
          >
            Empowering Growth Through <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-primary-400">
              Knowledge Exchange
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-primary-700/80 leading-relaxed"
          >
            Skillswap is the futuristic bridge between curiosity and mastery. We
            don't just offer courses; we create connections. Whether you want to
            teach or learn, we provide the tools to unlock potential.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="
                  bg-white/80 backdrop-blur-xl border border-primary-100 rounded-3xl p-8 
                  shadow-lg shadow-primary-900/5 
                  hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-300
                  transition-all duration-300 group cursor-default
                "
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
