import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationHeader from "../../components/layout/NavigatioHeader";

function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setUsername("");
    setPassword("");
    navigate("/admin");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start lg;justify-center xl:justify-center 2xl:justify-center  lg:pr-5 xl:pr-5 2xl:pr-5 overflow-auto pb-20  bg-white ">
      <NavigationHeader />
      <div className="lg:w-6/7 xl:w-6/7 2xl:w-6/7 w-full h-full flex items-center justify-center px-1 ">
        <div className="w-full h-full flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-start items-center gap-20 ">
          <div className="lg:w-[70%] xl:w-[70%] 2xl:w-[70%] w-full h-full flex justify-start items-center">
            <span>
              <img
                // src="https://img.freepik.com/free-vector/site-stats-concept-illustration_114360-1509.jpg?t=st=1743766296~exp=1743769896~hmac=c4011157d951766bc8426f035aad2ca389647963102e56a7d60cb50a0600e951&w=740"
                src="https://img.freepik.com/free-vector/data-inform-illustration-concept_114360-864.jpg?t=st=1743780336~exp=1743783936~hmac=4405358f2ffb4eddc5ab80c61dd1b065344a3726118a1b653378aa2a2756a11e&w=996"
                alt=""
                className="w-full h-full"
              />
            </span>
          </div>
          <div className="lg:w-[30%] xl:w-[30%] 2xl:w-[30%] w-full h-full flex flex-col justify-start items-center gap-4">
            <span className="w-full text-4xl"> Administrator Login</span>
            <span className="w-full">Enter you details below</span>
            <div className="w-full flex flex-col justify-start h-[160px]  gap-4 px-10 pl-0">
              <span className="w-full h-[55px]  border-b-1 border-black">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="w-full h-full placeholder:text-gray-400 pl-1 border-none outline-none border-black"
                  placeholder="Email"
                />
              </span>
              <span className="w-full h-[55px]  border-b-1 border-black">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full h-[55px] placeholder:text-gray-400 pl-1 border-none  border-black border-t-none outline-none"
                  placeholder="Password"
                />
              </span>
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-4 px-10 pl-0">
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full  h-[50px] bg-red-600 rounded-sm text-white"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
