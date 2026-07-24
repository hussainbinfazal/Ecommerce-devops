import React from "react";
import { useState } from "react";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import { useNavigate } from "react-router";
import { registerUser } from "../../redux/slices/userSlice"; // Adjust path as needed
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRef } from "react";
import { toast } from "react-toastify";
import {
  SignInButton,
  useUser,
  useSignUp,
  useSession,
} from "@clerk/clerk-react";
import { FcGoogle } from "react-icons/fc";
const Registerpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const { signUp, setActive } = useSignUp();
  const { session } = useSession();
  const { user } = useUser();
  if (isAuthenticated) {
    navigate("/"); // or wherever you want to redirect
  }
  const handleRegister = async (e) => {
    const userData = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    };
    // Handle registration logic here
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      // If registration successful

      toast.success("User Registered Successfully");
      navigate("/"); // or wherever you want to redirect
    } catch (error) {
      setRegisterError(error);
      // Handle registration error
    }
  };

  const handleRegisterWithClerk = async (e) => {
    e.preventDefault();

    console.log("🧪 handleRegister called");
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      await setActive({ session: result.createdSessionId });
      toast.success("Email verified successfully");

      console.log("User by Clerkk", user);
    } catch (err) {
      toast.error(err.errors[0]?.message || "Sign up failed");
    }
  };
  useEffect(() => {
    setRegisterError("");
  }, []);
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

  useEffect(() => {
    if (user) {
      const registerWithClerk = async () => {
        const userData = {
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
          password: user.id,
          fromOAuth: true,
          profileImageUrl: user.imageUrl,
        };

        try {
          await dispatch(registerUser(userData)).unwrap();
          toast.success("User registered via Clerk");
          navigate("/");
        } catch (err) {
          toast.error("Internal server error");
        }
      };

      registerWithClerk();
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start lg:justify-start xl:justify-start 2xl:justify-start lg:pr-5 xl:pr-5 2xl:pr-5 overflow-auto pb-20 bg-white">
      <NavigationHeader />
      <div className="lg:w-6/7 xl:w-6/7 2xl:w-6/7 w-full h-full flex items-center justify-center px-1">
        <div className="w-full h-full flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-start items-center gap-20">
          {/* Left side - Image */}
          <div className="lg:w-[70%] xl:w-[70%] 2xl:w-[70%] w-full h-full flex justify-start items-center">
            <span>
              <img
                src="https://images.deepai.org/art-image/138616d127944c7cad20098fe55f3ab2/none-43d778.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </span>
          </div>

          {/* Right side - Form */}
          <div className="lg:w-[30%] xl:w-[30%] 2xl:w-[30%] w-full h-full flex flex-col justify-start items-start gap-4 py-6">
            <span className="w-full text-4xl font-semibold">
              Create an account
            </span>
            <span className="w-full text-gray-600">
              Enter your details below
            </span>

            <form onSubmit={handleRegister} className="w-full space-y-4">
              <div className="w-full flex flex-col gap-4">
                {/* Name Input */}
                <div className="w-full border-b border-black">
                  <input
                    type="text"
                    className="w-full h-[45px] placeholder:text-gray-400 pl-1 border-none outline-none"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="w-full border-b border-black">
                  <input
                    type="email"
                    className="w-full h-[45px] placeholder:text-gray-400 pl-1 border-none outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="w-full border-b border-black relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full h-[45px] placeholder:text-gray-400 pl-1 border-none outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="w-5 h-5" />
                    ) : (
                      <AiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Confirm Password Input */}
                <div className="w-full border-b border-black">
                  <input
                    type="text"
                    className="w-full h-[45px] placeholder:text-gray-400 pl-1 border-none outline-none"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Password Match Error */}
                {password &&
                  confirmPassword &&
                  password !== confirmPassword && (
                    <div className="text-red-500 text-sm -mt-2">
                      Passwords do not match
                    </div>
                  )}

                {/* Phone Number Input */}
                <div className="w-full border-b border-black">
                  <input
                    type="tel"
                    className="w-full h-[45px] placeholder:text-gray-400 pl-1 border-none outline-none"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {registerError && (
                <div className="text-red-500 text-sm mt-2">{`${
                  error.toLowerCase() === "no token found" ? "" : error
                }`}</div> // notoken found??
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[50px] bg-red-600 text-white rounded-sm hover:bg-red-700 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  loading ||
                  password !== confirmPassword ||
                  !password ||
                  !confirmPassword
                }
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Google Sign In Button */}
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="w-full h-[50px] border border-black rounded-sm mt-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FcGoogle className="w-6 h-6" />
                  Sign In With Google
                </button>
              </SignInButton>
            </form>

            {/* Login Link */}
            <div className="w-full flex gap-4 justify-center items-center mt-4">
              <span>Already have an account?</span>
              <span
                className="hover:underline underline-offset-2 cursor-pointer text-red-600"
                onClick={() => navigate("/login")}
              >
                Log In
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
