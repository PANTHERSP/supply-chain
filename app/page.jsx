import MouseCursor from "@/components/MouseCursor";
import SignOutButton from "@/components/SignOutButton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaFacebook, FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { fetchUser } from "@/utils/fetchUser";
import GradientBackground from "@/components/GradientBackground";
import LandingPageHeader from "@/components/LandingPageHeader";


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
      <div className="text-sky-100 h-full w-full flex flex-col relative overflow-hidden">
          
        <LandingPageHeader user={user}/>
        
        <div className="relative flex max-lg:flex-col px-30 max-lg:px-0 items-center mt-20 h-full w-full">
          

          <div className="max-w-130 p-10 relative z-0">
            <div className="mb-4 pb-4 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-600">
              Blockchain-Based Supply Chain Management System
            </div>
            <div className="text-sky-100 text-xl mb-10 w-90">
              Blockchain in supply chain ensures transparency, security, and efficiency with a tamper-proof ledger, enabling real-time tracking and fraud prevention.
            </div>
            <Link href={user ? `/dashboard/select-deal/home` : '/sign-in'} className="mb-20 inline-block bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 cursor-pointer rounded-2xl p-3 text-2xl">
              Get Started
            </Link>
            <div className="flex gap-6 items-center">
              <FaGithub className="h-8 w-8" />
              <FaFacebook className="h-8 w-8" />
              <FaInstagram className="h-8 w-8" />
              <FaSquareXTwitter className="h-8 w-8" />
            </div>
          </div>

          <div className="flex flex-col p-6 items-center w-full">
            <Image alt="blockchain" width={450} height={450} className="" src={"/images/blockchain-logo-removebg.png"} priority />
            <div className="text-3xl italic text-center max-lg:mb-20">Unbreakable data, unstoppable supply chains.</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
