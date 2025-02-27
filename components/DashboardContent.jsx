"use client"

import React from 'react'
import NavBar from './NavBar'

const DashboardContent = ({ children, role }) => {

  const isNavOpen = true
  return (
    <>
      <NavBar role={role} isNavOpen={isNavOpen} />
      <div className={`mt-20 ${isNavOpen ? 'ml-65' : 'ml-25'} transition-all duration-300 ease-in-out overflow-hidden text-sky-100 min-h-screen flex flex-col`}>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}

export default DashboardContent