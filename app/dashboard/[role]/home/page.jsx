import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <>
      {/* <div className=" text-sky-100 h-full w-full"> */}
        <Image
          src="/images/organic-1.png"
          alt="Background"
          className="absolute top-0 left-0 object-cover object-center brightness-25 blur-[0px]"
          fill
          priority
        />
        
        {/* <div className="flex flex-col justify-center relative top-0 left-0 w-full h-full"> */}
          <div className='gap-8 flex flex-col max-w-[620px] z-10 my-auto self-start'>
            <div className='text-6xl font-bold '>
              Efficient Supply Chain Management
            </div>
            <div className='text-xl w-95'>
              Revolutionize your supply chain with our platform that integrates inventory and sensor data to monitor product conditions.
            </div>
            <Link href={'/dashboard/customer/explorer'} className='w-25 text-lg font-semibold flex justify-center items-center p-3 rounded-2xl bg-purple-900 hover:bg-purple-800 cursor-pointer hover:rounded-2xl hover:p-3'>
              Explore
            </Link>
          </div>
          
        {/* </div> */}
      {/* </div> */}
    </>
  )
}

export default HomePage

