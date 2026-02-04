import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const HeroSection = () => {
  const images = [
    "img/Banner-icon1.png",
    "img/Banner-icon2.png",
    "img/Banner-icon3.png",
  ];

  // State variebles
  const [index, setIndex] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [isFade, setIsFade] = useState(false);

  useEffect(() => {
    if (isPause) return;
    const interval = setInterval(() => nextSlide(), 2000);
    return () => clearInterval(interval);
  }, [index, isPause]);

  // Go to previous slide
  const prevSlide = () => {
    setIsFade(true);

    setTimeout(() => {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsFade(false);
    }, 300);
  };

  // Go to next slide
  const nextSlide = () => {
    setIsFade(true); // fade out

    setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setIsFade(false); // fade in
    }, 300);
  };

  return (
    <div className="relative mt-14.25 group w-full">
      <img
        src={images[index]}
        onMouseEnter={() => setIsPause(true)}
        onMouseLeave={() => setIsPause(false)}
        className={`object-contain sm:object-contain
    transition-opacity duration-700 ease-in-out
    ${isFade ? "opacity-0" : "opacity-100"}
  `}
        alt="Hero Banner"
      />

      {/* Prev */}
<button
  onClick={prevSlide}
  className="
    absolute top-1/2 -translate-y-1/2
    left-2 sm:left-4 lg:left-8
    bg-white/80 hover:bg-white
    p-1.5 sm:p-2
    rounded-full shadow cursor-pointer
    block
    lg:hidden
    lg:group-hover:block
  "
>
  <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
</button>

{/* Next */}
<button
  onClick={nextSlide}
  className="
    absolute top-1/2 -translate-y-1/2
    right-2 sm:right-4 lg:right-8
    bg-white/80 hover:bg-white
    p-1.5 sm:p-2
    rounded-full shadow cursor-pointer
    block
    lg:hidden
    lg:group-hover:block
  "
>
  <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
</button>

    </div>
  );
};

export default HeroSection;
