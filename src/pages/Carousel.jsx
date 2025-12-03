import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { useNavigate } from "react-router";

export default function Carousel() {
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
      }
    };
    fetchData();
  }, []);

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
    <div className="bg-transparent max-width mx-auto py-4 ">
      {/* Section Header */}
      <div className="text-center mb-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
          Popular Skills
        </h2>
        <p className="text-lg text-primary-700 max-w-2xl mx-auto">
          Discover the most sought-after skills and start your learning journey
          today
        </p>
        <div className="w-24 h-1 bg-linear-to-r from-primary-400 via-primary-500 to-primary-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
        className="pb-16 border-x-4 border-primary-600"
      >
        {data.map((s) => (
          <SwiperSlide key={s.skillId}>
            <div
              onClick={() => navigate(`/detils/${s.skillId}`)} // Fixed spelling: details
              className="group relative w-full h-[400px] md:h-[450px] overflow-hidden rounded-3xl cursor-pointer shadow-lg shadow-primary-900/20 hover:shadow-2xl hover:shadow-primary-900/40 transition-all duration-500 border border-white/20 isolate"
            >
              {/* 1. Image with Zoom Effect */}
              <img
                src={s.image}
                alt={s.skillName}
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* 2. High-Contrast Gradient Overlay 
        This ensures text is ALWAYS visible, even on white images.
    */}
              <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* 3. Top Badges (Glassmorphism) */}
              <div className="absolute top-4 right-4 flex gap-2 z-20">
                <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  ★ {s.rating || "4.8"}
                </span>
              </div>

              {/* 4. Bottom Content Area */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end">
                {/* Category Label (Always visible) */}
                <span className="w-fit mb-2 px-2.5 py-0.5 rounded-md bg-primary-500/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {s.category || "Course"}
                </span>

                {/* Title (Always visible, moves up slightly) */}
                <h3 className="text-white font-extrabold text-2xl md:text-3xl leading-tight mb-2 drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {s.skillName}
                </h3>

                {/* Hidden Content Reveal */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                  <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-4 drop-shadow-sm">
                    {s.description ||
                      "Master this skill with top-rated experts. Join now to start learning."}
                  </p>

                  <button className="flex items-center gap-2 text-white font-bold text-sm border-b-2 border-primary-500 pb-1 hover:text-primary-400 transition-colors">
                    View Details
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for Navigation Buttons and Pagination */}
      <style jsx>{`
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: var(--primary-600);
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        :global(.swiper-button-next:after),
        :global(.swiper-button-prev:after) {
          font-size: 20px;
          font-weight: bold;
        }

        :global(.swiper-button-next:hover),
        :global(.swiper-button-prev:hover) {
          background: var(--primary-600);
          color: white;
          transform: scale(1.1);
        }

        :global(.swiper-pagination-bullet) {
          width: 12px;
          height: 12px;
          background: var(--primary-300);
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        :global(.swiper-pagination-bullet-active) {
          background: var(--primary-600);
          opacity: 1;
          width: 32px;
          border-radius: 6px;
        }

        :global(.swiper-pagination-bullet:hover) {
          opacity: 0.8;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
