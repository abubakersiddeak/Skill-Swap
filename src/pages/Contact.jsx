import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background Decorations - Responsive */}
      <div className="absolute top-0 left-0 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-primary-100/40 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-primary-200/40 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Responsive */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-14 lg:mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-primary-100 shadow-sm text-primary-600 text-xs sm:text-sm font-semibold mb-4 sm:mb-5 md:mb-6">
            <MessageSquare size={14} className="sm:w-4 sm:h-4" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            We'd Love to Hear From You
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-700 leading-relaxed">
            Have a question about a skill? Want to become a provider? Or just
            want to say hello? Drop us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12 max-w-7xl mx-auto">
          {/* Left Column: Contact Info Cards - Responsive */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-5 md:space-y-6">
            {/* Card 1: Email */}
            <div className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-50 hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-primary-50 rounded-lg sm:rounded-xl flex items-center justify-center text-primary-600 mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <Mail size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-900 mb-2">
                Email Us
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">
                Our friendly team is here to help.
              </p>
              <a
                href="mailto:support@skillswap.com"
                className="text-sm sm:text-base text-primary-600 font-semibold hover:underline break-all"
              >
                support@skillswap.com
              </a>
            </div>

            {/* Card 2: Office */}
            <div className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-50 hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-primary-50 rounded-lg sm:rounded-xl flex items-center justify-center text-primary-600 mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-900 mb-2">
                Visit Us
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">
                Come say hello at our office HQ.
              </p>
              <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">
                123 Innovation Drive,
                <br />
                Tech City, TC 90210
              </p>
            </div>

            {/* Card 3: Phone */}
            <div className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-50 hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-primary-50 rounded-lg sm:rounded-xl flex items-center justify-center text-primary-600 mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                <Phone size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-900 mb-2">
                Call Us
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">
                Mon-Fri from 8am to 5pm.
              </p>
              <a
                href="tel:+15550001234"
                className="text-sm sm:text-base text-gray-800 font-medium hover:text-primary-600 transition-colors"
              >
                +1 (555) 000-1234
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form - Responsive */}
          <div className="lg:col-span-2">
            <div className="bg-white flex flex-col justify-between rounded-2xl sm:rounded-3xl shadow-xl shadow-primary-900/5 border border-primary-100 p-5 sm:p-6 md:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-900 mb-5 sm:mb-6 md:mb-8">
                Send us a Message
              </h3>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5 md:space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-bold text-primary-700 mb-1.5 sm:mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-bold text-primary-700 mb-1.5 sm:mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs sm:text-sm font-bold text-primary-700 mb-1.5 sm:mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-bold text-primary-700 mb-1.5 sm:mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none placeholder-gray-400 text-gray-700 min-h-[120px] sm:min-h-[140px] md:min-h-40"
                  ></textarea>
                </div>

                {/* Submit Button - Responsive */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl text-white font-bold text-base sm:text-lg shadow-lg shadow-primary-600/30 
                    flex items-center justify-center gap-2 transition-all duration-300
                    ${
                      isSubmitting
                        ? "bg-primary-400 cursor-not-allowed"
                        : "bg-primary-600 hover:bg-primary-700 hover:shadow-primary-600/40 hover:-translate-y-1 active:translate-y-0 cursor-pointer"
                    }
                  `}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message <Send size={18} className="sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
