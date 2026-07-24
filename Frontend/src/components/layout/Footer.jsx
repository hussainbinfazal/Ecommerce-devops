import React from "react";
import { useState } from "react";
import { VscSend } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }
  
    toast.success("Subscribed!");
    setEmail("");
  };

  const [emailError, setEmailError] = useState("");
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  
    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      
      setEmailError("");
    }
  };
  return (
    <div className="w-full h-[1100px] lg:h-[350px] xl:h-[350px] 2xl:h-[350px] flex flex-col  justify-between items-center bg-black p-4 ">
      <div className="w-full lg:w-4/5 xl:w-4/5 2xl:w-4/5 lg:h-[250px] xl:h-[250px] 2xl:h-[250px] h-full flex flex-col justify-start items-start  lg:flex-row xl:flex-row 2xl:flex-row lg:justify-center xl:justify-center 2xl:justify-center  lg:items-center  xl:items-center 2xl:items-center gap-6 text-white mt-4 lg:mt-0 xl:mt-0 2xl:mt-0">
        {/* Add Actual links to the pages */}
        <div className="lg:w-1/4 xl:w-1/5 2xl:w-1/5 w-full h-full flex  flex-col justify-start items-start pr-7 gap-4 p-2">
          <h3 className="text-2xl font-bold ">Exclusive</h3>
          <h4 className="text-xl ">Subscribe</h4>
          <span className="text-sm">Get 10% off on your first purchase</span>
          <div className="relative  w-full h-[50px] bg-black border-2 border-white rounded-md">
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              className="w-full lg:w-full xl:w-full 2xl:w-full h-full pl-4 border-none outline-none placeholder:text-gray-500 placeholder:text-sm"
              placeholder="Enter your email"
            />
            <button className="absolute top-0 right-0 w-[60px] text-2xl  h-full text-white flex justify-center items-center">
              <VscSend />
            </button>
          </div>
        </div>
        {/* {} */}
        <div className="lg:w-1/4 xl:w-1/5 2xl:w-1/5 w-full h-full flex  flex-col justify-start items-start pr-7 gap-4 p-2">
          <h3 className="text-2xl font-bold ">Support</h3>
          <h4 className="text-xl ">Subscribe</h4>
          <span className="text-sm break-words">exclusive@gmail.com</span>
          <span className="text-sm pr-8">+965896587458745</span>
        </div>
        {/* {} */}
        <div className="lg:w-1/4 xl:w-1/5 2xl:w-1/5 w-full h-full flex  flex-col justify-start items-start pr-7 gap-4 p-2">
          <h3 className="text-2xl font-bold ">Account</h3>
          <h4
            className="text-xl "
            onClick={() => {
              navigate("/profile");
            }}
          >
            My Account
          </h4>
          <span
            className="text-sm cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login /Register
          </span>
          <span
            className="text-sm cursor-pointer"
            onClick={() => {
              navigate("/cart");
            }}
          >
            Cart
          </span>
          <span
            className="text-sm cursor-pointer"
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            Wishlist
          </span>
          <span
            className="text-sm cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Shop
          </span>
        </div>
        {/* {} */}
        <div className="lg:w-1/4 xl:w-1/5 2xl:w-1/5 w-full h-full flex  flex-col justify-start items-start pr-7 gap-4 p-2">
          <h3 className="text-2xl font-bold ">Quick Link</h3>
          <h4
            className="text-xl cursor-pointer"
            onClick={() => {
              navigate("/privacy-policy");
            }}
          >
            Privacy
          </h4>
          <span
            className="text-sm cursor-pointer"
            onClick={() => {
              navigate("/terms-and-conditions");
            }}
          >
            Terms of use
          </span>
          <span
            className="text-sm cursor-pointer"
            onClick={() => {
              navigate("/faq");
            }}
          >
            FAQ
          </span>
          <span
            className="text-sm cursor-pointer"
            onClick={() => {
              navigate("/contact-us");
            }}
          >
            Contact
          </span>
          <span
            className="text-sm cursor-pointer"
            onClick={() => {
              navigate("/help");
            }}
          >
            Help
          </span>
        </div>
      </div>
      <div className="w-full h-[50px] border-t-2 border-gray-500 flex items-center justify-center">
        <span className="w-full h-full text-gray-500 flex justify-center items-center text-[12px] text-auto">
          © Copyright Rimel 2022.All rights reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
