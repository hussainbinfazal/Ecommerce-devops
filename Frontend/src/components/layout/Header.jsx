import React from "react";
import { FiSearch } from "react-icons/fi"; // Import the search icon
import { FiHeart, FiShoppingCart } from "react-icons/fi"; // Feather icons (minimal)
import {
  AiFillProfile,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai"; // Ant Design icons
import { LuShoppingBag } from "react-icons/lu";
import { ImCancelCircle } from "react-icons/im";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { clearWishlist } from "../../redux/slices/wishlistSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

const Header = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserAuth, setIsUserAuth] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems, guestCartItems, guestCartSubtotal } = useSelector(
    (state) => state.cart
  );
  const { wishlist, guestWishlist } = useSelector((state) => state.wishlist);
  const combinedWishlist =
    wishlist?.length > 0 ? wishlist : guestWishlist ? guestWishlist : [];
  const dispatch = useDispatch();
  const handleSmallNav = () => {
    setIsOpen(!isOpen);
  };
  const handleClearText = () => {
    setSearchText("");
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search/${encodeURIComponent(searchText.trim())}`);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut();
      dispatch(logout());
      dispatch(clearWishlist());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);
  useEffect(() => {
    const closeSmallNav = (event) => {
      const smallNav = document.querySelector(".smallNav");
      const userButton = event.target.closest("button"); // To check if click is on the user button

      // If smallNav exists and click is outside smallNav and not on the user button
      if (
        smallNav &&
        !smallNav.contains(event.target) &&
        !userButton?.querySelector(".FaRegUser")
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener if menu is open
    if (isOpen) {
      document.addEventListener("mousedown", closeSmallNav);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", closeSmallNav);
    };
  }, [isOpen]);

  return (
    <div className="w-full bg-white h-[110px]  border-b-2 border-b-gray-200 flex justify-start">
      <div className="w-full lg:w-5/5 xl:w-5/5 2xl:w-5/5 h-full flex justify-between lg:justify-start xl:justify-start 2xl:justify-start items-center ">
        {/* Hamburger Menu Button (visible on mobile) */}
        <button
          className="lg:hidden p-2 ml-1 hover:bg-gray-100 rounded-full cursor-pointer"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
        {/* {Logo} */}
        <div className="w-1/5 lg:w-1/4  xl:w-1/4 2xl:w-1/4 h-full flex justify-center items-center ">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <h2 className="text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-semibold w-full px-8 flex justify-center items-center">
              QuickCart <FaShoppingCart />
            </h2>
          </div>
        </div>
        {/* {Navigation} */}
        <div className=" flex w-1/3 lg:w-2/3 xl:w-2/3 2xl:w-2/3 h-full justify-end items-center pr-4 lg:pr-0 xl:pr-0 2xl:pr-0">
          <div className="w-1/2 h-1/2 hidden lg:flex ">
            <ul className="flex w-full h-full justify-center items-center gap-3 ">
              <li
                className="px-4 text-md active:underline focus:underline hover:underline underline-offset-8 cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </li>
              <li
                className="px-4 text-md active:underline focus:underline hover:underline underline-offset-8 cursor-pointer"
                onClick={() => {
                  navigate("/Contact");
                }}
              >
                Contact
              </li>
              <li className="px-4 text-md active:underline focus:underline hover:underline underline-offset-8 cursor-pointer">
                About
              </li>
              <li
                className="px-0 lg:hidden xl:block text-md active:underline focus:underline hover:underline underline-offset-8 cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up
              </li>
            </ul>
          </div>
          <div className="w-1/2 h-1/2 flex justify-end items-center gap-1 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-4">
            {/* {Input box} */}
            <div className="relative w-1/2 bg-[#F5F5F5] rounded-lg hidden lg:flex">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                type="text"
                placeholder="What are you looking for?"
                className="w-full h-[40px] border-2 border-gray-200 rounded-lg pl-4 pr-12 
    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-[11px]
    transition-all duration-200 placeholder:text-gray-400 border-none outline-none"
              />
              {searchText && (
                <button
                  onClick={handleClearText}
                  className="absolute right-12 top-1/2 -translate-y-1/2 
          hover:text-gray-700 text-gray-400 transition-colors
          p-1 hover:bg-gray-200 rounded-full"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 
    hover:bg-gray-100 rounded-full transition-all duration-200 text-black"
                onClick={handleSearch}
              >
                <FiSearch className="w-5 h-5 text-black-500 hover:text-blue-500" />
              </button>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-all relative"
              onClick={() => {
                navigate("/wishlist");
              }}
            >
              <FiHeart className="w-6 h-6 text-gray-600 hover:text-red-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {combinedWishlist?.length ? combinedWishlist?.length : 0}
              </span>
            </button>

            {/* Cart Icon with counter */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-all relative">
              <FiShoppingCart
                className="w-6 h-6 text-gray-600 hover:text-blue-500"
                onClick={() => {
                  navigate("/Cart");
                }}
              />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {user
                  ? cartItems?.length
                    ? cartItems?.length
                    : 0
                  : guestCartItems?.length
                  ? guestCartItems?.length
                  : 0}
              </span>
            </button>
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              {user ? (
                user?.profileImage ? (
                  <img
                    src={
                      user?.profileImage ||
                      `${import.meta.env.VITE_API_URL}/uploads/userProfile/${
                        user?.profileImage
                      }`
                    }
                    alt=""
                    className="w-10 h-10 z-60 rounded-full text-gray-600 hover:text-blue-500"
                    onClick={() => handleSmallNav()}
                  />
                ) : (
                  <button className="p-2 bg-red-500 hover:bg-gray-300  rounded-full transition-all relative z-60">
                    <FaRegUser
                      className="w-5 h-5  z-60 hover:text-blue-500 text-white"
                      onClick={() => handleSmallNav()}
                    />
                  </button>
                )
              ) : (
                <button className="p-2 hover:bg-gray-100 rounded-full transition-all relative z-60">
                  <FaRegUser
                    className="w-6 h-6 z-60 text-gray-600 hover:text-blue-500"
                    onClick={() => handleSmallNav()}
                  />
                </button>
              )}
              {isOpen && (
                <div
                  className={`smallNav absolute top-8 right-5 w-64 ${
                    user?.isAdmin ? "h-[260px]" : "h-[215px]"
                  } bg-black/[0.4] shadow-lg z-50 text-white rounded-md rounded-tr-0`}
                >
                  <ul
                    className="flex flex-col w-full text-lg "
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <li
                      className="px-8 py-3   flex justify-Start items-center gap-8 hover:scale-105 cursor-pointer hover:text-blue-500 group"
                      onClick={(e) => {
                        navigate("/profile");
                      }}
                    >
                      <FaUser className="w-9 h-7  text-white   group-hover:text-blue-500 group-hover:scale-105 cursor-pointer transition-transform duration-200" />{" "}
                      My account
                    </li>
                    <li
                      className="px-8 py-3   flex justify-Start items-center gap-8 hover:scale-110 transition-all duration-300 cursor-pointer  group"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/orders");
                      }}
                    >
                      <LuShoppingBag className="w-9 h-7  text-white group-hover:text-blue-500 group-hover:scale-105 cursor-pointer transition-transform duration-200   " />
                      My orders
                    </li>
                    <li
                      className="px-8 py-3  flex justify-Start items-center gap-8 hover:scale-110 transition-all duration-300 cursor-pointer hover:text-blue-500  group"
                      onClick={(e) => {
                        navigate("/orders");
                      }}
                    >
                      <ImCancelCircle className="w-9 h-7  text-white   group-hover:text-blue-500 group-hover:scale-105 cursor-pointer transition-transform duration-200 " />
                      Cancellations
                    </li>
                    {user?.isAdmin && (
                      <li
                        className="px-8 py-3  flex justify-Start items-center gap-8 hover:scale-110 transition-all duration-300 cursor-pointer hover:text-blue-500 group"
                        onClick={(e) => {
                          navigate("/admin");
                        }}
                      >
                        <FaRegStar className="w-9 h-7  text-white group-hover:text-blue-500 group-hover:scale-105 cursor-pointer transition-transform duration-200 " />
                        Admin
                      </li>
                    )}
                    <li
                      className="px-8 py-3  flex justify-Start items-center gap-8 hover:scale-110 transition-all duration-300 cursor-pointer hover:text-blue-500 group"
                      onClick={handleLogout}
                    >
                      <BiLogOut className="w-9 h-7  text-white  group-hover:text-blue-500 group-hover:scale-105 cursor-pointer transition-transform duration-200  " />{" "}
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-[160px] left-0 w-full bg-white rounded-b-xl shadow-2xl z-50 overflow-hidden transition-all duration-300 ">
            <ul className="flex flex-col w-full bg-white divide-y divide-gray-100 text-sm font-medium text-gray-800">
              {/* Navigation Links */}
              {[
                { name: "Home", route: "/" },
                { name: "Contact", route: "/Contact" },
                { name: "About", route: "/" },
                { name: "Sign Up", route: "/profile" },
              ].map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => navigate(item.route)}
                  className="px-5 py-4 bg-white hover:bg-blue-50 active:bg-blue-100 cursor-pointer transition-all"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 opacity-70"></span>
                    {item.name}
                  </span>
                </li>
              ))}

              {/* Search Input */}
              {/* <li className="p-4 bg-gray-50">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full h-[42px] pl-4 pr-12 rounded-lg border border-gray-200 shadow-sm 
                    focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 
                    placeholder:text-sm placeholder:text-gray-400"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  {searchText && (
                    <button
                      onClick={handleClearText}
                      className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
                  >
                    <FiSearch className="w-5 h-5" />
                  </button>
                </div>
              </li> */}

              {/* Authenticated User Links */}
              {isAuthenticated && user && (
                <div className="bg-white px-4 py-4  rounded-md shadow-sm z-50 border-t-0 outline-none">
                  <p className="text-md text-gray-500 mb-3">My Account</p>

                  {[
                    { label: "Profile", route: "/profile" },
                    { label: "Orders History", route: "/orders" },
                    { label: "Wishlist", route: "/wishlist" },
                    { label: "Cart", route: "/Cart" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(item.route)}
                      className="flex items-center gap-3 px-1 rounded-md text-sm text-gray-800 h-14 active:bg-gray-100 cursor-pointer transition-all hover:bg-blue-50 border-b-1 border-gray-200"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500 opacity-80"></span>
                      {item.label}
                    </div>
                  ))}

                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-500 hover:bg-red-50 active:bg-red-100 cursor-pointer transition-all h-14"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-400 opacity-80"></span>
                    Logout
                  </div>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
