import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSignIn } from "@clerk/clerk-react";
import React from "react";
import { useState } from "react";
import NavigationHeader from "../../components/layout/NavigatioHeader";
import { useNavigate } from "react-router";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import { FcGoogle } from "react-icons/fc";
import {
  useUser,
  useSignUp,
  SignInButton,
  useSession,
} from "@clerk/clerk-react";
const Loginpage = () => {
  const dispatch = useDispatch();
  const { loading, error ,isAuthenticated} = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { user } = useUser();
  const { signIn, setActive } = useSignIn();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    const formData = new FormData();
    formData.append("password", password.trim());
    formData.append("email", email.trim());
    e.preventDefault();

    try {
      const response = await dispatch(loginUser(formData)).unwrap();
      console.log(response);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const response = await dispatch(loginUser(formData)).unwrap();
      setLoginError(error.message || error);
      toast.error(error.message || error.response.message);
    }
  };

  const handleLoginWithClerk = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn.create({
        identifier: email,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      } else {
        console.log("Awaiting more steps:", result);
        setLoginError(result || "Login failed");
      }
    } catch (err) {
      const message =
        err?.errors?.[0]?.message || err?.message || "Login failed";
      toast.error(message);
      setLoginError(message);
    }
  };
  useEffect(() => {
    setLoginError("");
  }, []);

  useEffect(() => {
    if (user) {
      const loginWithClerk = async () => {
        const userData = {
          email: user.primaryEmailAddress?.emailAddress,
          fromOAuth: true,
        };

        try {
          await dispatch(loginUser(userData)).unwrap();
          toast.success("Login Successfull");
          navigate("/");
        } catch (err) {
          toast.error("Login failed,please try again");
        }
      };

      loginWithClerk();
    }
  }, [user]);
  if (isAuthenticated) {
    navigate("/");
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start lg:justify-start xl:justify-start 2xl:justify-start  lg:pr-5 xl:pr-5 2xl:pr-5 overflow-auto pb-20 bg-white ">
      <NavigationHeader />
      <div className="lg:w-6/7 xl:w-6/7 2xl:w-6/7 w-full h-full flex items-center justify-center px-1 ">
        <div className="w-full h-full flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-start items-center gap-20 ">
          <div className="lg:w-[70%] xl:w-[70%] 2xl:w-[70%] w-full h-full flex justify-start ">
            <span>
              <img
                src="https://images.deepai.org/art-image/138616d127944c7cad20098fe55f3ab2/none-43d778.jpg"
                alt=""
                className="w-full h-full"
              />
            </span>
          </div>
          <div className="lg:w-[30%] xl:w-[30%] 2xl:w-[30%] w-full h-full flex flex-col justify-center items-center gap-4">
            <form
              onSubmit={handleLogin}
              className="w-full flex flex-col gap-4 "
            >
              <span className="w-full text-4xl"> Log In</span>
              <span className="w-full">Enter you details below</span>
              <div className="w-full flex flex-col justify-start h-[160px]  gap-4 px-10 pl-0">
                <span className="w-full h-[55px]  border-b-1 border-black">
                  <input
                    value={email}
                    type="text"
                    className="w-full h-full placeholder:text-gray-400 pl-1 border-none outline-none border-black"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </span>
                <span className="w-full h-[55px]  border-b-1 border-black relative">
                  <input
                    value={password}
                    type={`${showPassword ? "text" : "password"}`}
                    className="w-full h-[55px] placeholder:text-gray-400 pl-1 border-none  border-black border-t-none outline-none"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
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
                </span>
                {loginError && (
                  <div className="text-red-500 text-sm my-auto">{`${
                    error.toLowerCase() === "no token found" ? "" : error
                  }`}</div> // notoken found??
                )}
              </div>

              <div className="w-full flex flex-col justify-start items-center gap-4 px-10 pl-0">
                <button
                  className="w-full  h-[50px] bg-red-600 rounded-sm text-white"
                  type="submit"
                >
                  Log In
                </button>
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="w-full h-[50px] border border-black rounded-sm mt-4 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FcGoogle  className="w-6 h-6"/>
                    Log In With Google
                  </button>
                </SignInButton>
              </div>
              <span className="w-full flex gap-4 justify-center items-center px-10 pl-0">
                Don't have an account?{" "}
                <span
                  className="hover:underline underline-offset-2 cursor-pointer"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Sign In
                </span>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
