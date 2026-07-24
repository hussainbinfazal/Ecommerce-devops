import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaClipboardList } from "react-icons/fa";
import { AiFillProduct, AiOutlineShop } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { RiCoupon3Line } from "react-icons/ri";
const AdminSidebar = ({ isSidebarOpen, toggleSidebar, navigate }) => {
  const location = useLocation();

  // Helper function to check if a path is active
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`left-parent left-0 top-0 absolute h-full lg:h-auto  lg:relative xl:relative 2xl:relative   lg:w-[18%] xl:w-[18%] 2xl:w-[18%] w-[35%]  lg:flex xl:flex 2xl:flex justify-start items-start   bg-blue-950 z-10 ${
        isSidebarOpen ? "flex" : "hidden"
      }`}
      
    >
      <div className="left-subparent1 w-full h-full flex flex-col justify-start items-start gap-3 p-4">
        <span className="lg:hidden xl:hidden 2xl:hidden absolute lg:relative xl:relative 2xl:relative right-0 top-0 w-10 h-10 flex justify-center items-center text-2xl text-white cursor-pointer">
          <RxCross2 onClick={toggleSidebar} />
        </span>
        <span className="w-full items-center justify-start text-xl text-white">
          <span className="cursor-pointer" onClick={() => navigate('/admin')}>Admin Dashboard</span>
        </span>
        <div className="flex flex-col gap-4 mt-4 w-full">
          <nav className="flex flex-col justify-start items-start gap-3 w-full">
            <NavLink
              to="/admin/users"
              className={`flex w-full items-center justify-start gap-2 text-white hover:bg-blue-700 px-2 py-2 text-lg ${isActive('/admin/users') ? 'bg-blue-800' : ''}`}
            >
              <span>
                <FaUsers />
              </span>
              Users
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={`flex w-full items-center justify-start gap-2 text-white hover:bg-blue-700 px-2 py-2 text-lg capitalize ${isActive('/admin/orders') ? 'bg-blue-800' : ''}`}
            >
              <span>
                <FaClipboardList />
              </span>
              Orders
            </NavLink>
            <NavLink
              to="/admin/products"
              className={`flex w-full items-center justify-start gap-2 text-white hover:bg-blue-700 px-2 py-2 text-lg capitalize ${isActive('/admin/products') ? 'bg-blue-800' : ''}`}
            >
              <span>
                <AiFillProduct />
              </span>
              Products
            </NavLink>
            <NavLink
              to="/admin/coupons"
              className={`flex w-full items-center justify-start gap-2 text-white hover:bg-blue-700 px-2 py-2 text-lg capitalize ${isActive('/admin/shop') ? 'bg-blue-800' : ''     }`}
            >
              <span>
              <RiCoupon3Line />
              </span>
              Coupon
            </NavLink>
            <NavLink
              to="/admin/shop"
              className={`flex w-full items-center justify-start gap-2 text-white hover:bg-blue-700 px-2 py-2 text-lg capitalize ${isActive('/admin/shop') ? 'bg-blue-800' : ''     }`}
            >
              <span>
                <AiOutlineShop />
              </span>
              Shop
            </NavLink>
          </nav>
        </div>
        <button
          className="w-full h-[40px] rounded-sm hover:scale-95 transition-all duration-300 gap-2 bg-red-600 text-white flex justify-center items-center"
          onClick={() => navigate("/")}
        >
          <span>
            <MdLogout />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
