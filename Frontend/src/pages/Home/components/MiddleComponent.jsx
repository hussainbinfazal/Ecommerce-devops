import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GoShieldCheck } from "react-icons/go";

const MiddleComponent = () => {
  return (
    <div className='w-full flex justify-center items-center h-[800px] lg:h-[300px] xl:h-[300px] 2xl:h-[300px] my-8'>
      <div className='lg:w-5/6 xl:w-5/6 2xl:w-5/6 w-full h-full   flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-center  items-center'>
        <div className='lg:w-2/4 xl:w-2/4 2xl:w-2/4 w-full lg:h-4/5 xl:h-4/5 2xl:h-4/5 h-3/4 flex flex-col justify-center items-center px-0 lg:px-8  xl:px-8 2xl:px-8 '>
        <span className='w-[90px] h-[90px] rounded-full bg-gray-300 flex justify-center items-center'>
        <span className='w-[60px] h-[60px] rounded-full bg-black flex justify-center items-center'>
        <TbTruckDelivery className='text-white w-[40px] h-[40px]' />
          </span>
        </span>
        <span className='text-xl font-semibold mt-4'>
          FREE AND FAST DELIVERY
        </span>
        <span className='text-sm lg:px-5 xl:px-5 2xl:px-5 mt-3 flex'>
          Free delivery for all orders over ₹140
        </span>
        </div>
        <div className='lg:w-2/4 xl:w-2/4 2xl:w-2/4 w-full lg:h-4/5 xl:h-4/5 2xl:h-4/5 h-3/4 px-0 lg:px-8  xl:px-8 2xl:px-8 flex flex-col justify-center items-center  '>
        <span className='w-[90px] h-[90px] rounded-full bg-gray-300 flex justify-center items-center'>
        <span className='w-[60px] h-[60px] rounded-full bg-black flex justify-center items-center'>
        <TfiHeadphoneAlt className='text-white w-[40px] h-[40px]' />
          </span>
        </span>
        <span className='text-xl font-semibold mt-4'>
          24/7 CUSTOMER SERVICE
        </span>
        <span className='text-sm px-5 mt-3'>
          Friendly 24/7 customer support
        </span>
        </div>
        <div className='lg:w-2/4 xl:w-2/4 2xl:w-2/4 w-full lg:h-4/5 xl:h-4/5 2xl:h-4/5 h-3/4 px-0 lg:px-8  xl:px-8 2xl:px-8 flex flex-col justify-center items-center '>
        <span className='w-[90px] h-[90px] rounded-full bg-gray-300 flex justify-center items-center'>
        <span className='w-[60px] h-[60px] rounded-full bg-black flex justify-center items-center'>
        <GoShieldCheck className='text-white w-[40px] h-[40px]' />
          </span>
        </span>
        <span className='text-xl font-semibold mt-4'>
        MONEY BACK GUARANTEE
        </span>
        <span className='text-sm px-5 mt-3'>
          Return any product within 30 days
        </span>
        </div>
      </div>
    </div>
  )
}

export default MiddleComponent
