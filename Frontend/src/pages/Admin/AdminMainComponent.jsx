import React from "react";
import { RxHamburgerMenu } from "react-icons/rx"; // For Remix icons
import { GrUserAdmin } from "react-icons/gr";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminUser from "./AdminUser";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminShop from "./AdminShop";
import AdminDashboard from "./AdminDashboard";
import AdminOrderDetails from "./AdminOrderDetails";
import AdminCreateProduct from "./AdminCreateProduct";
import AdminEditProduct from "./AdminEditProduct";
import AdminCoupon from "./AdminCoupon";


const AdminMainComponent = ({
  isSidebarOpen,
  toggleSidebar,
  showHamburger,
  navigate,
}) => {
  return (
    <div className="lg:w-[100%] xl:w-[100%] 2xl:w-[100%] w-full min-h-screen flex flex-col justify-center items-center gap-8 lg:px-8 xl:px-8 2xl:px-8 px-2 bg-white relative pb-4 pt-4 overflow-hidden" >
      <div className="w-full items-center flex justify-start text-3xl font-bold px-2  gap-4" >
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className={`lg:hidden xl:hidden 2xl:hidden w-[45px] h-[45px] scale-animation rounded-full hover:scale-90 transition-all duration-300 bg-blue-600 text-white flex justify-center items-center cursor-pointer`}
          >
            <span onClick={toggleSidebar} className="cursor-pointer">
              {showHamburger ? (
                <RxHamburgerMenu className="flex justify-center items-center text-xl" />
              ) : (
                <GrUserAdmin className="flex justify-center items-center pl-1" />
              )}
            </span>
          </button>
        )}
        Admin Dashboard
      </div>

      {/* Your main content here */}
      <div className="w-full flex-1 flex flex-col justify-center items-center gap-6 overflow-y-auto">
        {/* Stats Cards */}

        <Routes>
          <Route path="users" element={<AdminUser  isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} showHamburger={showHamburger} navigate={navigate}/>} />
          <Route path="orders" element={<AdminOrders isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} showHamburger={showHamburger} navigate={navigate} />} />
          <Route path="products" element={<AdminProducts  isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} showHamburger={showHamburger} navigate={navigate}/>} />
          <Route path="shop" element={<AdminShop isSidebarOpen/>} />
          <Route path="orders/order/:orderId" element={<AdminOrderDetails isSidebarOpen/>} />
          <Route path="products/create" element={<AdminCreateProduct isSidebarOpen/>} />
          <Route path="products/manage/:productId" element={<AdminEditProduct isSidebarOpen/>} />
          <Route path="coupons" element={<AdminCoupon isSidebarOpen/>} />
          <Route path="*" element={<AdminDashboard isSidebarOpen/>} /> {/* Default view */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminMainComponent;
