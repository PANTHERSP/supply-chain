"use client"

import { useSelectedDeal } from '@/contexts/SelectedDealContext';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {

    // const { user, auth } = await checkUser();

    const [selectedDeal, setSelectedDeal] = useSelectedDeal();

  return (
    <>
      {/* <div className=" text-sky-100 h-full w-full"> */}
        <Image
          src="/images/organic-1.png"
          alt="Background"
          className="absolute top-0 left-0 object-cover object-center brightness-10 blur-[0px]"
          fill
          priority
        />
        
        {/* <div className="flex flex-col justify-center relative top-0 left-0 w-full h-full"> */}
          <div className='gap-8 flex flex-col max-w-[620px] z-0 my-auto self-start'>
            <div className='text-6xl font-bold pb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-blue-600'>
              Efficient Supply Chain Management
            </div>
            <div className='text-xl w-95'>
              Revolutionize your supply chain with our platform that integrates inventory and sensor data to monitor product conditions.
            </div>
            <Link href={`/dashboard/${selectedDeal ? selectedDeal?.dealId : 'select-deal'}/explorer`} className='w-25 text-lg font-semibold flex justify-center items-center p-3 bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 rounded-2xl cursor-pointer'>
              Explore
            </Link>
          </div>
          
        {/* </div> */}
      {/* </div> */}
    </>
  )
}

export default HomePage

