import MouseCursor from "@/components/MouseCursor";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaFacebook, FaInstagram, FaSquareXTwitter  } from "react-icons/fa6";

const HomePage = () => {

  return (
    <>
      <MouseCursor />
      <div className="overflow-hidden text-sky-100 bg-gradient-to-r from-gray-900 via-gray-950 to-[#22053C] min-h-screen flex flex-col">
          
        <div className="h-20 gap-20 text-xl flex justify-between items-center rounded-b-4xl py-3 px-20 hover:bg-indigo-950/50 transition-all duration-400 ease-in-out">
          <div className="h-full flex items-center gap-2 font-bold italic"> 
            <div className="h-full aspect-square">
              <Image alt="logo" width={50} height={50} className="h-full w-full object-cover" src={"/images/logo.png"} priority/>
            </div>
            <div className="text-nowrap text-3xl font-semibold">
              TraceXcel  
            </div>
          </div>

          <div className="flex gap-4"> 
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
            <Link href="/signin" className="text-nowrap bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 cursor-pointer rounded-2xl p-3">
              Sign in
            </Link>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col absolute top-35 right-50 items-center max-xl:hidden">
            <Image alt="blockchain" width={450} height={450} className="" src={"/images/blockchain-logo-removebg.png"} priority/>
            <div className="text-nowrap text-3xl italic">Unbreakable data, unstoppable supply chains.</div>
          </div>

          <div className="w-95 p-5 mt-15 ml-40">
            <div className="mb-4 h-15 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              Supply Chain
            </div>
            <div className="text-sky-100 text-xl mb-10">
              Blockchain in supply chain enhances transparency, security, and efficiency with a tamper-proof, decentralized ledger. It ensures real-time tracking, reduces fraud, and optimizes operations, helping businesses verify authenticity and streamline logistics.
            </div>
            <button className="mb-20 bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 cursor-pointer rounded-2xl p-3 text-2xl">
              Get Started
            </button>
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