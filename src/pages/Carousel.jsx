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
      <div className="flex flex-col items-center justify-center min-h-[60vh] ">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-gray-200 animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
          Loading Popular Skills...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-transparent mx-auto mt-10 px-4 md:px-0">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: false,
        }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {data.map((s) => (
          <SwiperSlide key={s.skillId}>
            <div
              onClick={() => navigate(`/detils/${s.skillId}`)}
              className="relative w-full h-72 md:h-80 lg:h-96 overflow-hidden rounded-3xl cursor-pointer transform transition-transform hover:scale-95 "
            >
              <img
                src={s.image}
                alt={s.skillName}
                className="w-full h-full object-cover brightness-95 transition-all duration-500 hover:brightness-110"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

              <div className="absolute bottom-6 left-6 text-white font-extrabold text-2xl md:text-3xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] tracking-wide">
                {s.skillName}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
