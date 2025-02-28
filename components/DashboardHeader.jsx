import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SignOutButton from './SignOutButton'

const DashboardHeader = () => {
  return (
    <div className="h-20 w-full top-0 text-sky-100 gap-20 fixed text-xl flex justify-between items-center rounded-b-4xl py-3 px-20 transition-all duration-400 ease-in-out border-amber-50 border-b-2 hover:bg-indigo-950/50">
          <div className="h-full flex items-center gap-2 font-bold italic"> 
            <div className="h-full aspect-square">
              <Image alt="logo" width={50} height={50} className="h-full w-full object-cover" src={"/images/logo.png"} priority/>
            </div>
            <div className="text-nowrap text-3xl font-semibold">
              TraceXcel  
            </div>
          </div>  
          <div className="flex gap-4 items-center h-full"> 
            <Link href="/" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
              Home
            </Link>
            <Link href="/about" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
              About
            </Link>
            <Link href="/contact" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
              Contact
            </Link>
            <Link href="/dashboard" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
              Dashboard
            </Link>
            <Link href="/documentation" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
              Documentation
            </Link>
            <SignOutButton />
            <div className="h-[80%] aspect-square">
              <Image alt="avatar" width={40} height={40} src={'/images/avatar.jpg'} className="rounded-full cursor-pointer h-full w-full object-cover" priority />
            </div>
          </div>
        </div>
  )
}

export default DashboardHeader