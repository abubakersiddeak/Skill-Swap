import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function PopularSkills() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fechdata = async () => {
      try {
        const res = await fetch("/data.json");
        const newData = await res.json();
        setData(newData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fechdata();
  }, []);
  const handleDetailsClick = (skill) => {
    navigate(`/detils/${skill.skillId}`);
    console.log(skill.skillId);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-gray-200 animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
          Loading Popular Skill...
        </p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 px-4">
        Popular Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 xl:px-7 px-4 2xl:px-9">
        {data.map((skill) => (
          <div
            key={skill.skillId}
            className="relative cursor-pointer group bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <figure className="overflow-hidden">
              <img
                src={skill.image}
                alt={skill.skillName}
                className="rounded-t-lg h-48 xl:h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </figure>

            <div className="absolute inset-0 rounded-lg bg-linear-to-tr from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative z-10 card-body text-center px-4 py-5">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {skill.skillName}
              </h2>

              <div className="flex justify-center items-center gap-2 mt-2">
                <span className="text-yellow-500 font-medium">
                  ⭐ {skill.rating}
                </span>
                <span className="text-gray-400 text-sm">
                  ({Math.floor(skill.rating * 20)}%)
                </span>
              </div>

              <p className="mt-1 text-gray-600 font-medium">💰 {skill.price}</p>

              <div className="card-actions justify-center mt-4">
                <button
                  onClick={() => handleDetailsClick(skill)}
                  className="relative cursor-pointer px-6 py-2 rounded-lg bg-black text-white font-semibold shadow-md hover:shadow-lg transition-all duration-500 hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
