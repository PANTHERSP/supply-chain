import SignOutButton from "@/components/SignOutButton";
import Image from "next/image"
import Link from "next/link"

import HamburgerMenuBar from "./HamburgerMenuBar";

const LandingPageHeader = ({ user }) => {

  console.log('user', user);

  return (
    <div className="h-20 w-full gap-20 fixed z-1 text-xl flex justify-between items-center rounded-b-4xl py-3 px-20 max-sm:px-3 transition-all duration-400 ease-in-out">
        <div className="h-full flex items-center gap-2 font-bold italic"> 
          <div className="h-full aspect-square">
            <Image alt="logo" width={50} height={50} className="h-full w-full object-cover" src={"/images/logo.png"} priority/>
          </div>
          <div className="text-nowrap text-3xl font-semibold">
            TraceXcel  
          </div>
        </div>
        <div className="flex max-sm:hidden gap-4 items-center h-full"> 
          <Link href="/" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
            Home
          </Link>
          <Link href="/about" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
            About
          </Link>
          <Link href="/contact" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
            Contact
          </Link>
          <Link href={user ? `/dashboard/select-deal/home` : '/sign-in'} className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
            Dashboard
          </Link>
          <Link href={`/settings`} className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
            Settings
          </Link>
          { user?.isAdmin && <Link href="/create-deal" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
            Create Deal
          </Link>}
          {/* <Link href="/documentation" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
            Documentation
          </Link> */}
          {
            user ?
              <>
                <SignOutButton />
                <div className="h-11 aspect-square">
                  <Image alt="avatar" width={40} height={40} src={user?.profileImage ? user?.profileImage : '/images/avatar.jpg'} className="rounded-full cursor-pointer h-full w-full object-cover" priority />
                </div>
                <div className="text-nowrap text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-600 text-center">{user.username}</div>
              </>
            :
              <Link href="/sign-in" className="text-nowrap bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 cursor-pointer rounded-2xl p-3">
                Sign in
              </Link>
          }
        </div>
        <HamburgerMenuBar user={user}/>
    </div>
  )
}

export default LandingPageHeader