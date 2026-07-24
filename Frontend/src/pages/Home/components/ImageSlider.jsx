import React from "react";
import { useState, useEffect, useCallback } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slides = [
    {
      url: "https://plus.unsplash.com/premium_photo-1674641194949-e154719cdc02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3Ryb25pYyUyMGRldmljZXxlbnwwfHwwfHx8MA%3D%3D", // Unsplash HD Image
      title: "Slide 1",
      description:
        "Discover new landscapes with our stunning collection of travel photos.",
    },
    {
      url: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3Ryb25pYyUyMGRldmljZXxlbnwwfHwwfHx8MA%3D%3D", // Unsplash HD Image
      title: "Slide 2",
      description:
        "Bring elegance to your living spaces with beautiful interior designs.",
    },
    {
      url: "https://images.unsplash.com/photo-1505740106531-4243f3831c78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pYyUyMGRldmljZXxlbnwwfHwwfHx8MA%3D%3D", // Unsplash HD Image
      title: "Slide 3",
      description: "Explore the world of cutting-edge electronics and gadgets.",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 2000); // Change slide every 3 seconds
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, nextSlide]);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -150) {
      // Swipe right
      prevSlide();
    }
  };
  const handleSlideClick = (index) => {
    setCurrentIndex(index);
    nextSlide();
  };
  return (
    <div className="w-full lg:full xl:w-full 2xl:w-full  h-full flex justify-center items-center  mt-25 ">
      <div className="w-5/6 h-full flex justify-end items-end bg-white">
        <div
          className="relative h-[550px] w-[100%] overflow-hidden bg-white "
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Slides Container */}
          <div
            className="flex transition-transform duration-500 ease-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full h-full relative "
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={slide.url}
                  alt={slide.title}
                  className="w-full h-full object-cover cursor-pointer p-0"
                  onClick={() => handleSlideClick(index)}
                />
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                  <h2 className="text-white text-6xl font-semibold">
                    {slide.title}
                  </h2>
                  <p className="text-white/80 mt-2">{slide.description}</p>
                  <div className="mt-4 flex justify-items-center">
                    <button
                      className=" text-white px-4 py-2  pb-[11px] rounded-full flex gap-1 items-center justify-start hover:bg-red-700 transition-colors underline underline-offset-8 hover:underline-offset-8"
                      onClick={() => {
                        navigate("/Home");
                      }}
                    >
                      Shop Now
                      <span>
                        <HiChevronRight />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute hidden top-1/2 left-5 -translate-y-1/2 p-2 bg-black/20 text-white rounded-full
                hover:bg-black/40 transition-all"
            onClick={prevSlide}
          >
            <HiChevronLeft size={30} />
          </button>

          <button
            className="absolute top-1/2 right-5 -translate-y-1/2 p-2 bg-black/20 text-white rounded-full
                hover:bg-black/40 transition-all hidden"
            onClick={nextSlide}
          >
            <HiChevronRight size={30} />
          </button>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all
                    ${
                      currentIndex === index
                        ? "bg-red-600 border-2 border-white "
                        : "bg-white/50"
                    }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
