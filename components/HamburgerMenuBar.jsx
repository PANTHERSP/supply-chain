"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import SignOutButton from './SignOutButton';
import Image from 'next/image';
import ZoomProfileImage from './ZoomProfileImage';

const HamburgerMenuBar = ({ user }) => {

    const [isOpen, setIsOpen] = useState(false);


  return (
    <>
        
        { isOpen &&
            <div className={`fixed top-0 left-0 w-full h-screen bg-black/50 hidden max-sm:flex`}></div>
        }
        <div className={`fixed p-8 top-0 right-0 ${ isOpen ? 'translate-x-0' : 'translate-x-[100%]'} transition-all duration-500 ease-in-out hidden max-sm:flex flex-col text-sky-100 w-60 h-full bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800 rounded-l-4xl`}>   
            <nav className="mt-10 flex flex-col gap-4 text-xl w-full">
                <Link href={`/`} className="flex items-center p-3 border-b-3 hover:border-amber-200 transition-all duration-500 ease-in-out cursor-pointer">Home</Link>
                <Link href={`/about`} className="flex items-center p-3 border-b-3 hover:border-amber-200 transition-all duration-500 ease-in-out cursor-pointer">About</Link>
                <Link href={`/contact`} className="flex items-center p-3 border-b-3 hover:border-amber-200 transition-all duration-500 ease-in-out cursor-pointer">Contact</Link>
                <Link href={`${user ? `/dashboard/select-deal/home` : '/sign-in'}`} className="flex items-center p-3 border-b-3 hover:border-amber-200 transition-all duration-500 ease-in-out cursor-pointer">Dashboard</Link>
                {/* <Link href={`/documentation`} className="flex items-center p-3 border-b-3 hover:border-amber-200 transition-all duration-500 ease-in-out cursor-pointer">Documentation</Link> */}
                <Link href={`/settings`} className="flex items-center p-3 border-b-3 hover:border-amber-200 transition-all duration-500 ease-in-out cursor-pointer">
                    Settings
                </Link>
                { user?.isAdmin && <Link href="/create-deal" className="flex items-center p-3 border-b-3 hover:border-amber-200 transition-all duration-500 ease-in-out cursor-pointer">
                    Create Deal
                </Link>}
            </nav>
                {
                    user ?
                        <>
                        {/* <div className="h-20 w-20 mt-10 self-center">
                            <Image alt="avatar" width={40} height={40} src={user?.profileImage ? user?.profileImage : '/images/avatar.jpg'} className="rounded-full cursor-pointer h-full w-full object-cover" priority />
                        </div> */}
                        <ZoomProfileImage user={user} style="h-20 w-20 mt-10 self-center" />
                        <div className="text-nowrap text-2xl self-center text-center mt-1 mb-5 font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-600">{user.username}</div>
                        <SignOutButton />
                        </>
                    :
                        <Link href="/sign-in" className="text-nowrap self-center text-center mt-10 bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 cursor-pointer rounded-2xl p-3">
                            Sign in
                        </Link>
                }
        </div>
             
        
        <div onClick={() => setIsOpen(!isOpen)} className="hidden z-1 max-sm:flex mr-3 text-5xl cursor-pointer justify-center items-center w-10 h-full">
            {isOpen ? '✕' : '☰'}
        </div>
    </>
  )
}

export default HamburgerMenuBar