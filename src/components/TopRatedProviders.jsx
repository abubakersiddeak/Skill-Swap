import { Star, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

// Helper Component: Skeleton Loader (Market Standard for loading states)
const ProviderSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-sm border border-primary-100 rounded-2xl p-6 shadow-sm animate-pulse flex flex-col items-center h-full">
    <div className="w-24 h-24 bg-primary-100 rounded-full mb-4"></div>
    <div className="h-6 bg-primary-100 w-3/4 rounded mb-2"></div>
    <div className="h-4 bg-primary-50 w-1/2 rounded mb-4"></div>
    <div className="w-full mt-auto space-y-2">
      <div className="h-3 bg-primary-50 w-full rounded"></div>
      <div className="h-10 bg-primary-100 w-full rounded-lg mt-4"></div>
    </div>
  </div>
);

export default function TopRatedProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        // Simulating a slight delay to show off the skeleton (remove setTimeout in production)
        const res = await fetch("/data.json");
        const newData = await res.json();
        const topRated = newData
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5);
        setProviders(topRated);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch providers", error);
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  // Fallback for broken images
  const handleImageError = (e) => {
    e.target.src =
      "https://ui-avatars.com/api/?name=Provider&background=0D8ABC&color=fff";
  };

  return (
    <section className="py-10  relative">
      <div className="max-width ">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Top Rated Experts
          </h2>
          <p className="text-primary-700 text-lg">
            Connect with the highest-rated professionals dedicated to providing
            exceptional service.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-8">
          {/* Loading State */}
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProviderSkeleton key={index} />
              ))
            : providers.map((p) => (
                <div
                  key={p.id}
                  className="
                    group relative bg-white/80 backdrop-blur-md 
                    border border-primary-100 rounded-2xl shadow-sm 
                    hover:shadow-xl hover:shadow-primary-500/10 
                    hover:border-primary-300
                    transition-all duration-300 ease-out 
                    flex flex-col h-full overflow-hidden
                  "
                >
                  {/* Decorative linear background inside card */}
                  <div className="absolute top-0 w-full h-24 bg-linear-to-b from-primary-50 to-transparent opacity-50"></div>

                  <div className="relative p-6 flex flex-col items-center grow z-10">
                    {/* Avatar Container */}
                    <div className="relative mb-4">
                      <div className="p-1 bg-white rounded-full shadow-sm">
                        <img
                          src={p.image}
                          alt={p.providerName}
                          onError={handleImageError}
                          className="w-24 h-24 rounded-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {/* Verified Badge */}
                      <div
                        className="absolute bottom-1 right-0 bg-white rounded-full p-1 shadow-md"
                        title="Verified Provider"
                      >
                        <ShieldCheck className="w-5 h-5 text-green-500 fill-green-100" />
                      </div>
                    </div>

                    {/* Name & Info */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors text-center truncate w-full">
                      {p.providerName}
                    </h3>

                    <div className="flex items-center gap-1 my-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                      <Star className="h-4 w-4 text-orange-400 fill-orange-400" />
                      <span className="text-gray-800 font-bold text-sm">
                        {p.rating}
                      </span>
                      <span className="text-gray-400 text-xs ml-1">
                        (200+ Reviews)
                      </span>
                    </div>

                    <p className="text-primary-600 font-medium text-sm mb-1">
                      {p.skillName} Specialist
                    </p>

                    <p className="text-gray-400 text-xs truncate w-full text-center mb-4">
                      {p.providerEmail}
                    </p>

                    {/* Spacer to push button to bottom */}
                    <div className="mt-auto w-full pt-4 border-t border-primary-50">
                      <button
                        className="
                          w-full flex items-center justify-center gap-2
                          bg-primary-600  font-semibold 
                          py-2.5 px-4 rounded-xl
                          group-hover:bg-primary-700 text-white group-hover:text-white
                          transition-all duration-300 cursor-pointer
                        "
                      >
                        View Profile
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
