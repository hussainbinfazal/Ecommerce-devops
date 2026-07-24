import { useNavigate } from 'react-router-dom'
import React from 'react'

const Error = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-[500px] flex justify-center items-center'>
        <div className='w-full h-full flex flex-col justify-center items-center gap-8'>
            <h2 className='lg:text-8xl xl:text-8xl 2xl:text-8xl text-6xl  w-full flex justify-center items-center  text-center '>404 Not Found</h2 >
            <span className='flex jusify-center items-center text-center'>Your Visited page not found. You may go to homepage </span>
            <span className='mt-4'><button className='cursor-pointer hover:scale-105 transition-all duration-300 bg-red-500 text-white h-[50px] w-[200px] rounded-md' onClick={()=>{navigate("/")}}>Back to home page</button></span>

        </div>
      
    </div>
  )
}

export default Error
