import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import "animate.css";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    message: "Amazing service! Highly recommend to everyone.",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 4,
    message: "Great experience, will definitely use again.",
  },
  {
    id: 3,
    name: "Charlie Lee",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    message: "Exceptional quality and fast support!",
  },
  {
    id: 4,
    name: "David Brown",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 5,
    message: "Fantastic support and very professional.",
  },
  {
    id: 5,
    name: "Ella Wilson",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    message: "Really happy with the results and service.",
  },
];

export default function UserReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide logic
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const getVisibleReviews = () => {
    const total = reviews.length;
    return [
      reviews[currentIndex],
      reviews[(currentIndex + 1) % total],
      reviews[(currentIndex + 2) % total],
    ];
  };

  const visibleReviews = getVisibleReviews();

  return (
    <section className="py-4 relative">
      <div className="max-width">
        {/* Section Header - Matched to TopRatedProviders */}
        <div className="text-center  mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            User Reviews
          </h2>
          <p className="text-primary-700 text-lg">
            See what our satisfied clients have to say about their experiences
            with our top-rated experts.
          </p>
        </div>

        <div
          className="relative max-w-6xl mx-auto px-4 md:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Container */}
          <div className="flex justify-center gap-6 xl:gap-8">
            {visibleReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className={`
                  group relative bg-white/80 backdrop-blur-md 
                  border border-primary-100 rounded-2xl shadow-sm 
                  hover:shadow-xl hover:shadow-primary-500/10 
                  hover:border-primary-300
                  transition-all duration-500 ease-out 
                  flex flex-col flex-1 overflow-hidden
                  /* Responsive Visibility Logic: */
                  ${index === 0 ? "block w-full" : "hidden md:block"} 
                  ${index === 2 ? "hidden lg:block" : ""}
                `}
              >
                {/* Decorative linear background inside card */}
                <div className="absolute top-0 w-full h-24 bg-linear-to-b from-primary-50 to-transparent opacity-50"></div>

                <div className="relative p-6 flex flex-col items-center grow z-10">
                  {/* Quote Icon Decoration */}
                  <div className="mb-2 text-primary-200">
                    <Quote className="w-8 h-8 fill-current opacity-50" />
                  </div>

                  {/* Avatar Container */}
                  <div className="relative mb-4">
                    <div className="p-1 bg-white rounded-full shadow-sm">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-20 h-20 rounded-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors text-center">
                    {review.name}
                  </h3>

                  {/* Star Ratings - Matched Style */}
                  <div className="flex items-center gap-1 my-3 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-orange-400 fill-orange-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-gray-600 italic text-center leading-relaxed">
                    "{review.message}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Styled to match theme */}
          <button
            onClick={prevSlide}
            aria-label="Previous Review"
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white text-primary-600 p-3 rounded-full shadow-lg hover:bg-primary-50 hover:scale-110 transition z-20 border border-primary-100 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Review"
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-white text-primary-600 p-3 rounded-full shadow-lg hover:bg-primary-50 hover:scale-110 transition z-20 border border-primary-100 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-primary-600"
                  : "w-2.5 bg-primary-200 hover:bg-primary-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
