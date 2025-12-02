import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SkillDetails() {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const newData = await res.json();
        const selectedSkill = newData.find(
          (item) => item.skillId === parseInt(id)
        );
        setSkill(selectedSkill);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    toast.success(" Session booked successfully!");
    setName("");
    setEmail("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-gray-50">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="text-center mt-20 text-lg font-semibold text-red-500">
        Skill not found!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
      <div className="lg:col-span-2 bg-white shadow-2xl rounded-lg p-8 hover:shadow-blue-100 transition-all duration-500 transform hover:-translate-y-1 cursor-pointer">
        <div className="overflow-hidden rounded-lg mb-6 relative group">
          <img
            src={skill.image}
            alt={skill.skillName}
            className="w-full h-72 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {skill.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {skill.skillName}
        </h1>
        <p className="text-gray-600 mb-4">
          By{" "}
          <span className="font-semibold text-blue-600">
            {skill.providerName}
          </span>
        </p>

        <div className="flex items-center gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              fill={i < Math.floor(skill.rating) ? "#facc15" : "none"}
              stroke="#facc15"
            />
          ))}
          <span className="text-gray-700 ml-2 font-medium">{skill.rating}</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          {skill.description}
        </p>

        <div className="flex justify-between items-center bg-linear-to-r from-blue-50 to-blue-100 p-5 rounded-2xl">
          <p className="text-xl font-semibold text-blue-800">
            💰 Price: ${skill.price}
          </p>
          <p className="text-sm text-gray-700">
            Slots:{" "}
            <span className="font-medium text-blue-700">
              {skill.slotsAvailable}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 border border-blue-100 hover:shadow-blue-200 transition-shadow duration-500">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Book a Session
        </h2>
        <form onSubmit={handleBookingSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
