import React, { useState, useEffect } from "react";
import {
  Search,
  Star,
  User,
  ArrowRight,
  Filter,
  Zap,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router";

// Helper: Skeleton Card for Loading State
const SkillSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-4 h-full animate-pulse">
    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div className="h-10 bg-gray-200 rounded-full w-full"></div>
  </div>
);

export default function AllSkills() {
  const navigate = useNavigate();

  // 1. State Management
  const [skills, setSkills] = useState([]); // Stores the fetched data
  const [loading, setLoading] = useState(true); // Handles loading state
  const [error, setError] = useState(null); // Handles errors

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 2. Fetch Data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // This looks for data.json in your public/ folder
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setSkills(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError(err.message);
      } finally {
        // Slight delay to show off the skeleton animation (optional)
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, []);

  // 3. Derive Categories dynamically from fetched data
  const categories = ["All", ...new Set(skills.map((item) => item.category))];

  // 4. Filter Logic
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.skillName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.providerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || skill.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/400x300?text=Skill+Swap";
  };

  const handleCardClick = (id) => {
    navigate(`/detils/${id}`);
  };

  return (
    <section className="py-10  bg-gray-50 relative overflow-hidden min-h-screen">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-primary-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-width mx-auto  relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Explore Available Skills
          </h2>
          <p className="text-primary-700 text-lg mb-8">
            Find the perfect mentor or course. Filter by category or search for
            specific skills.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for python, yoga, design..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                block w-full pl-11 pr-4 py-4 
                bg-white border border-primary-200 rounded-full 
                text-gray-900 placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                shadow-lg shadow-primary-500/5 transition-all
              "
            />
          </div>

          {/* Category Buttons (Only show if data is loaded) */}
          {!loading && !error && (
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border
                    hover:scale-105 active:scale-95
                    ${
                      selectedCategory === cat
                        ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/30"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. Conditional Rendering based on State */}

        {/* STATE: LOADING */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <SkillSkeleton key={idx} />
            ))}
          </div>
        )}

        {/* STATE: ERROR */}
        {error && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Failed to load data
            </h3>
            <p className="text-gray-500 mt-2">{error}</p>
          </div>
        )}

        {/* STATE: SUCCESS (Show Data) */}
        {!loading && !error && filteredSkills.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill.skillId}
                onClick={() => handleCardClick(skill.skillId)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleCardClick(skill.skillId)
                }
                role="button"
                tabIndex={0}
                className="
                  group bg-white rounded-2xl overflow-hidden border border-primary-100 
                  shadow-sm hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-300 hover:-translate-y-1
                  transition-all duration-300 flex flex-col h-full 
                  cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-100
                "
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={skill.image}
                    alt={skill.skillName}
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold text-primary-700 rounded-full shadow-sm">
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col grow">
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {skill.skillName}
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {skill.description}
                  </p>

                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                      <User size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {skill.providerName}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Star
                          size={12}
                          className="text-orange-400 fill-orange-400 mr-1"
                        />
                        <span>{skill.rating} Rating</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block">
                        Starting at
                      </span>
                      <span className="text-xl font-bold text-primary-700">
                        ${skill.price}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-full bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                      <ArrowRight size={20} />
                    </div>
                  </div>

                  {skill.slotsAvailable < 5 && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-orange-600 font-medium animate-pulse">
                      <Zap size={12} className="fill-current" />
                      Only {skill.slotsAvailable} spots left!
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STATE: EMPTY (No matches found) */}
        {!loading && !error && filteredSkills.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-primary-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              No classes found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="cursor-pointer mt-4 text-primary-600 font-semibold hover:underline hover:text-primary-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
