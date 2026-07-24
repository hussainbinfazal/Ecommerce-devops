import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { contactUs } from "@/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Feedback = () => {
  const pathnames = useLocation().pathname.split("/").filter(Boolean);
  const [changePassword, setChangePassword] = useState(false);
  const passwordInputRef = useRef(null);
  const [isClick, setIsClick] = useState(false);

  const [message, setMessage] = useState("");
  const[name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const toggleChangePasswordButton = () => {
    setChangePassword(!changePassword);
    if (changePassword) {
      // Use setTimeout to ensure the input is enabled before focusing
      setTimeout(() => {
        passwordInputRef.current?.blur();
      }, 0);
    }
  };

  const handleSubmit = async(e) => {
    console.log("function called")
    e.preventDefault();
    try{

      const response = await dispatch(contactUs(message ));
      toast.success("Message sent successfully!");
      setMessage("");
      setName("");
      setEmail("");
      setLastName("");
      setAddress("");
      navigate("/");
    }catch (error) {
      console.error("Error submitting form:", error); 
      return toast.error("Failed to send message. Please try again.");
    }
  }
  useEffect(() => {}, [changePassword]);
  return (
    <div className="w-full  h-full overflow-auto flex justify-center items-start pt-8">
      <div className="lg:w-6/7 xl:w-6/7 2xl:w-6/7 w-full h-full flex flex-col md:flex-col lg:flex-col xl:flex-col 2xl:flex-col justify-start items-center px-4 ">
        <div className="w-full lg:h-[150px] xl:h-[150px] 2xl:h-[150px] h-[100px] flex justify-between items-center">
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
          <div className="lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-2/5  h-full flex items-center justify-end text-sm lg:text-lg xl:text-lg 2xl:text-lg">
            welcome Hussain Khan!
          </div>
        </div>

        <div className="w-full h-full flex flex-col lg:flex-row xl:flex-row 2xl:flex-row  justify-center items-start pt-2 gap-8 lg:gap-0 xl:gap-0 2xl:gap-0">
          <div className="lg:w-[30%] xl:w-[30%] 2xl:w-[30%] w-full h-full ">
            {/* profilepage */}
            <div className="lg:w-4/5 xl:w-4/5 2xl:w-4/5 w-full h-full flex flex-col justify-start items-start gap-1 rounded-md shadow-2xl text-black px-6 py-6">
              <div className="w-full h-1/2 flex flex-col justify-start items-center gap-4  border-b-2 py-4">
                <ul className="w-full">
                  <li className="font-semibold flex gap-4 justify-start items-center">
                    <span className="w-[50px] h-[50px] bg-red-500 flex justify-center items-center rounded-full">
                      <IoCallOutline className="text-white text-lg" />
                    </span>{" "}
                    Call to us
                  </li>
                </ul>
                <ul className="w-full flex justify-start flex-col pl-0 gap-2">
                  <li className="w-full h-[30px] flex justify-start items-cente text-[14px]  hover:text-red-500 text-black">
                    We are available 24/7, 7 days a week.
                  </li>
                  <li className="w-full flex justify-start items-center  hover:text-red-500 text-black">
                    Phone: +9852364170987
                  </li>
                </ul>
              </div>
              <div className="w-full justify-start h-1/2 flex flex-col items-center gap-4   py-4">
                <ul className="w-full">
                  <li className="font-semibold flex gap-4 justify-start items-center">
                    <span className="w-[50px] h-[50px] bg-red-500 flex justify-center items-center rounded-full">
                      <MdOutlineEmail className="text-white text-lg" />
                    </span>
                    Write to us
                  </li>
                </ul>
                <ul className="w-full flex justify-start flex-col pl-0 gap-2">
                  <li className="w-full flex justify-start items-center hover:text-red-500 text-black">
                    My Returns
                  </li>
                  <li className="w-full flex justify-start items-center hover:text-red-500 text-black">
                    My Cancellations
                  </li>
                  <li className="w-full flex justify-start items-center hover:text-red-500 text-black">
                    My Payment Options
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Right  */}
          <div className="lg:w-[70%] xl:w-[70%] 2xl:w-[70%] w-full  h-[1000px]  gap-2">
            <div className="w full flex justify-center shadow-2xl min-h-[980px] lg:min-h-[800px] xl:min-h-[800px] 2xl:min-h-[800px] rounded-md mb-[200px]">
              <div className="w-4/5   h-[400px] flex flex-col justify-start items-start gap-8 pt-12 ">
                <div className="w-full lg:h-[80px] xl:h-[80px] 2xl:h-[80px] h-[180px] gap-4 flex lg:flex-row xl:flex-row 2xl:flex-row flex-col justify-between ">
                  <span className="lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full h-[80px] lg:pr-12  xl:pr-12 2xl:pr-12 flex flex-col justify-between">
                    <label htmlFor="" className="h-[20px]">
                      First Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="w-full h-[calc(100%-30px)]  bg-[#d2cdcd] focus:bg-[#F5F5F5] outline-none pl-2 text-xl rounded-md"
                    />
                  </span>
                  <span className="lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full h-[80px] lg:pr-12  xl:pr-12 2xl:pr-12 flex flex-col justify-between">
                    <label htmlFor="" className="h-[20px]">
                      Last Name
                    </label>
                    <input

                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      className="w-full h-[calc(100%-30px)]  bg-[#d2cdcd] focus:bg-[#F5F5F5] outline-none pl-2 text-xl rounded-md"
                    />
                  </span>
                </div>
                <div className="w-full lg:h-[80px] xl:h-[80px] 2xl:h-[80px] h-[180px] gap-4 lg:flex-row xl:flex-row 2xl:flex-row flex-col flex justify-between ">
                  <span className="lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full h-[80px] lg:pr-12  xl:pr-12 2xl:pr-12 flex flex-col justify-between">
                    <label htmlFor="" className="h-[20px]">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="w-full h-[calc(100%-30px)]  bg-[#d2cdcd] focus:bg-[#F5F5F5] outline-none pl-2 text-xl rounded-md"
                    />
                  </span>
                  <span className="lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full h-[80px] lg:pr-12  xl:pr-12 2xl:pr-12 flex flex-col justify-between">
                    <label htmlFor="" className="h-[20px]">
                      Address
                    </label>
                    <input

                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      className="w-full h-[calc(100%-30px)]  bg-[#d2cdcd] focus:bg-[#F5F5F5] outline-none pl-2 text-xl rounded-md"
                    />
                  </span>
                </div>
                <div className="w-full min-h-[350px] max-h-auto flex justify-between">
                  <span
                    className={`w-full min-h-[300px] max-h-auto lg:pr-12 xl:pr-12 2xl:pr-12 pr-0 flex flex-col justify-between gap-2`}
                  >
                    <label htmlFor="" className="h-[20px]">
                      Message
                    </label>
                    <textarea
                      ref={passwordInputRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`w-full h-[calc(100%-30px)]  bg-[#d2cdcd] outline-none pl-2 text-xl rounded-md focus:bg-[#F5F5F5]  ${
                        changePassword ? "" : "focus:bg-[#F5F5F5]"
                      }`}
                      onClick={() => {
                        setIsClick(!setIsClick);
                      }}
                    />
                  </span>
                </div>
                <div className="w-full h-[60px] flex justify-end mt-8 gap-4">
                  <span
                    className={`w-[700px] h-[60px] lg:pr-12 xl:pr-12 2xl:pr-12 pr-0 flex flex-row lg:justify-end xl:justify-end 2xl:justify-end justify-center gap-6`}
                  >
                    <label
                      htmlFor=""
                      className={`h-full w-[1/4] flex items-center justify-center cursor-pointer ${
                        isClick ? "" : "hidden"
                      }`}
                      onClick={toggleChangePasswordButton}
                    >
                      Cancel
                    </label>

                    <span className="justify-center flex h-full cursor-pointer w-[250px]">
                      <button className="w-full h-full flex justify-center items-center bg-red-500/80 text-white rounded-md hover:scale-105 transition-all duration-200 cursor-pointer" onClick={handleSubmit}>
                        Save Changes
                      </button>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
