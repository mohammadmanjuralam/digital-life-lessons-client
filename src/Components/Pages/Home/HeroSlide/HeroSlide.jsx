import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";

const HeroSlide = () => {
  const slides = [
    {
      title: "Learn Anytime, Anywhere",
      desc: "Access high-quality lessons and improve your skills instantly.",
      img: "https://i.ibb.co.com/27fmsmZL/Download-Man-typing-on-computer-at-sunrise-for-free.jpg",
    },
    {
      title: "Share Your Knowledge",
      desc: "Create lessons and help our community grow with your expertise.",
      img: "https://i.ibb.co.com/Jjn2c3xN/Professional-lady-working-on-her-laptop.jpg",
    },
    {
      title: "Join a Learning Community",
      desc: "Connect with thousands of learners sharing the same passion.",
      img: "https://i.ibb.co.com/HfnxGhrV/Vintage-Writing-Workspace.jpg",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] flex items-center justify-center"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

              {/* Content Area */}
              <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-10 max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg mb-6 opacity-90">
                  {slide.desc}
                </p>
                <Link
                  to="/add-lesson"
                  className="btn btn-primary px-6 py-2 rounded-full hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlide;
