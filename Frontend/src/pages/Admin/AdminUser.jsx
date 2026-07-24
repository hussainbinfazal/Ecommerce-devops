import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
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
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import {
  updateUserToAdmin,
  fetchUsers,
  deleteUserByAdmin,
} from "../../redux/adminSlices/adminUsersSlice";
import { toast } from "react-toastify";
import { BiSearchAlt2 } from "react-icons/bi";
const AdminDashboard = ({
  isSidebarOpen,
  toggleSidebar,
  navigate,
  setIsSidebarOpen,
}) => {
  const [scaleIcon, setScaleIcon] = useState(false);
  const { users, adminUsers } = useSelector((state) => state.admin);

  const [showHamburger, setShowHamburger] = useState(false); // New state for icon toggle
  const dispatch = useDispatch();
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState();
  const totalUsers = users.length;
  const totalAdminUsers = users.filter((user) => user.isAdmin == true).length;
  const totalNonAdminUsers = users.filter(
    (user) => user.isAdmin !== true
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
  const toggleAdminSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUsers()).unwrap(); // Wait until users are fetched
      } catch (err) {
        toast.error("Failed to fetch users.");
      }
    };

    fetchData();
  }, [dispatch]);

  const handleCancelEdit = (userId, originalStatus) => {
    setEditingUserId(null); // Exit editing mode
    setEditingStatus(originalStatus); // Reset status to the original
  };
  const handleEditClick = (userId, userStatus) => {
    if (editingUserId === userId) {
      setEditingUserId(null);
      setEditingStatus(userStatus);
    } else {
      setEditingUserId(userId);
      setEditingStatus(userStatus);
    }
  };
  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(searchTerm ? searchTerm.toLowerCase() : "") ||
      user._id.includes(searchTerm ? searchTerm : "") ||
      user.email
        .toLowerCase()
        .includes(searchTerm ? searchTerm.toLowerCase() : "") ||
      user.phoneNumber.includes(searchTerm ? searchTerm : "")
  );

  const handleDeleteUser = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      const response = await dispatch(deleteUserByAdmin(editingUserId));
      setEditingUserId(null);
      toast.success("User deleted successfully");
      await dispatch(fetchUsers()).unwrap();
    }
  };
  const handleUpdateStatus = async (userId, newStatus, isAdmin) => {
    try {
      // const trimmedNewStatus = newStatus.trim();
      const response = await dispatch(
        updateUserToAdmin({ userId, newStatus })
      ).unwrap();
      await dispatch(fetchUsers()).unwrap();
      toast.success("User updated successfully");
      setEditingUserId(null);
    } catch (error) {
      setEditingStatus(isAdmin ? "admin" : "user");
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
              <span className="font-semibold text-lg">Total Users</span>
              <span className="text-4xl mt-4">{totalUsers}</span>
            </div>
            <div className="w-1/3 h-full flex flex-col sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start justify-between items-start shadow-lg p-2  rounded-md lg:pl-4 xl:pl-4 2xl:pl-4  bg-white border border-gray-200 hover:bg-gray-100 transition-colors duration-300">
              <span className="font-semibold text-lg">Total Admins</span>
              <span className="text-4xl mt-4">{totalAdminUsers}</span>
            </div>
            <div className="w-1/3 h-full flex flex-col sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start justify-between items-start shadow-lg p-2  rounded-md lg:pl-4 xl:pl-4 2xl:pl-4  bg-white border border-gray-200 hover:bg-gray-100 transition-colors duration-300">
              <span className="font-semibold text-lg">Non Admin Users</span>
              <span className="text-4xl mt-4">{totalNonAdminUsers}</span>
            </div>
          </div>
          <div className="w-full h-[85%] max-h-[600px]  px-2">
            <div className="text-2xl font-bold flex justify-between items-center py-2">
              <h2>
              Users
              </h2>
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
                    User ID
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2">
                  <span className="text-sm h-[90%] w-full flex items-center px-2">
                    Username
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2">
                  <span className="text-sm h-[90%] w-full flex items-center px-2">
                    User Profile
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2">
                  <span className="text-sm h-[90%] w-full flex items-center px-2">
                    User Status
                  </span>
                </div>
                <div className="w-[20%] h-[60px] flex justify-start items-center gap-2">
                  <span className="text-sm h-[90%] w-full flex items-center px-2">Actions</span>
                </div>
              </div>
              {/* we need to map orders here */}

              {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  return (
                    <div
                      key={user._id}
                      className="w-full flex h-[80px] justify-start items-center border-b-1 border-[#e4e7e8ef] hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="w-[30%] h-[70px] text-sm flex justify-start items-center gap-2 px-2  font-semibold p-3">
                        {user._id}{" "}
                      </div>
                      <div className="w-[20%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-start items-center gap-2 px-2  p-3">
                        {user.name.split(" ")[0]}{" "}
                      </div>
                      <div className="w-[20%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-start items-center gap-2 px-2 p-3">
                        <img
                          src={
                            user.profileImage
                              ? // Add"import.meta.env.VITE_API_URL + user.profileImage" to handle the case where the image is not a full URL
                                user.profileImage || `${import.meta.env.VITE_API_URL}/uploads/userprofile/${user.profileImage}`
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
                              editingUserId === user._id
                                ? editingStatus
                                : user.isAdmin
                                ? "admin"
                                : "user"
                            }
                            disabled={editingUserId !== user._id}
                            onChange={(event) => {
                              // Define the event parameter here
                              setEditingStatus(event.target.value);
                            }}
                            className={` rounded border p-2 ${
                              editingUserId === user._id
                                ? "border-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                          <div className="p-2 ">
                            
                          </div>
                        </div>
                      </div>
                      {editingUserId === user._id ? (<div
                        className={`w-[20%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-between items-center gap-2 px-2 `}
                      >
                        <button
                          className={`w-[80px] h-[40px] bg-rose-500 text-white text-sm rounded-sm ${
                            editingUserId === user._id && editingUserId
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                          disabled={editingUserId !== user._id}
                          onClick={() => {
                            handleUpdateStatus(
                              user._id,
                              editingStatus,
                              user.isAdmin
                            );
                          }}
                        >
                          Update
                        </button>
                        <button
                          className={`w-[80px] h-[40px] bg-rose-500 text-white text-sm rounded-sm ${
                            editingUserId === user._id && editingUserId
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                          onClick={handleDeleteUser}
                          disabled={editingUserId !== user._id}
                        >
                          Delete
                        </button>
                        <RxCross2
                                className="w-5 h-5 cursor-pointer"
                                onClick={() =>
                                  handleCancelEdit(
                                    user._id,
                                    user.isAdmin ? "admin" : "user"
                                  )
                                }
                              />
                      </div>):(<div className="w-[20%] h-[70px] text-sm md:text-lg lg:text-lg xl:text-lg 2xl:text-lg flex justify-between items-center gap-2 px-2"><CiEdit
                                className="w-5 h-5 cursor-pointer text-blue-500 "
                                onClick={() =>
                                  handleEditClick(
                                    user._id,
                                    user.isAdmin ? "admin" : "user"
                                  )
                                }
                              /></div>)}
                    </div>
                  );
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <span className="text-2xl font-bold">
                    No Users Found {`${searchTerm ? searchTerm : ""}`}
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

export default AdminDashboard;
