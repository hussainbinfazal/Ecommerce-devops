import React, { useEffect } from "react";
import { Form, Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiVisaLine } from "react-icons/ri";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  clearGuestCart,
  fetchCartItems,
} from "../../redux/slices/cartSlice";
import { createOrder, verifyOrder } from "../../redux/slices/orderSlice";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";

const Checkout = () => {
  const pathnames = useLocation().pathname.split("/").filter(Boolean);
  // const [orderItems,setOrderItems]=useState({
  //   name:"",
  //   qty:"",

  // });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { cart, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    apartment: "",
    building: "",
    floor: "",
    landmark: "",
    country: "",
    pinCode: "",
  });

  // Email Validator //
  const [emailError, setEmailError] = useState("");
  const isValidEmail = (email) => {
    // Basic email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setEmail(value);

    if (value && !isValidEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.trim();

    // Allow only digits or an empty string
    if (/^\d*$/.test(value)) {
      setPhone(value);
    } else {
      alert("Phone number must contain digits only");
    }
  };
  const handlePostalCodeChange = (e) => {
    //Optional //
    const value = e.target.value.trim();

    // Only update if it's digits or empty
    if (/^\d*₹/.test(value)) {
      setPostalCode(value);
    } else {
      alert("Postal code must contain digits only");
    }
  };

  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const verifyPayment = async (paymentData) => {
    try {
      const response = await dispatch(
        verifyOrder({
          orderId: paymentData.razorpay_order_id,
          paymentId: paymentData.razorpay_payment_id,
          signature: paymentData.razorpay_signature,
          cartId: cart?._id,
        })
      );

      if (!response.payload || response.payload.success !== true) {
        throw new Error("Payment verification failed");
      }

      return response.payload;
    } catch (error) {
      // console.error("Error verifying payment:", error);
      // Convert axios error to a more readable format
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            `Payment verification failed with status ${error.response.status}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error("No response received from verification server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(
          error.message || "Error setting up verification request"
        );
      }
    }
  };
  const handleBuyNow = async () => {
    if(!name || !email || !phone) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      // Check if user is logged in
      if (!isAuthenticated) {
        toast.error("Please login first");
        return router.push("/login");
      }

      // Show loading state
      toast.loading("Processing your purchase...");

      // Create an order object with course details
      const orderData = {
        shippingAddress: address,
        phone: phone,
        email: email,
        name: name,
        paymentMethod: "Razorpay",
        orderItems: cartItems,
        isPaid: false,
        cartId: cart?._id,
      };

      // Call API to create order and process payment
      const response = await dispatch(createOrder(orderData));
      const data = response.payload;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: cart.total * 100, // Amount in paisa
        currency: "INR",
        name: "QuickCart",
        description: `Purchase: ${cart?.cartItems[0]?.product?.name}`,
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          try {
            // Verify payment on backend
            toast.loading("Verifying payment...");

            const verification = await verifyPayment(response);

            if (verification.success == true) {
              toast.success(
                "Payment successful! You now track your order in your order history."
              );
              // Redirect to course page or dashboard
              toast.dismiss();
              dispatch(clearCart());
              dispatch(clearGuestCart());
              navigate("/orders");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            // console.error("Payment verification error:", error);
            toast.dismiss();
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || "",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            toast.dismiss();
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
      toast.dismiss();

      if (response.status === 201) {
        toast.success(" order created successfully!");
        navigate("/orders");

        // Redirect to course view page
      } else {
        toast.error(response || "Failed to process payment");
      }
    } catch (error) {
      // console.log("Error during payment:", error);
      toast.dismiss();
      toast.error(error.response?.data?.message || "Something went wrong");
      alert("Failed to initiate payment. Please try again.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const fetchCartDetails = async () => {
    await dispatch(fetchCartItems());
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartDetails();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center overflow-auto pb-20">
      <div className=" lg:w-6/7 xl:w-6/7 2xl:w-6/7 w-full  flex items-center gap-2 py-4 px-2   text-sm">
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
      <div className=" lg:w-6/7 xl:w-6/7 2xl:w-6/7 w-full min-h-screen flex lg:flex-row xl:flex-row 2xl:flex-row flex-col items-center gap-2 py- px-2   text-sm">
        <div className="lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full h-full ">
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="w-full h-[100px] flex justify-start  items-center text-black text-3xl  py-2 px-3 ">
              Billing Details
            </div>
            <div className="w-full h-[calc(100%-100px)] flex flex-col gap-8">
              {/* First Input */}
              <div className="w-full h-[80px]   px-2">
                <div className="h-full   border-gray-300  transition-colors duration-200  flex flex-col justify-start items-start">
                  <label
                    htmlFor="First Name"
                    className="h-[20px] w-full pl-1 mb-2"
                  >
                    First name<span className="text-red-500 pl-2">*</span>
                  </label>
                  <input
                    value={name}
                    type="text"
                    maxLength={50}
                    className="w-full h-[60px] bg-[#ded5d5] focus-within:bg-[#e7e7e7] border-none outline-none rounded-md placeholder:text-gray-500 placeholder:text-sm pl-2 text-lg capitalize"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full h-[80px]   px-2">
                <div className="h-full   transition-colors duration-200  flex flex-col justify-start items-start">
                  <label
                    htmlFor="First Name"
                    className="h-[20px] w-full pl-1 mb-2"
                  >
                    Postal Code<span className="text-red-500 pl-2">*</span>
                  </label>
                  <input
                    value={address.pinCode}
                    type="text"
                    maxLength={20}
                    className="w-full h-[60px] bg-[#ded5d5] border-none outline-none rounded-md placeholder:text-gray-500 placeholder:text-sm pl-2 text-lg focus-within:bg-[#e7e7e7]"
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        pinCode: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full h-[80px]   px-2">
                <div className="h-full  transition-colors duration-200  flex flex-col justify-start items-start">
                  <label
                    htmlFor="First Name"
                    className="h-[20px] w-full pl-1 mb-2"
                  >
                    Street Address<span className="text-red-500 pl-2">*</span>
                  </label>
                  <input
                    value={address.street}
                    type="text"
                    className="w-full h-[60px] bg-[#e7e7e7] border-none outline-none rounded-md placeholder:text-gray-500 placeholder:text-sm pl-2 text-lg focus-within:bg-[#e7e7e7]"
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        street: e.target.value.trim(),
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full h-[80px]   px-2">
                <div className="h-full   transition-colors duration-200  flex flex-col justify-start items-start">
                  <label
                    htmlFor="First Name"
                    className="h-[20px] w-full pl-1 mb-2"
                  >
                    Apartment,floor,etc (optional)
                    <span className="text-red-500 pl-2">*</span>
                  </label>
                  <input
                    value={address.apartment}
                    type="text"
                    className="w-full h-[60px] bg-[#ded5d5] border-none outline-none rounded-md placeholder:text-gray-500 placeholder:text-sm pl-2 text-lg focus-within:bg-[#e7e7e7]"
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        apartment: e.target.value.trim(),
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full h-[80px]   px-2">
                <div className="h-full  transition-colors duration-200  flex flex-col justify-start items-start ">
                  <label
                    htmlFor="First Name"
                    className="h-[20px] w-full pl-1 mb-2"
                  >
                    Town/City<span className="text-red-500 pl-2">*</span>
                  </label>
                  <input
                    value={address.city}
                    type="text"
                    className="w-full h-[60px] bg-[#ded5d5] border-none outline-none rounded-md placeholder:text-gray-500 placeholder:text-sm pl-2 text-lg focus-within:bg-[#e7e7e7] capitalize"
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        city: e.target.value.trim(),
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full h-[80px]   px-2">
                <div className="h-full  transition-colors duration-200  flex flex-col justify-start items-start">
                  <label
                    htmlFor="First Name"
                    className="h-[20px] w-full pl-1 mb-2"
                  >
                    State<span className="text-red-500 pl-2">*</span>
                  </label>
                  <input
                    value={address.state}
                    type="text"
                    className="w-full h-[60px] bg-[#ded5d5] border-none outline-none rounded-md placeholder:text-gray-500 placeholder:text-sm pl-2 text-lg focus-within:bg-[#e7e7e7] capitalize"
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        state: e.target.value.trim(),
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full h-[80px]   px-2">
                <div className="h-full  transition-colors duration-200  flex flex-col justify-start items-start">
                  <label
                    htmlFor="First Name"
                    className="h-[20px] w-full pl-1 mb-2"
                  >
                    Country<span className="text-red-500 pl-2">*</span>
                  </label>
                  <input
                    value={address.country}
                    type="text"
                    className="w-full h-[60px] bg-[#ded5d5] border-none outline-none rounded-md placeholder:text-gray-500 placeholder:text-sm pl-2 text-lg focus-within:bg-[#e7e7e7] capitalize"
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        country: e.target.value.trim(),
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full h-[80px]   px-2">
                <div className="h-full transition-colors duration-200  flex flex-col justify-start items-start">
                  <label
                    htmlFor="First Name"
                    className="h-[20px] w-full pl-1 mb-2"
                  >
                    Phone Number<span className="text-red-500 pl-2">*</span>
                  </label>
                  <input
                    value={phone}
                    maxLength={10}
                    type="text"
                    className="w-full h-[60px] bg-[#ded5d5] border-none outline-none rounded-md placeholder:text-gray-500 placeholder:text-sm pl-2 text-lg focus-within:bg-[#e7e7e7]"
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              <div className="w-full h-[80px]   px-2">
                <div className="h-full transition-colors duration-200  flex flex-col justify-start items-start">
                  <label
                    htmlFor="First Name"
                    className="h-[20px] w-full pl-1 mb-2"
                  >
                    Email Address<span className="text-red-500 pl-2">*</span>
                  </label>
                  <input
                    value={email}
                    type="text"
                    className="w-full h-[60px] bg-[#ded5d5] border-none outline-none rounded-md placeholder:text-gray-500 placeholder:text-sm pl-2 text-lg focus-within:bg-[#e7e7e7]"
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 xl:w-1/2 2xl:w-1/2 w-full h-full flex items-end justify-center mt-5">
          <div className="w-full lg:h-[calc(100%-100px)] xl:h-[calc(100%-100px)] 2xl:h-[calc(100%-100px)] h-full flex items-start justify-center">
            <div className="w-full h-full  flex flex-col justify-start items-center gap-4">
              <div className="w-full h-[50px] flex justify-center items-center text-2xl font-semibold">
                Items
              </div>
              <div className="w-4/5 max-h-[500px] overflow-auto  flex mt-5 flex-col gap-4">
                {/* product */}

                {cartItems?.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div className="w-full h-[60px] px-4 py-2 border border-gray-200  bg-white hover:bg-gray-50 rounded-md">
                      <div className="w-[4/5] h-full flex justify-start items-center gap-6 px-2">
                        <img
                          src={
                            item?.product?.productImage?.startsWith("http")
                              ? item?.product.productImage
                              : `${
                                  import.meta.env.VITE_API_URL
                                }/uploads/productImages/${
                                  item?.product?.productImage
                                }`
                          }
                          alt=""
                          className="w-[50px] h-[50px] object-contain"
                        />
                        <span className="w-[calc(100%-50px)] h-full flex justify-start items-center text-xl  text-[#1c1c1c]">
                          {item?.product?.name.toString()}
                        </span>
                        <span className="w-full h-full flex justify-end items-center text-xl  text-[#1c1c1c] ">
                          ₹ {Math.round(item?.product?.price)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full h-full flex justify-center items-center text-xl  text-[#1c1c1c]">
                    No Items
                  </div>
                )}
              </div>
              <div className="w-4/5 h-[300px] flex justify-start items-center  px-2 ">
                <div className="w-full h-full  flex flex-col">
                  {/* Mapping div */}
                  <div className="w-full h-[50px]  py-2 border-b-1 border-black mt-2">
                    <div className="w-full h-full flex justify-start items-center gap-6 ">
                      <span className="w- h-full flex justify-start items-center text-xl  text-[#1c1c1c]">
                        Subtotal:
                      </span>
                      <span className="w-full h-full flex justify-end items-center text-xl  text-[#1c1c1c] ">
                        ₹{Math.round(cart?.subTotal)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-[50px]  py-2 border-b-1 border-black mt-2">
                    <div className="w-full h-full flex justify-start items-center gap-6 ">
                      <span className="w- h-full flex justify-start items-center text-xl  text-[#1c1c1c]">
                        Shipping:
                      </span>
                      <span className="w-full h-full flex justify-end items-center text-xl  text-[#1c1c1c] ">
                        ₹{Math.round(cart?.shipping)}
                      </span>
                    </div>
                  </div>
                  {cart?.coupon?.discount > 0 && (
                    <div className="w-full h-[50px]  py-2 border-b-1 border-black mt-2">
                      <div className="w-full h-full flex justify-start items-center gap-6 ">
                        <span className="w- h-full flex justify-start items-center text-xl  text-[#1c1c1c]">
                          Discount:
                        </span>
                        <span className="w-full h-full flex justify-end items-center text-xl  text-[#1c1c1c] ">
                          -{cart?.coupon?.discount}%
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="w-full h-[50px]  py-2 border-b-1 border-black mt-2">
                    <div className="w-full h-full flex justify-start items-center gap-6 ">
                      <span className="w- h-full flex justify-start items-center text-xl  text-[#1c1c1c]">
                        Total:
                      </span>
                      <span className="w-full h-full flex justify-end items-center text-xl  text-[#1c1c1c] ">
                        ₹{Math.floor(cart?.total)}
                      </span>
                    </div>
                  </div>
                  {/* if You want COD or add Cash in the payment method so you can uncomment this part */}
                  {/* <div className="w-full h-[50px]  py-2  border-black mt-2 ">
                    <div className="w-full h-full flex justify-start items-center gap-6 ">
                      <span className="w-2/3 h-full flex justify-start items-center gap-2 ">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="w-6 h-6 appearance-none rounded-full border-black bg-white border-2 cursor-pointer checked:border-black relative focus:outline-none hover:border-black transition-all duration-200 after:content-[''] after:w-4 after:h-4 after:rounded-full after:absolute after:top-1/2 after:left-1/2  after:-translate-x-1/2 after:-translate-y-1/2 after:bg-black after:transition-all after:duration-200 after:scale-0 checked:after:scale-100 checked:bg-whitep-[3px]
  "
                        />
                        <span className=" h-full flex justify-start items-center text-xl  text-[#1c1c1c]">
                          Card
                        </span>
                        {/* Card logo */}
                  {/* </span> */}
                  {/* {paymentMethod === "card" && (
                        <div className="px-4 py-2 w-full">
                          <label className="text-lg font-medium mb-1">
                            Card Details
                          </label>
                          <div className="border border-gray-300 rounded-md p-2 bg-white">
                            <CardElement className="bg-white p-4 rounded-md border border-gray-300" />
                          </div>
                        </div>
                      )} */}
                  {/* <span className="w-1/2 flex justify-end items-center">
                        <span className=" h-full flex justify-end items-center gap-4">
                          <RiVisaLine className="text-blue-500 w-[50px] h-[50px]" />
                          <img
                            src="https://imgs.search.brave.com/4hEkQ_NKRAcd3jCwID2xmWuBsJfs5C6hWARqiMrqet4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dW5pdGVkc2lnbi5j/b20vY2RuL3Nob3Av/cHJvZHVjdHMvVS1N/RC02MS0yXzQ1MHgy/NjkuanBnP3Y9MTUz/NDQ0OTE1Nw"
                            alt=""
                            className="w-[50px] h-[30px]"
                          />
                        </span>
                      </span> */}
                  {/* </div> */}
                  {/* </div> */}
                  {/* <div className="w-full h-[50px]  py-2 border-black mt-2 ">
                    <div className="w-full h-full flex justify-start items-center gap-6 ">
                      <span className=" w-full md:w-2/3 lg:w-2/3 xl:w-1/2 2xl:w-1/2 h-full flex justify-start items-center gap-2 ">
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          checked={paymentMethod === "cash"}
                          onChange={() => setPaymentMethod("cash")}
                          className="w-6 h-6 appearance-none rounded-full border-black bg-white border-2 cursor-pointer checked:border-black relative focus:outline-none hover:border-black transition-all duration-200 after:content-[''] after:w-4 after:h-4 after:rounded-full after:absolute after:top-1/2 after:left-1/2  after:-translate-x-1/2 after:-translate-y-1/2 after:bg-black after:transition-all after:duration-200 after:scale-0 checked:after:scale-100 checked:bg-whitep-[3px]
  "
                        />
                        <span className=" h-full w-full flex justify-start items-center text-xl  text-[#1c1c1c]">
                          Cash on delivery
                        </span>
                        {/* Card logo */}
                  {/* </span> */}
                  {/* </div> */}
                  {/* </div>  */}
                </div>
              </div>
              <div className="w-full h-[100px] flex justify-center items-end">
                <div className="w-[80%] h-full flex flex-col lg:flex-col xl:flex-col 2xl:flex-col items-end justify-center">
                  {/* <div className="w-full px-2 h-[50px] flex justify-between items-center">
                    <input
                      type="text"
                      className="w-[60%] h-full border-2 border-black outline-none placeholder:text-sm placeholder:text-gray-500 pl-2 rounded-md text-lg"
                      placeholder="Enter Your Coupon"
                    />
                    <button className="w-[38%] h-full bg-red-600/85 text-white rounded-md hover:scale-95 transition-all duration-200">
                      Apply Coupon
                    </button>
                  </div> */}
                  <div className="h-[70px] w-full py-2 mt-2 px-2 flex justify-center items-center">
                    <button
                      className="w-3/5 h-full bg-red-600/85 text-white rounded-md text-lg hover:scale-105 transition-all duration-200"
                      onClick={handleBuyNow}
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="h-[70px] w-full py-2 mt-2"></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
