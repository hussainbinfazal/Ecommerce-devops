import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import AdminSidebar from "./AdminSidebar";
import AdminMainComponent from "./AdminMainComponent";
import { BrowserRouter as Router } from "react-router-dom";
const Adminpage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scaleIcon, setScaleIcon] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false); // New state for icon toggle

  const navigate = useNavigate();
    // setInterval(() => {
    //   scaleIcon ? setScaleIcon(false) : setScaleIcon(true);
    // }, 1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setScaleIcon((prev) => !prev);
    }, 600);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowHamburger((prev) => !prev); // Toggle between icons
    }, 600);

    return () => clearInterval(intervalId);
  }, []);
  const toggleAdminSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="adminpage w-full min-h-screen flex flex-row justify-center items-center bg-white  overflow-auto ">
      <div className=" 2nd lg:w-6/7 xl:w-6/7 2xl:w-6/7 w-full h-full  flex flex-row justify-center  relative">
        {/* left */}
        <AdminSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleAdminSidebar}
          navigate={navigate}
        />
        {/* right */}
        <AdminMainComponent
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleAdminSidebar}
          showHamburger={showHamburger}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default Adminpage;
