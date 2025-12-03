import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Star,
  User,
  Mail,
  CheckCircle,
  Clock,
  ShieldCheck,
  CreditCard,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper: Skeleton Loader for Details Page
const DetailsSkeleton = () => (
  <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
    <div className="lg:col-span-2 space-y-6">
      <div className="w-full h-80 bg-gray-200 rounded-2xl"></div>
      <div className="h-10 bg-gray-200 w-3/4 rounded"></div>
      <div className="h-6 bg-gray-200 w-1/2 rounded"></div>
      <div className="space-y-3 mt-6">
        <div className="h-4 bg-gray-200 w-full rounded"></div>
        <div className="h-4 bg-gray-200 w-full rounded"></div>
        <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
      </div>
    </div>
    <div className="h-96 bg-gray-200 rounded-2xl"></div>
  </div>
);

export default function SkillDetails() {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", date: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating network delay to show skeleton
        const res = await fetch("/data.json");
        const newData = await res.json();
        const selectedSkill = newData.find(
          (item) => item.skillId === parseInt(id)
        );
        setSkill(selectedSkill);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load skill details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/800x600?text=Skill+Image+Unavailable";
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    toast.success(`Booking confirmed for ${formData.name}! Check your email.`);
    setFormData({ name: "", email: "", date: "" });
  };

  if (loading) return <DetailsSkeleton />;

  if (!skill) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Skill Not Found</h2>
        <p className="text-gray-500 mt-2">
          The class you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-12 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* LEFT COLUMN: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-blue-100 overflow-hidden">
              {/* Image Header */}
              <div className="relative h-72 md:h-96 w-full group">
                <img
                  src={skill.image}
                  alt={skill.skillName}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm border border-blue-100">
                    {skill.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                {/* Header Info */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                    {skill.skillName}
                  </h1>
                </div>

                {/* Provider & Rating Row */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 border border-blue-100">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">
                        Instructor
                      </p>
                      <p className="font-bold text-gray-800 flex items-center gap-1">
                        {skill.providerName}
                        <ShieldCheck
                          size={16}
                          className="text-blue-500 fill-blue-100"
                        />
                      </p>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          fill={
                            i < Math.floor(skill.rating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">
                      {skill.rating}
                    </span>
                    <span className="text-gray-500 text-sm">(120 Reviews)</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle size={20} className="text-blue-500" />
                    About this Class
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Booking Form (Sticky) */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-100 p-8 hover:border-blue-300 transition-colors duration-300">
              {/* Price Header */}
              <div className="mb-6 pb-6 border-b border-dashed border-gray-200">
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Total Price
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-blue-600">
                    ${skill.price}
                  </span>
                  <span className="text-gray-400 font-medium mb-1">
                    / session
                  </span>
                </div>
              </div>

              {/* Slots Info */}
              <div className="bg-orange-50 text-orange-700 px-4 py-3 rounded-xl flex items-center gap-2 mb-6 text-sm font-medium border border-orange-100">
                <Clock size={16} className="animate-pulse" />
                Hurry! Only {skill.slotsAvailable} slots remaining.
              </div>

              {/* Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  Book Now
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck size={12} /> Secure Payment Processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
