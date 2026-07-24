import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/slices/userSlice";
import { updateProfile } from "../../redux/slices/userSlice";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
const Profilepage = () => {
  const pathnames = useLocation().pathname.split("/").filter(Boolean);
  const [changePassword, setChangePassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPreview, setIsPreview] = useState("");
  const passwordInputRef = useRef(null);
  const profilePictureInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toggleChangePasswordButton = () => {
    setChangePassword(!changePassword);
    if (!changePassword) {
      // Use setTimeout to ensure the input is enabled before focusing
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 0);
    } else {
      // Clear the input value when closing the password input
      passwordInputRef.current?.blur();
    }
  };
  const handleFileUpdate = (e) => {
    e.preventDefault();
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const previewURL = URL.createObjectURL(file); // Generate preview URL
      setIsPreview(previewURL); // Set preview URL
      setProfileImage(file); // Set the image preview (or handle as needed)
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (firstName) {
      if (firstName.length < 3 && firstName !== "") {
        alert("First Name must be at least 3 characters long");
        return;
      }
      if (firstName.length > 20) {
        alert("First Name must be at most 20 characters long");
        return;
      }

      formData.append("name", `${firstName}`);
    }
    formData.append("email", email);
    formData.append("password", password);

    formData.append("profileImage", profileImage);
    formData.append("phoneNumber", phoneNumber);
    const userData = formData;


    setIsPreview(null);
    setIsEditing(false);
    try {
      const response = await dispatch(updateProfile(userData)).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
    }
  };
  useEffect(() => {
    const userData = user; // Fallback to user itself if no nested `user`
    const name = userData?.name || "";

    setFirstName(name.split(" ")[0] || "");
    setEmail(userData?.email || "");
    setProfileImage(userData?.profilePicture || "");
    setPhoneNumber(userData?.phoneNumber || "");
  }, [user]);
  // useEffect(() => {
  //   if (!user) {
  //     dispatch(loadUser());
  //   }
  // }, [user, dispatch]);

  return (
    <div className="w-full  h-screen overflow-auto flex justify-center items-start pt-8">
      <div className="w-6/7 h-full flex flex-col md:flex-col lg:flex-col xl:flex-col 2xl:flex-col justify-start items-center px-0 lg:px-4 xl:px-4 2xl:px-4 ">
        <div className="w-full h-[150px] flex justify-between items-center">
          <div className="w-1/2 h-full flex items-center justify-center">
            <div className=" lg:w-full xl:w-full 2xl:w-full w-full h-full  flex items-center gap-2 py-4 px-2   text-sm">
              <Link to="/" className="text-gray-600 hover:text-blue-500">
                Home
              </Link>
              {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;

                return (
                  <React.Fragment key={name}>
                    <MdKeyboardArrowRight className="text-gray-500" />
                    {isLast ? (
                      <span className="text-gray-900 font-medium capitalize">
                        {name}
                      </span>
                    ) : (
                      <Link
                        to={routeTo}
                        className="text-gray-600 hover:text-blue-500 capitalize"
                      >
                        {name}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="w-1/2 h-full flex items-center justify-end capitalize">
            welcome {firstName} !
          </div>
        </div>

        <div className="w-full h-full flex  justify-center items-start pt-2 ">
          <div className="lg:w-[30%] xl:w-[30%] 2xl:w-[30%] h-full w-full absolute lg:relative xl:relative 2xl:relative  hidden lg:flex xl:flex 2xl:flex z-10">
            {/* profilepage */}
            <div className="w-full flex flex-col justify-start items-start gap-5  text-black">
              <ul>
                <li className="font-semibold">Manage My Account</li>
              </ul>
              <div className="w-full justify-start items-center gap-2">
                <ul className="w-4/5 flex justify-start flex-col pl-10">
                  <li
                    className="w-[60%] flex justify-start items-center hover:text-red-500 text-black"
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    My Profile
                  </li>
                  <li className="w-[60%] flex justify-start items-center hover:text-red-500 text-black">
                    Address Book
                  </li>
                  <li className="w-[60%] flex justify-start items-cente hover:text-red-500 text-blackr">
                    My Payment Options
                  </li>
                </ul>
              </div>
              <ul>
                <li className="font-semibold">My Orders</li>
              </ul>
              <div className="w-full justify-start items-center gap-2">
                <ul className="w-4/5 flex justify-start flex-col pl-10">
                  <li
                    className="w-[60%] flex justify-start items-center hover:text-red-500 text-black cursor-pointer"
                    onClick={() => {
                      navigate("/orders");
                    }}
                  >
                    My Returns
                  </li>
                  <li
                    className="w-[60%] flex justify-start items-center hover:text-red-500 text-black cursor-pointer"
                    onClick={() => {
                      navigate("/orders");
                    }}
                  >
                    My Cancellations
                  </li>
                  <li
                    className="w-[60%] flex justify-start items-center hover:text-red-500 text-black cursor-pointer"
                    onClick={() => {
                      navigate("/orders");
                    }}
                  >
                    My Returned Order
                  </li>
                </ul>
              </div>
              <ul>
                <li className="font-semibold  text-black">
                  Manage My Wishlist
                </li>
              </ul>
            </div>
          </div>
          {/* Right  */}
          <div className="lg:w-[70%] xl:w-[70%] 2xl:w-[70%] w-full  gap-2">
            <div
              className={`w-full flex justify-center shadow-2xl  ${
                isEditing
                  ? isPreview
                    ? "h-[900px]"
                    : "h-[750px]"
                  : "h-[640px]"
              } rounded-md lg:mb-[200px] xl:mb-[200px] 2xl:mb-[200px] bg-white`}
            >
              <div className="w-4/5 h-[400px] flex flex-col justify-start items-start gap-8 pt-12 ">
                <div className="flex justify-between w-full">
                  <h2 className="text-red-500 text-2xl">Edit your profile</h2>
                  {user?.user?.isAdmin && (
                    <h2 className="text-black-500 text-2xl pr-12">Admin</h2>
                  )}
                </div>
                <form action="" className="flex flex-col gap-4 w-full">
                  <div className="w-full h-[80px] flex justify-between">
                    <span className="w-full h-[80px] pr-0 lg:pr-12 xl:pr-12 2xl:pr-12 flex flex-col justify-between">
                      <label htmlFor="" className="h-[20px]">
                        Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        maxLength={50}
                        disabled={!isEditing}
                        className="w-full h-[calc(100%-30px)]  bg-[#d2cdcd] focus:bg-[#F5F5F5] outline-none pl-2 text-xl rounded-md capitalize"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </span>
                  </div>
                  <div className="w-full h-[160px] lg:h-[80px] xl:h-[80px] 2xl:h-[80px]  flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between gap-2">
                    <span className="w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 h-[80px] pr-0 lg:pr-12 xl:pr-12 2xl:pr-12 flex flex-col justify-between">
                      <label htmlFor="" className="h-[20px]">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        maxLength={30}
                        disabled={!isEditing}
                        className="w-full h-[calc(100%-30px)]  bg-[#d2cdcd] focus:bg-[#F5F5F5] outline-none pl-2 text-xl rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </span>
                    <span className="w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 h-[80px] pr-0 lg:pr-12 xl:pr-12 2xl:pr-12 flex flex-col justify-between">
                      <label htmlFor="" className="h-[20px]">
                        Number
                      </label>
                      <input
                        type="text"
                        maxLength={10}
                        value={phoneNumber}
                        disabled={!isEditing}
                        className="w-full h-[calc(100%-30px)]  bg-[#d2cdcd] focus:bg-[#F5F5F5] outline-none pl-2 text-xl rounded-md"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </span>
                  </div>
                  <div className="w-full h-[110px] flex justify-between">
                    <span
                      className={`w-full h-[110px] pr-0 lg:pr-12 xl:pr-12 2xl:pr-12 flex flex-col justify-between gap-2`}
                    >
                      <label htmlFor="" className="h-[20px]">
                        Password
                      </label>
                      <input
                        type="email"
                        ref={passwordInputRef}
                        className={`w-full h-[calc(100%-30px)]  bg-[#d2cdcd] outline-none pl-2 text-xl rounded-md  ${
                          changePassword ? "focus:bg-[#F5F5F5]" : ""
                        }`}
                        disabled={!changePassword}
                      />
                      <span
                        className="justify-end flex w-full h-[20px] cursor-pointer"
                        onClick={toggleChangePasswordButton}
                      >
                        Change Password
                      </span>
                    </span>
                  </div>
                  {isEditing && !isPreview && (
                    <div className="w-full h-[60px] flex justify-start">
                      <span
                        className={`w-full h-[60px] pr-12 flex flex-col justify-start gap-1`}
                      >
                        <label htmlFor="" className="h-[20px]">
                          Profile Picture
                        </label>
                        <span>
                          <button
                            className="cursor-pointer hover:scale-105 transition-all duration-300 bg-red-500 text-white h-[40px] w-[200px] rounded-md"
                            onClick={(e) => {
                              e.preventDefault();
                              profilePictureInputRef.current.click();
                            }}
                          >
                            Select Profile Picture
                          </button>
                        </span>
                        <input
                          type="file"
                          ref={profilePictureInputRef}
                          className={`w-full h-[calc(100%-30px)]  bg-[#d2cdcd] outline-none pl-2 text-xl rounded-md  hidden`}
                          onChange={(e) => {
                            handleFileUpdate(e);
                          }}
                        />
                      </span>
                    </div>
                  )}
                  {isPreview && isEditing && (
                    <div className="w-full h-[200px] flex justify-start">
                      <span
                        className={`w-full h-[200px] pr-0 lg:pr-12 xl:pr-12 2xl:pr-12 flex flex-col justify-start gap-1`}
                      >
                        {/* ${import.meta.env.VITE_API_URL} */}
                        <img
                          src={`${isPreview}`}
                          className="w-[200px] h-[200px] p-2 rounded-md relative"
                          alt=""
                        />
                        <button
                          className="absolute cursor-pointer hover:scale-105 transition-all duration-300 bg-red-500 text-white h-[20px] w-[20px] rounded-full flex items-center justify-center border-none outline-none"
                          onClick={() => {
                            setIsPreview(null);
                          }}
                        >
                          <RxCross2 />
                        </button>
                      </span>
                    </div>
                  )}

                  <div className="w-full h-[60px] flex justify-end mt-8 gap-4">
                    <span
                      className={`w-[700px] h-[60px] pr-0 lg:pr-12 xl:pr-12 2xl:pr-12 flex flex-row justify-end gap-6`}
                    >
                      {isEditing && (
                        <label
                          htmlFor=""
                          className="h-full w-[1/4] flex items-center justify-center cursor-pointer"
                          onClick={() => {
                            toggleChangePasswordButton();
                            setIsEditing(false);
                          }}
                        >
                          Cancel
                        </label>
                      )}
                      <label
                        htmlFor=""
                        className="h-full w-[1/4] flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          setIsEditing(true);
                        }}
                      >
                        Edit
                      </label>

                      <span
                        className="lg:justify-center xl:justify-center 2xl:justify-center justify-end flex h-full cursor-pointer w-[150px] lg:w[150px] xl:w-[150px] 2xl:w-[150px]"
                        onClick={() => {
                          setIsEditing(!isEditing);
                        }}
                      >
                        <button
                          type="submit"
                          className="w-full h-full flex justify-center items-center bg-red-500/80 text-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer"
                          onClick={handleUpdate}
                        >
                          Update Profile
                        </button>
                      </span>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
