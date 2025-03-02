"use client"

import React, { useState } from 'react'
import NavBar from './NavBar'
import { IoIosArrowBack } from "react-icons/io";

const DashboardContent = ({ children, user }) => {

  const [isNavOpen, setIsNavOpen] = useState(true)

  // const isNavOpen = true
  return (
    <>
      <NavBar user={user} isNavOpen={isNavOpen} />
      <div className={`mt-20 ${isNavOpen ? 'ml-65' : 'ml-25'} h-full transition-all duration-500 ease-in-out overflow-hidden text-sky-100 flex flex-col`}>
        <button className={`absolute z-10 cursor-pointer transition-all duration-500 ease-in-out ${!isNavOpen && '-rotate-180'}`} onClick={() => setIsNavOpen(!isNavOpen)}>
          <IoIosArrowBack size={50}/>
        </button>
        <div className="w-full h-full relative p-15 flex flex-col text-5xl overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </>
  )
}

export default DashboardContent