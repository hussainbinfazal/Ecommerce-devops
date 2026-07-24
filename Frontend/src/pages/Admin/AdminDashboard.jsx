import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useCallback } from "react";
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
import { getProducts } from "../../redux/slices/productSlice";
import { fetchOrders } from "../../redux/adminSlices/adminOrdersSlice";

const AdminDashboard = ({ isSidebarOpen, toggleSidebar }) => {
  //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scaleIcon, setScaleIcon] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false); // New state for icon toggle
  const { orders } = useSelector((state) => state.adminOrders);
  console.log("Orderss", orders);
  const { products } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  setInterval(() => {
    scaleIcon ? setScaleIcon(false) : setScaleIcon(true);
  }, 1000);

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

  const totalOrders = (orders || []).filter(
    (order) => order.status === "Pending"
  ).length;
  const totalOrdersToday = (orders || []).filter((order) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  }).length;
  const totalOrdersThisMonth = (orders || []).filter((order) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return (
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  }).length;
  const totalOrdersThisWeek = (orders || []).filter((order) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    return orderDate >= firstDayOfWeek && orderDate <= lastDayOfWeek;
  }).length;

  const totalOrdersLast7Days = (orders || []).filter((order) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    return orderDate >= sevenDaysAgo && orderDate <= today;
  });

  const formatIndianCurrency = (num) => {
    if (num >= 10000000) return (num / 10000000).toFixed(2) + " Cr";
    if (num >= 100000) return (num / 100000).toFixed(2) + " L";
    if (num >= 1000) return (num / 1000).toFixed(2) + " K";
    return num.toFixed(2);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const totalRevenue = (orders || []).reduce((total, order) => {
    if (order.status === "Pending") {
      return total + order.totalPrice;
    }
    return total;
  }, 0);

  const totalProducts = (products || []).length;

  const fetchDetails = useCallback(async () => {
    try {
      const response = await dispatch(getProducts()).unwrap();
      const response2 = await dispatch(fetchOrders()).unwrap();
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <div className="adminpage w-full flex-1 max-h-screen flex flex-col justify-start bg-white items-center pr-5 ">
      {/* left */}

      {/* right */}
      <div className="lg:w-[100%] xl:w-[100%] 2xl:w-[100%] w-full h-full flex flex-col justify-center items-center gap-8  lg:px-2 xl:px-2 2xl:px-2 px-2  bg-white relative z-0 pb-4 ">
        <div className="w-full flex-1 flex flex-col justify-start items-start gap-6 ">
          <div className="w-full sm:h-[15%] md:h-[15%] lg:h-[15%] xl:h-[15%] 2xl:h-[15%] h-[20%]  flex justify-between items-center gap-8 px-2">
            <div className="w-1/3 h-full flex flex-col justify-start items-start shadow-2xl p-2  rounded-md lg:pl-4 xl:pl-4 2xl:pl-4">
              <span className="font-semibold">Revenue</span>
              <span className="text-2xl mt-2">
                ₹ {formatIndianCurrency(totalRevenue || 0)}
              </span>
            </div>
            <div className="w-1/3 h-full flex flex-col sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start justify-between items-start shadow-2xl p-2  rounded-md lg:pl-4 xl:pl-4 2xl:pl-4">
              <span className="font-semibold">Total Orders</span>
              <span className="text-2xl">{totalOrders || 0}</span>
              <span
                className="lg:text-sm xl:text-sm 2xl:text-sm text-[12px] text-blue-700 cursor-pointer"
                onClick={() => navigate("/admin/orders")}
              >
                Manage Orders
              </span>
            </div>
            <div className="w-1/3 h-full flex flex-col sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start justify-between items-start shadow-2xl p-2  rounded-md lg:pl-4 xl:pl-4 2xl:pl-4">
              <span className="font-semibold">Total Products</span>
              <span className="text-2xl">{totalProducts || 0}</span>
              <span
                className="lg:text-sm xl:text-sm 2xl:text-sm text-[12px] text-blue-700 cursor-pointer"
                onClick={() => navigate("/admin/products")}
              >
                Manage Products
              </span>
            </div>
          </div>
          <div className="w-full h-[85%] max-h-[600px]  px-2">
            <span className="text-2xl font-bold">Recent Orders</span>
            <div className="w-full max-h-[590px]  flex flex-col justify-start items-start overflow-scroll  pb-2">
              <div className="w-full h-[60px] flex justify-start items-center text-lg text-gray-700 font-bold rounded-md bg-gray-100">
                <div className="w-[40%] h-[60px] flex justify-start items-center gap-2 ">
                  <span className="text-sm h-[90%] w-full  flex items-center  px-2 ">
                    Order ID
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2 ">
                  <span className="text-sm h-[90%] w-full  flex items-center px-2">
                    Order Date
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2 ">
                  <span className="text-sm h-[90%] w-full  flex items-center px-2">
                    Order Status
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2 ">
                  <span className="text-sm h-[90%] w-full  flex items-center px-2">
                    Total Price
                  </span>
                </div>
              </div>
              {/* we need to map orders here */}

              {(totalOrdersLast7Days || []).map((order) => {
                return (
                  <div
                    className="w-full flex  justify-start items-center border-b-1 border-[#e4e7e8ef] hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/orders/order/${order?._id}`)
                    }
                  >
                    <div className="w-[40%] h-[60px] text-sm flex justify-start items-center gap-2 px-2  font-semibold p-3">
                      {order?._id}{" "}
                    </div>
                    <div className="w-[20%] h-[60px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-start items-center gap-2 px-2  p-3">
                      {formatDate(order?.createdAt)}{" "}
                    </div>
                    <div className="w-[20%] h-[60px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-start items-center gap-2 px-2 p-3">
                      {order?.status}
                    </div>
                    <div className="w-[20%] h-[60px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-start items-center gap-2 px-2 p-3">
                      ₹{Math.round(order?.totalPrice) || 0}{" "}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
