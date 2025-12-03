import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function PopularSkills() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const newData = await res.json();
        setData(newData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDetailsClick = (skill) => {
    navigate(`/detils/${skill.skillId}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-t-primary-500 border-primary-100 animate-spin"></div>
        </div>
        <p className="mt-6 text-primary-700 text-lg font-semibold animate-pulse">
          Loading Popular Skills...
        </p>
      </div>
    );
  }

  return (
    <section className="py-10  max-width mx-auto">
      {/* Section Header */}
      <div className="text-center mb-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
          New Skills
        </h2>
        <p className="text-lg text-primary-700 max-w-2xl mx-auto">
          Browse our most popular courses and start learning today
        </p>
        <div className="w-24 h-1 bg-linear-to-r from-primary-400 via-primary-500 to-primary-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8  mx-auto">
        {data.map((skill) => (
          <div
            key={skill.skillId}
            onClick={() => handleDetailsClick(skill)}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-primary-100 hover:border-primary-300 flex flex-col h-full"
          >
            {/* Image Container - Fixed Height */}
            <figure className="relative overflow-hidden h-56 bg-primary-50 shrink-0 cursor-pointer">
              <img
                src={skill.image}
                alt={skill.skillName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
              />

              {/* linear Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Popular Badge */}
              <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                Popular
              </div>
            </figure>

            {/* Card Content - Flex Grow to Fill Space */}
            <div className="p-6 flex flex-col grow">
              {/* Skill Name - Fixed Height with Line Clamp */}
              <h3 className="text-xl font-bold text-primary-900 mb-3 line-clamp-2 min-h-14 group-hover:text-primary-600 transition-colors duration-300 cursor-pointer">
                {skill.skillName}
              </h3>

              {/* Rating Section */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-primary-900 font-bold text-base">
                    {skill.rating}
                  </span>
                </div>
                <span className="text-primary-600 text-sm font-medium">
                  ({Math.floor(skill.rating * 234)} reviews)
                </span>
              </div>

              {/* Price Section */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-primary-900 font-bold text-2xl">
                    {skill.price}
                  </span>
                  {skill.originalPrice && (
                    <span className="text-primary-400 line-through text-sm">
                      {skill.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-primary-100 mb-4"></div>

              {/* Spacer to Push Button to Bottom */}
              <div className="grow"></div>

              {/* View Details Button - Always at Bottom */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDetailsClick(skill);
                }}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl transform group-hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  View Details
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>

              {/* Additional Info */}
              <div className="flex items-center justify-between mt-4 text-sm text-primary-600">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  {Math.floor(Math.random() * 5000) + 1000}+ students
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {Math.floor(Math.random() * 20) + 5}h content
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <button
          onClick={() => navigate("/all-skills")}
          className="
            cursor-pointer
            inline-flex items-center gap-3
            bg-primary-600 hover:bg-primary-700 
            text-white text-lg font-bold 
            py-4 px-10 rounded-xl 
            shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 
            transform hover:-translate-y-1 hover:scale-105
            transition-all duration-300
          "
        >
          See More Skills
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && !loading && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-bold text-primary-900 mb-2">
            No Skills Available
          </h3>
          <p className="text-primary-600">
            Check back later for new courses and skills
          </p>
        </div>
      )}
    </section>
  );
}
