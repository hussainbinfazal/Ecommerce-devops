import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi"; // Outline style
import { HiChevronRight, HiChevronDown, HiChevronLeft } from "react-icons/hi"; // Solid chevron
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback, TouchEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../../redux/slices/categorySlice";
const HeroSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [expandedOption, setExpandedOption] = useState(null);
  const { categories } = useSelector((state) => state.categories);


  
  const bestSellingProducts = products.filter(
    (product) => product?.rating >= 0  || product.numReviews > 10
  );
 
  const toggleOption = (optionName) => {
    setExpandedOption(expandedOption === optionName ? null : optionName);
  };
  const handleMouseEnter = (categoryId) => {
    // Handle mouse enter event for the category
    setActiveCategory(categoryId);
    setHoveredCategory(categoryId);
  };
  const handleMouseLeave = () => {
    // Handle mouse leave event for the category
    setActiveCategory(null);
    setHoveredCategory(null);
  };

  const isIconAppear = (index) => {
    if (index === 0 ||index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6 || index === 7 || index ) {
      return true;
    }
    return false;
  };

  // { HeroSection}
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) =>
      current === bestSellingProducts.length - 1 ? 0 : current + 1
    );
  }, [bestSellingProducts.length]);

  const prevSlide = () => {
    setCurrentIndex((current) =>
      current === 0 ? bestSellingProducts.length - 1 : current - 1
    );
  };

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 2000); 
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

  const [allCategories, setAllCategories] =([]);
  const fetchAllCategories = async () => {
    try {
      const response = await dispatch(fetchCategories()).unwrap();
      setAllCategories(response);
    } catch (error) {
    }
  };

  useEffect(() => { 
    const categories = fetchAllCategories();
  },[]);
  return (
    <div className="w-full h-full flex justify-between items-center bg-white">
      <div className="w-full h-full flex justify-start items-center bg-white">
        {/* {Left section} */}
        <div className="w-[30%] lg:w-1/4 xl:w-1/4 2xl:w-1/4 h-[400px] flex justify-start pl-0 lg:pl-0 xl:pl-0 2xl:pl-0  lg:justify-end xl:justify-end 2xl:justify-end items-center border-r-2 border-r-gray-200 overflow-y-auto">
          {/* {Categories} */}
          <div className="w-full lg:w-3/4 xl:w-3/4 2xl:w-3/4 h-3/4 flex justify-center items-center">
            <ul className="w-full   h-full flex justify-between flex-col gap-2 lg:pl-8 xl:pl-8 2xl:pl-8 ">
              {Object.values(categories)?.map((category,index) => (
                <li
                  key={category.name}
                  className="flex justify-between pr-2  cursor-pointer pl-1 sm:pl-4  md:pl-3 lg:pl-0 xl:pl-0 2xl:pl-0 text-[18px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px] "
                  onMouseEnter={() => handleMouseEnter(category.name)}
                  onClick={handleMouseLeave}
                  //   onMouseLeave={handleMouseLeave}
                >
                  <span className="font-semibold">
                    <Link
                      to={`categories/${category.name}`}
                      className={` rounded-md transition-colors `}
                    >
                      {category.name}
                    </Link>
                  </span>
                  {isIconAppear(index) &&
                    (hoveredCategory === category.name ? (
                      <HiChevronDown className="inline-block text-2xl transition-transform duration-300" />
                    ) : (
                      <HiChevronRight className="inline-block text-2xl transition-transform duration-300" />
                    ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* {Right section} */}
        <div className="w-4/6 h-[400px] relative bg-white overflow-auto">
          {/* {Subcategories} */}
          {activeCategory && (
            <div
              className={`absolute left-0 top-0 w-full h-full z-10 bg-white p-6 pl-4
                transition-all duration-300 transform border-r-1 border-r-gray-100
                ${
                  activeCategory
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10 pointer-events-none"
                }
              `}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col lg:grid xl:grid 2xl:grid lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3 gap-6 overflow-auto bg-white z-8">
                {Object.values(categories)
                  .find((cat) => cat.name === activeCategory)
                  ?.subcategories.map((subcategory) => {
                    const cat = categories.find(
                      (cat) => cat.name === activeCategory
                    );
                    return (
                      <div key={subcategory.name} className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">
                          {subcategory.name}
                        </h3>
                        <ul className="space-y-3">
                          {subcategory.options.map((option, idx) => (
                            <div key={idx} className="relative group">
                              <div className="flex items-center flex-grow">
                                <Link to={`/categories/${cat.name}/${subcategory.name}/${option.name}`}>
                                  <span className="flex justify-between items-center">
                                    <li className="text-gray-600 hover:text-blue-500 cursor-pointer transition-colors my-2 relative">
                                      {option.name}
                                    </li>
                                  </span>
                                </Link>
                                {option.suboptions && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleOption(option.name);
                                    }}
                                    className="p-1 focus:outline-none"
                                  >
                                    {expandedOption === option.name ? (
                                      <HiChevronDown className="text-lg" />
                                    ) : (
                                      <HiChevronRight className="text-lg" />
                                    )}
                                  </button>
                                )}

                                {/* Render nested suboptions if they exist */}
                                {option.suboptions &&
                                  option.suboptions.length > 0 &&
                                  expandedOption === option.name && (
                                    <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md p-2 z-20 border border-t-0 border-gray-200">
                                      <ul className="ml-4 space-y-4  ">
                                        {option.suboptions.map(
                                          (suboption, subIdx) => (
                                            <Link
                                              to={`/categories/${cat.name}/${subcategory.name}/${option.name}/${suboption.name}`}
                                            >
                                              <li
                                                key={subIdx}
                                                className="text-gray-600 hover:text-blue-500 cursor-pointer transition-colors my-4"
                                              >
                                                {suboption.name}
                                              </li>
                                            </Link>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                              </div>
                            </div>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          {/* {Slider} */}
          <div className="w-full h-full flex justify-end items-end bg-white">
            <div
              className="relative h-[350px] w-[95%] overflow-hidden bg-white "
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
                {bestSellingProducts.map((slide, index) => (
                  <div
                    key={index}
                    className="min-w-full h-full relative "
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <img
                      src={
                slide?.productImage?.startsWith("http")
                  ? slide.productImage
                  : `${import.meta.env.VITE_API_URL}/uploads/productImages/${
                      slide?.productImage
                    }`
              }
                      alt={slide.name}
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
                            navigate(`/product/${slide._id}`);
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
                {(bestSellingProducts || [])
                  .slice(0, 5)
                  .map((_, index) => (
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
      </div>
    </div>
  );
};

export default HeroSection;
