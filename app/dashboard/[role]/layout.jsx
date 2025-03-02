import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import MouseCursor from "@/components/MouseCursor";
import NavBar from "@/components/NavBar";
import SignOutButton from "@/components/SignOutButton";
import { signOut } from "@/utils/auth";
import { fetchUser } from "@/utils/fetchUser";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {

  // let user;
  // if (!user) {
  //   user = await fetchUser();
  // }

  const { user, auth } = await fetchUser();

  if (!user || !auth) {
    await signOut();
    redirect('/sign-in');
  }

  

  return (
    <>
      <MouseCursor />
      <div className="flex flex-col w-screen h-screen text-sky-100 bg-gradient-to-r from-gray-900 via-gray-950 to-[#22053C]">
        <DashboardHeader user={user}/>
        <DashboardContent user={user}>
          {children}
        </DashboardContent>
      </div>
    </>
  )
};

export default DashboardLayout;