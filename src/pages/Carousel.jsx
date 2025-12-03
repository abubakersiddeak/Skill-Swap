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
    <div className="bg-transparent max-width mx-auto py-10 ">
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
              onClick={() => navigate(`/detils/${s.skillId}`)}
              className="group relative w-full h-80 md:h-96 lg:h-[420px] overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <img
                src={s.image}
                alt={s.skillName}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />

              {/* linear Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-primary-900/90 via-primary-800/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                {/* Skill Name */}
                <h3 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl mb-3 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-lg">
                  {s.skillName}
                </h3>

                {/* Description or CTA (optional) */}
                <p className="text-primary-100 text-sm md:text-base opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 line-clamp-2">
                  Explore this skill and enhance your expertise
                </p>

                {/* Action Button */}
                <button className="mt-4 w-fit px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg hover:shadow-xl">
                  Learn More →
                </button>
              </div>

              {/* Top Right Badge (optional - if you have skill level/category) */}
              <div className="absolute top-4 right-4 bg-primary-500/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Popular
              </div>

              {/* Border Glow Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary-600 group-hover:border-primary-400/50 transition-all duration-500"></div>
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
