import MouseCursor from "@/components/MouseCursor";
import NavBar from "@/components/NavBar";
import SignOutButton from "@/components/SignOutButton";
import { signOut } from "@/utils/auth";
import { fetchUser } from "@/utils/fetchUser";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {

  const { user, auth } = await fetchUser();

  if (!user || !auth) {
    await signOut();
    redirect('/');
  }

  return (
    <>
      <MouseCursor />
      <NavBar />
      <div className="overflow-hidden text-sky-100 bg-gradient-to-r from-gray-900 via-gray-950 to-[#22053C] min-h-screen flex flex-col">
        <div className="h-20 gap-20 text-xl flex justify-between items-center rounded-b-4xl py-3 px-20 hover:bg-indigo-950/50 transition-all duration-400 ease-in-out border-amber-50 border-b-1">
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
            <Link href="/documentation" className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
              Documentation
            </Link>
            {
              user ?
              <>
                <SignOutButton />
                <div className="h-[80%] aspect-square">
                  <Image alt="avatar" width={40} height={40} src={'/images/avatar.jpg'} className="rounded-full cursor-pointer h-full w-full object-cover" priority />
                </div>
              </>
              :
              <Link href="/sign-in" className="text-nowrap bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 cursor-pointer rounded-2xl p-3">
                Sign in
              </Link>
            }
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
};

export default DashboardLayout;

