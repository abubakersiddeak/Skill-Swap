import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
    <section className="py-16 rounded-2xl  text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 animate__animated animate__fadeInDown">
          User Reviews
        </h2>

        <div className="relative overflow-hidden">
          <div className="flex gap-6 justify-center">
            {visibleReviews.map((review, index) => (
              <div
                key={review.id}
                className={`bg-white p-6 rounded-xl shadow-xl text-center w-72 md:w-80 transform transition-transform duration-700 ease-in-out animate__animated animate__fadeInUp`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  zIndex: visibleReviews.length - index,
                }}
              >
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-400 shadow-lg"
                />
                <h3 className="text-xl font-semibold mb-2 text-blue-500">
                  {review.name}
                </h3>
                <div className="flex justify-center mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.965c.3.922-.755 1.688-1.538 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.783.57-1.838-.196-1.538-1.118l1.287-3.965a1 1 0 00-.364-1.118L2.068 9.392c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.965z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600">{review.message}</p>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="z-50 cursor-pointer  absolute top-1/2 left-0 -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow hover:bg-blue-600 transition"
          >
            &#8592;
          </button>
          <button
            onClick={nextSlide}
            className="z-50 cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 bg-blue-500 text-white p-3 rounded-full shadow hover:bg-blue-600 transition"
          >
            &#8594;
          </button>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {reviews.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-blue-500" : "bg-gray-300"
              } transition-all`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
