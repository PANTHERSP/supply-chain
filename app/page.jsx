import MouseCursor from "@/components/MouseCursor";
import SignOutButton from "@/components/SignOutButton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaFacebook, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { fetchUser } from "@/utils/fetchUser";
import GradientBackground from "@/components/GradientBackground";


const HomePage = async () => {

  // const router = useRouter();
  
  const { user, auth } = await fetchUser();

  // if (!user || !auth) {
  //   router.push('/sign-in');
  // }
  // if (user)
  //   user.role = 'customer';


  return (
    <>
      <MouseCursor />
      {/* <GradientBackground /> */}
      <div className="overflow-hidden text-sky-100 min-h-screen flex flex-col">
          
        <div className="h-20 w-full gap-20 fixed text-xl flex justify-between items-center rounded-b-4xl py-3 px-20  transition-all duration-400 ease-in-out">
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
            <Link href={user ? `/dashboard/${user.role}/home` : '/sign-in'} className="transition-all duration-400 ease-in-out p-3 rounded-2xl hover:bg-indigo-500/40 cursor-pointer hover:rounded-2xl hover:p-3">
              Dashboard
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
        
        <div className="flex-1">
          <div className="flex flex-col absolute top-35 right-45 items-center max-xl:hidden">
            <Image alt="blockchain" width={450} height={450} className="" src={"/images/blockchain-logo-removebg.png"} priority />
            <div className="text-nowrap text-3xl italic">Unbreakable data, unstoppable supply chains.</div>
          </div>

          <div className="w-130 p-5 mt-30 ml-40 relative">
            <div className="mb-4 pb-4 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-600">
              Blockchain-Based Supply Chain Management System
            </div>
            <div className="text-sky-100 text-xl mb-10 w-90">
              Blockchain in supply chain ensures transparency, security, and efficiency with a tamper-proof ledger, enabling real-time tracking and fraud prevention.
            </div>
            <Link href={user ? `/dashboard/${user.role}/home` : '/sign-in'} className="mb-20 inline-block bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 cursor-pointer rounded-2xl p-3 text-2xl">
              Get Started
            </Link>
            <div className="flex gap-6 items-center">
              <FaGithub className="h-8 w-8" />
              <FaFacebook className="h-8 w-8" />
              <FaInstagram className="h-8 w-8" />
              <FaSquareXTwitter className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
