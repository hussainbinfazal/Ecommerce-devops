import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect } from "react";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import { Link, NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  updateOrderStatus,
  fetchOrders,
  fetchSingleOrder,
  deleteOrderByAdmin,
  resetDeleteFlag
} from "../../redux/adminSlices/adminOrdersSlice";

import { toast } from "react-toastify";
import { BiSearchAlt2 } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const AdminOrders = ({
  isSidebarOpen,
  toggleSidebar,
  navigate,
  setIsSidebarOpen,
}) => {
  const [scaleIcon, setScaleIcon] = useState(false);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  const [showHamburger, setShowHamburger] = useState(false); // New state for icon toggle
  const dispatch = useDispatch();
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState();
  const totalOrders = orders.length;
  const totalOrdersToday = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
  
    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    );
  }).length;
  const totalPendingOrders = orders.filter(
    (order) => order.status == "Pending"
  ).length;
  const selectRef = useRef();
  const maxLength = 50;
  const path = window.location.pathname[1];

  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/9187/9187604.png";

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
 

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        await dispatch(fetchOrders()).unwrap(); // Wait until users are fetched
      } catch (err) {
        toast.error("Failed to fetch users.");
      }
    };

    fetchOrdersData();
  }, [dispatch]);

  const { isShown } = useSelector((state) => state.order);

  useEffect(() => {
    if (isShown) {
      toast.success("Order deleted successfully!");
      dispatch(resetDeleteFlag()); // reset so it doesn't show again
    }
  }, [dispatch]);
  const handleCancelEdit = (orderId, originalStatus) => {
    setEditingOrderId(null); // Exit editing mode
    setEditingStatus(originalStatus); // Reset status to the original
  };
  const handleEditClick = (orderId, orderStatus) => {
    if (editingOrderId === orderId) {
      setEditingOrderId(null);
      setEditingStatus(orderStatus);
    } else {
      setEditingOrderId(orderId);
      setEditingStatus(orderStatus);
    }
  };
  const statusPriority = {
    Pending: 1,
    Shipped: 2,
    Delivered: 3,
    Returned: 4,
    Refunded: 5,
    Completed: 6,
    Cancelled: 7,
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm ? searchTerm.toLowerCase() : "";

    return (
      order.user?.name?.toLowerCase().includes(search) ||
      order.user?.email?.toLowerCase().includes(search) ||
      order.user?._id?.toLowerCase().includes(search) ||
      order.shippingAddress?.address?.toLowerCase().includes(search) ||
      order.shippingAddress?.city?.toLowerCase().includes(search) ||
      order.shippingAddress?.postalCode?.toLowerCase().includes(search) ||
      order.shippingAddress?.country?.toLowerCase().includes(search) ||
      order.paymentMethod?.toLowerCase().includes(search) ||
      order.paymentResult?.email_address?.toLowerCase().includes(search) ||
      order.orderItems.some((item) => item.name?.toLowerCase().includes(search))
    );
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const aPriority = statusPriority[a.status] || 999;
    const bPriority = statusPriority[b.status] || 999;
    return aPriority - bPriority;
  });

  const handleDeleteOrder = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this order?");
    if (isConfirmed) {
      const response = await dispatch(deleteOrderByAdmin(editingOrderId));
      setEditingOrderId(null);
      toast.success("Order deleted successfully");
      await dispatch(fetchOrders()).unwrap();
    }
  };
  const handleUpdateStatus = async (orderId, orderStatus) => {
    try {
      // const trimmedNewStatus = newStatus.trim();
      const response = await dispatch(
        updateOrderStatus({ orderId, orderStatus })
      ).unwrap();
      await dispatch(fetchOrders()).unwrap();
      toast.success("Order updated successfully");
      setEditingOrderId(null);
    } catch (error) {
      // setEditingStatus(isPaid ? "admin" : "user");
      toast.error("Failed to update user status");
    }
  };

  return (
    <div className="adminpage w-full flex-1 max-h-screen flex flex-col justify-start bg-white items-center pr-5 ">
      {/* right */}
      <div className="lg:w-[100%] xl:w-[100%] 2xl:w-[100%] w-full h-full flex flex-col justify-center items-center gap-8  lg:px-2 xl:px-2 2xl:px-2 px-2  bg-white relative z-0 pb-4 ">
        <div className="w-full flex-1 flex flex-col justify-start items-start gap-6 ">
          <div className="w-full sm:h-[15%] md:h-[15%] lg:h-[15%] xl:h-[15%] 2xl:h-[15%] h-[20%]  flex justify-start items-center gap-8 px-2">
            <div className="w-1/3 h-full flex flex-col sm:justify-start md:justify-center lg:justify-start xl:justify-start 2xl:justify-start justify-between items-start shadow-lg p-2  rounded-md lg:pl-4 xl:pl-4 2xl:pl-4  bg-white border border-gray-200 hover:bg-gray-100 transition-colors duration-300">
              <span className="font-semibold text-lg">Total Orders</span>
              <span className="text-4xl mt-4">{totalOrders}</span>
            </div>
            <div className="w-1/3 h-full flex flex-col sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start justify-between items-start shadow-lg p-2  rounded-md lg:pl-4 xl:pl-4 2xl:pl-4  bg-white border border-gray-200 hover:bg-gray-100 transition-colors duration-300">
              <span className="font-semibold text-lg">
                Total Pending Orders
              </span>
              <span className="text-4xl mt-4">{totalPendingOrders}</span>
            </div>
            <div className="w-1/3 h-full flex flex-col sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start justify-between items-start shadow-lg p-2  rounded-md lg:pl-4 xl:pl-4 2xl:pl-4  bg-white border border-gray-200 hover:bg-gray-100 transition-colors duration-300">
              <span className="font-semibold text-lg">Today's Orders</span>
              <span className="text-4xl mt-4">{totalOrdersToday}</span>
            </div>
          </div>
          <div className="w-full h-[85%] max-h-[600px]  px-2">
            <div className="text-2xl font-bold flex justify-between items-center py-2">
              <h2>Users</h2>
              <div className="max-w-[280px] h-full relative flex items-center font-medium rounded-md border-2 border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <input
                  value={searchTerm}
                  type="text"
                  maxLength={maxLength}
                  placeholder="Search User"
                  className="w-full h-full text-lg p-3 pl-4 pr-20 rounded-md border-none outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />

                {/* Clear button */}
                {searchTerm && (
                  <button
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors duration-300"
                    onClick={() => {
                      setSearchTerm("");
                    }}
                  >
                    <RxCross2 className="w-5 h-5" />
                  </button>
                )}

                {/* Search button */}
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => {
                  }}
                >
                  <BiSearchAlt2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="w-full max-h-[590px]  flex flex-col justify-start items-start overflow-scroll gap- pb-2">
              <div className="w-full h-[70px] flex justify-start items-center bg-gray-100 text-lg font-bold  text-gray-600 rounded-md">
                <div className="w-[30%] h-[60px] flex justify-start items-center gap-2">
                  <span className="text-sm h-[90%] w-full flex items-center  px-2 ">
                    Order ID
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2">
                  <span className="text-sm h-[90%] w-full flex items-center px-2">
                    Username
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2">
                  <span className="text-sm h-[90%] w-full flex items-center px-2">
                    Order Profile
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2">
                  <span className="text-sm h-[90%] w-full flex items-center px-2">
                    Order Status
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2">
                  <span className="text-sm h-[90%] w-full flex items-center px-2">
                    Actions
                  </span>
                </div>
              </div>
              {/* we need to map orders here */}

              {Array.isArray(sortedOrders) && sortedOrders.length > 0 ? (
                sortedOrders.map((order, index) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(`/admin/orders/order/${order._id}`);
                      }}
                      key={order._id}
                      className="w-full flex h-[80px] justify-start items-center border-b-1 border-[#e4e7e8ef] hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="w-[30%] h-[70px] text-sm flex justify-start items-center gap-2 px-2  font-semibold p-3">
                        {order._id}{" "}
                      </div>
                      <div className="w-[20%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-start items-center gap-2 px-2  p-3">
                        {order.user?.name.split(" ")[0]}{" "}
                      </div>
                      <div className="w-[20%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-start items-center gap-2 px-2 p-3">
                        <img
                          src={
                            order.user?.profileImage
                              ? // Add "import.meta.env.VITE_API_URL + user.profileImage" before the url to preview the image
                                order.user?.profileImage.startsWith("http")
                              ? order.user?.profileImage : `${import.meta.env.VITE_API_URL}/uploads/userProfileImages/${order.user?.profileImage}`
                              : defaultImage
                          }
                          className="w-[50px] h-[50px] rounded-full"
                          alt=""
                        />
                      </div>
                      <div className="w-[20%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-start items-center gap-2 px-2 p-3">
                        <div className="flex justify-between">
                          <select
                            name="status"
                            id=""
                            value={
                              editingOrderId === order._id
                                ? editingStatus
                                : order.status == "Pending"
                                ? "Pending"
                                : order.status == "Shipped"
                                ? "Shipped"
                                : order.status == "Delivered"
                                ? "Delivered"
                                : order.status == "Cancelled"
                                ? "Cancelled"
                                : order.status == "Returned"
                                ? "Returned"
                                : order.status == "Refunded"
                                ? "Refunded"
                                : order.status == "completed"
                                ? "completed"
                                : "Pending"
                            }
                            disabled={editingOrderId !== order._id}
                            onChange={(event) => {
                              // Define the event parameter here
                              setEditingStatus(event.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className={` rounded border p-2 ${
                              editingOrderId === order._id
                                ? "border-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Returned">Returned</option>
                            <option value="Refunded">Refunded</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <div className="p-2 "></div>
                        </div>
                      </div>
                      {editingOrderId === order._id ? (
                        <div
                          className={`w-[20%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-between items-center gap-2 px-2  `}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className={`w-[80px] h-[40px] bg-rose-500 text-white text-sm rounded-sm ${
                              editingOrderId === order._id && editingOrderId
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            }`}
                            disabled={editingOrderId !== order._id}
                            onClick={() => {
                              
                              
                              handleUpdateStatus(order._id, editingStatus);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className={`w-[80px] h-[40px] bg-rose-500 text-white text-sm rounded-sm ₹{
                              editingOrderId === order._id && editingOrderId
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            }`}
                            onClick={handleDeleteOrder}
                            disabled={editingOrderId !== order._id}
                          >
                            Delete
                          </button>
                          <RxCross2
                            className="w-5 h-5 cursor-pointer"
                            onClick={() =>
                              handleCancelEdit(
                                order._id,
                                order.status ? order.status : "pending"
                              )
                            }
                          />
                        </div>
                      ) : (
                        <div className="w-[20%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-between items-center gap-2 px-2">
                          <CiEdit
                            className="w-5 h-5 cursor-pointer text-blue-500 "
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(
                                order._id,
                                order.status ? order.status : "pending"
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <span className="text-2xl font-bold">
                    No Orders Found {`${searchTerm ? searchTerm : ""}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
