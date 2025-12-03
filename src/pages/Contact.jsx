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
    <section className="relative py-10 ">
      {/* Background Decorations (Theme Matched) */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 shadow-sm text-primary-600 text-sm font-semibold mb-6">
            <MessageSquare size={16} />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-900 mb-6 tracking-tight">
            We'd Love to Hear From You
          </h2>
          <p className="text-lg text-primary-700">
            Have a question about a skill? Want to become a provider? Or just
            want to say hello? Drop us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card 1: Email */}
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-50 hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">
                Email Us
              </h3>
              <p className="text-gray-500 mb-4">
                Our friendly team is here to help.
              </p>
              <a
                href="mailto:support@skillswap.com"
                className="text-primary-600 font-semibold hover:underline"
              >
                support@skillswap.com
              </a>
            </div>

            {/* Card 2: Office */}
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-50 hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">
                Visit Us
              </h3>
              <p className="text-gray-500 mb-4">
                Come say hello at our office HQ.
              </p>
              <p className="text-gray-800 font-medium">
                123 Innovation Drive,
                <br />
                Tech City, TC 90210
              </p>
            </div>

            {/* Card 3: Phone */}
            <div className="bg-white p-8 rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-50 hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">
                Call Us
              </h3>
              <p className="text-gray-500 mb-4">Mon-Fri from 8am to 5pm.</p>
              <a
                href="tel:+15550001234"
                className="text-gray-800 font-medium hover:text-primary-600 transition-colors"
              >
                +1 (555) 000-1234
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2 ">
            <div className="bg-white flex flex-col justify-between  rounded-3xl shadow-xl shadow-primary-900/5 border border-primary-100 p-8 md:p-10 ">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-primary-700 mb-2"
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
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-primary-700 mb-2"
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
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-bold text-primary-700 mb-2"
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
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-primary-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none placeholder-gray-400 text-gray-700"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary-600/30 
                    flex items-center justify-center gap-2 transition-all duration-300
                    ${
                      isSubmitting
                        ? "bg-primary-400 cursor-not-allowed"
                        : "bg-primary-600 hover:bg-primary-700 hover:shadow-primary-600/40 hover:-translate-y-1 cursor-pointer"
                    }
                  `}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send size={20} />
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
