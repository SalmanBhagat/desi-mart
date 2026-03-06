
import React, { useEffect, useState, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const HeroSection = () => {
  const images = [
    "img/Banner-icon1.png",
    "img/Banner-icon2.png",
    "img/Banner-icon3.png",
  ];

  const [index, setIndex] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const slideRef = useRef(null);

  // Auto Slide
  useEffect(() => {
    if (isPause) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [index, isPause]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="relative mt-14 w-full overflow-hidden group"
      onMouseEnter={() => setIsPause(true)}
      onMouseLeave={() => setIsPause(false)}
    >
      {/* Slider Wrapper */}
      <div
        ref={slideRef}
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Hero Banner"
            className="w-full shrink-0 object-contain"
          />
        ))}
      </div>

      {/* Prev */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-6 lg:left-10 xl:left-14 
        bg-white/80 hover:bg-white p-1.5 md:p-2 lg:p-2.5 rounded-full shadow 
        opacity-0 group-hover:opacity-100 transition cursor-pointer"
      >
        <HiChevronLeft className="w-6 h-6 text-p-500" />
      </button>

      {/* Next */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-8 lg:right-10 xl:right-14 
        bg-white/80 hover:bg-white p-1.5 md:p-2 lg:p-2.5 rounded-full shadow 
        opacity-0 group-hover:opacity-100 transition cursor-pointer"
      >
        <HiChevronRight className="w-6 h-6 text-p-500" />
      </button>
    </div>
  );
};

export default HeroSection;