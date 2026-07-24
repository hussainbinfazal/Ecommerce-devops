import React from 'react'
import { useNavigate } from 'react-router-dom'

const Preheader = () => {

  const navigate = useNavigate()
  return (
    <div className='w-full bg-black h-[50px] flex justify-start'>
      <div className='lg:w-4/5 xl:w-4/5 2xl:w-4/5 h-full flex justify-end items-center '>
        <div className='flex items-center w-full h-full justify-end '>
          <h3 className='text-white text-[11px] px-4'>Summer Sale For All Swim Suits And Free Express Delivery-OFF 50%  <span className='lg:mr-46 xl:mr-46 2xl:mr-46 ml-4 underline cursor-pointer font-bold ' onClick={()=>{navigate("/")}}>ShopNow</span></h3>
          <select name="Language" id="" className='bg-black text-white hidden  lg:block xl:block 2xl:block '>
            <option value="English">English</option>

          </select>
        </div>
      </div>
    </div>
  )
}

export default Preheader
