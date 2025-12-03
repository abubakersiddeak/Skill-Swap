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
    <section className="py-8 px-2 sm:px-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Fully Responsive */}
        <div className="text-center mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            User Reviews
          </h2>
          <p className="text-primary-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            See what our satisfied clients have to say about their experiences
            with our top-rated experts.
          </p>
        </div>

        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Container - Responsive Grid */}
          <div className="flex justify-center gap-4 sm:gap-5 md:gap-6 xl:gap-8 px-8 sm:px-12 md:px-4">
            {visibleReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className={`
                  group relative bg-white/80 backdrop-blur-md 
                  border border-primary-100 rounded-xl sm:rounded-2xl 
                  shadow-sm hover:shadow-xl hover:shadow-primary-500/10 
                  hover:border-primary-300
                  transition-all duration-500 ease-out 
                  flex flex-col overflow-hidden
                  /* Mobile: Show only 1 card */
                  ${index === 0 ? "flex-1 min-w-0" : "hidden"} 
                  /* Tablet (md): Show 2 cards */
                  md:${index < 2 ? "flex flex-1 min-w-0" : "hidden"} 
                  /* Desktop (lg): Show all 3 cards */
                  lg:flex lg:flex-1 lg:min-w-0
                `}
              >
                {/* Decorative background */}
                <div className="absolute top-0 w-full h-20 sm:h-24 bg-linear-to-b from-primary-50 to-transparent opacity-50"></div>

                <div className="relative p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col items-center grow z-10">
                  {/* Quote Icon - Responsive sizing */}
                  <div className="mb-2 sm:mb-3 text-primary-200">
                    <Quote className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-current opacity-50" />
                  </div>

                  {/* Avatar Container - Responsive sizing */}
                  <div className="relative mb-3 sm:mb-4">
                    <div className="p-1 bg-white rounded-full shadow-sm">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Name - Responsive text */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors text-center">
                    {review.name}
                  </h3>

                  {/* Star Ratings - Responsive */}
                  <div className="flex items-center gap-0.5 sm:gap-1 my-2 sm:my-3 bg-orange-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-orange-100">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                          i < review.rating
                            ? "text-orange-400 fill-orange-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Message - Responsive text */}
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 italic text-center leading-relaxed px-2">
                    "{review.message}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Responsive positioning */}
          <button
            onClick={prevSlide}
            aria-label="Previous Review"
            className="absolute top-1/2 left-0 sm:left-1 md:-left-4 lg:-left-12 -translate-y-1/2 
              bg-white text-primary-600 p-2 sm:p-2.5 md:p-3 rounded-full 
              shadow-lg hover:bg-primary-50 hover:scale-110 
              transition z-20 border border-primary-100 group
              active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Review"
            className="absolute top-1/2 right-0 sm:right-1 md:-right-4 lg:-right-12 -translate-y-1/2 
              bg-white text-primary-600 p-2 sm:p-2.5 md:p-3 rounded-full 
              shadow-lg hover:bg-primary-50 hover:scale-110 
              transition z-20 border border-primary-100 group
              active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Pagination Dots - Responsive */}
        <div className="flex justify-center mt-6 sm:mt-7 md:mt-8 gap-1.5 sm:gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 sm:w-8 bg-primary-600"
                  : "w-2 sm:w-2.5 bg-primary-200 hover:bg-primary-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
