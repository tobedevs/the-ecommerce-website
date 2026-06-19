import React from 'react'
import { Link } from 'react-router-dom'

export default function AuthNavbar() {
  return (
    <>
    <nav className="flex justify-between items-center w-full lg:w-screen h-16 sm:h-20 border border-[#F5F5F5] sticky top-0 z-10 bg-white px-4 sm:px-32">

        <Link to="/"><img src="/my-e-commerce-website\shop.jpg" alt="" className="transform scale-[2] w-8 sm:w-10 h-8 sm:h-10" /></Link>

        <div className="flex items-center gap-2 sm:gap-3">

          <div className="flex gap-1 sm:gap-[6.5px] text-[10px] cursor-pointer items-center">
            <img src="/my-e-commerce-website/Nigeria.svg" className="w-4 sm:w-5 h-4 sm:h-5" />
            <p className="w-6 sm:w-7.75 h-4 sm:h-5.75">NGN</p>
          </div>

          <div className="w-0.5 h-5 border text-[#D1D1D1] hidden sm:block"></div>

          <button className="relative">
            <img src="/my-e-commerce-website/Vector.svg" alt="" className="w-6 h-6 p-1 cursor-pointer bg-[#F8F8F8] rounded-[102.19px] px-0.1" />
          </button>

        </div>

      </nav>

    </>
  )
}
