import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function TopRatedProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await fetch("/data.json");
        const newData = await res.json();
        const topRated = newData
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
        setProviders(topRated);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium animate-pulse">
          Loading Top Providers...
        </p>
      </div>
    );
  }

  return (
    <section className="py-12 ">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
        Top Rated Providers
      </h2>

      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          gap-8 justify-center justify-items-center place-items-center
          max-w-6xl mx-auto px-4
        "
      >
        {providers.map((p) => (
          <div
            key={p.id}
            className="
              relative group bg-white/90 backdrop-blur-md 
              border border-gray-200 rounded-2xl shadow-lg 
              overflow-hidden transform transition-all duration-500 
              hover:-translate-y-3 hover:shadow-2xl cursor-pointer
            "
          >
            <div className="flex flex-col items-center text-center p-6">
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.providerName}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-md group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-1 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>

              <h3 className="mt-4 text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {p.providerName}
              </h3>

              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-gray-700 font-medium">{p.rating}</span>
              </div>

              <p className="text-gray-500 text-sm mt-2 px-2">
                Expert in{" "}
                <span className="font-medium text-blue-600">{p.skillName}</span>
              </p>

              <p className="text-gray-400 text-xs mt-1">{p.providerEmail}</p>

              <button
                className="
                  mt-5 px-6 py-2 text-sm font-semibold 
                  rounded-lg bg-blue-600 text-white 
                  shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer
                "
              >
                View Profile
              </button>
            </div>

            <div className="absolute inset-0 bg-linear-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
