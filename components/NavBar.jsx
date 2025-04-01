"use client"

import { useSelectedDeal } from '@/contexts/SelectedDealContext';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaHouse, FaCartShopping, FaRegCalendarCheck, FaPlus, FaWarehouse, FaTruckFast, FaBars  } from "react-icons/fa6";
import { SiAftership } from "react-icons/si";


const iconSize = 25

const getTabs = (role, dealId) => {
  const customerTabs = [
    {
      label: 'Home',
      href: `/dashboard/${dealId}/home`,
      icon: <FaHouse size={iconSize} />,
    },
    {
      label: 'Explorer',
      href: `/dashboard/${dealId}/explorer`,
      icon: <FaSearch size={iconSize} />,
    },
    {
      label: 'Order',
      href: `/dashboard/${dealId}/order`,
      icon: <FaCartShopping size={iconSize} />,
    },
    {
      label: 'Receive',
      href: `/dashboard/${dealId}/receive`,
      icon: <SiAftership size={iconSize} />,
    },
    {
      label: 'Your Products',
      href: `/dashboard/${dealId}/your-products`,
      icon: <FaRegCalendarCheck size={iconSize} />,
    }
  ]

  const distributorTabs = [
    {
      label: 'Home',
      href: `/dashboard/${dealId}/home`,
      icon: <FaHouse size={iconSize} />,
    },
    {
      label: 'Explorer',
      href: `/dashboard/${dealId}/explorer`,
      icon: <FaSearch size={iconSize} />,
    },
    {
      label: 'Order',
      href: `/dashboard/${dealId}/order`,
      icon: <FaCartShopping size={iconSize} />,
    },
    {
      label: 'Receive',
      href: `/dashboard/${dealId}/receive`,
      icon: <SiAftership size={iconSize} />,
    },
    {
      label: 'Ship Product',
      href: `/dashboard/${dealId}/ship-product`,
      icon: <FaTruckFast size={iconSize} />,
    }
  ]

  const farmerTabs = [
    {
      label: 'Home',
      href: `/dashboard/${dealId}/home`,
      icon: <FaHouse size={iconSize} />,
    },
    {
      label: 'Explorer',
      href: `/dashboard/${dealId}/explorer`,
      icon: <FaSearch size={iconSize} />,
    },
    {
      label: 'Add Product',
      href: `/dashboard/${dealId}/add-product`,
      icon: <FaPlus size={iconSize} />,
    },
    {
      label: 'Ship Product',
      href: `/dashboard/${dealId}/ship-product`,
      icon: <FaTruckFast size={iconSize} />,
    },
    {
      label: 'All Products',
      href: `/dashboard/${dealId}/all-products`,
      icon: <FaWarehouse size={iconSize} />,
    }
  ]

  const selectDealTabs = [
    {
      label: 'Home',
      href: `/dashboard/${dealId}/home`,
      icon: <FaHouse size={iconSize} />,
    },
    {
      label: 'Explorer',
      href: `/dashboard/${dealId}/explorer`,
      icon: <FaSearch size={iconSize} />,
    }
  ]

  if (role === 'customer') return customerTabs;
  if (role === 'distributor') return distributorTabs;
  if (role === 'farmer') return farmerTabs;
  if (role === 'select-deal') return selectDealTabs;
   
    
}

const customerTabs = [
    {
      label: 'Home',
      href: '/dashboard/customer/home',
      icon: <FaHouse size={iconSize} />,
    },
    {
      label: 'Explorer',
      href: '/dashboard/customer/explorer',
      icon: <FaSearch size={iconSize} />,
    },
    {
      label: 'Order',
      href: '/dashboard/customer/order',
      icon: <FaCartShopping size={iconSize} />,
    },
    {
      label: 'Receive',
      href: '/dashboard/customer/receive',
      icon: <SiAftership size={iconSize} />,
    },
    {
      label: 'Your Products',
      href: '/dashboard/customer/your-products',
      icon: <FaRegCalendarCheck size={iconSize} />,
    },
  ]

  const distributorTabs = [
    {
      label: 'Home',
      href: '/dashboard/distributor/home',
      icon: <FaHouse size={iconSize} />,
    },
    {
      label: 'Explorer',
      href: '/dashboard/distributor/explorer',
      icon: <FaSearch size={iconSize} />,
    },
    {
      label: 'Order',
      href: '/dashboard/distributor/order',
      icon: <FaCartShopping size={iconSize} />,
    },
    {
      label: 'Receive',
      href: '/dashboard/distributor/receive',
      icon: <SiAftership size={iconSize} />,
      
    },
    {
      label: 'Ship Product',
      href: '/dashboard/distributor/ship-product',
      icon: <FaTruckFast size={iconSize} />,
    },
  ]

  const farmerTabs = [
    {
      label: 'Home',
      href: '/dashboard/farmer/home',
      icon: <FaHouse size={iconSize} />,
    },
    {
      label: 'Explorer',
      href: '/dashboard/farmer/explorer',
      icon: <FaSearch size={iconSize} />,
    },
    {
      label: 'Add Product',
      href: '/dashboard/farmer/add-product',
      icon: <FaPlus size={iconSize} />,
    },
    {
      label: 'Ship Product',
      href: '/dashboard/farmer/ship-product',
      icon: <FaTruckFast size={iconSize} />,
    },
    {
      label: 'All Products',
      href: '/dashboard/farmer/all-products',
      icon: <FaWarehouse size={iconSize} />,
    },
  ]

  const adminTabs = [
    {
      label: 'Home',
      href: '/dashboard/admin/home',
      icon: <FaHouse size={iconSize} />,
    },
    {
      label: 'Explorer',
      href: '/dashboard/admin/explorer',
      icon: <FaSearch size={iconSize} />,
    },
    {
      label: 'Assign Role',
      href: '/dashboard/admin/assign-role',
      icon: <FaPlus size={iconSize} />,
    }
  ]

  const selectDealTabs = [
    {
      label: 'Home',
      href: '/dashboard/select-deal/home',
      icon: <FaHouse size={iconSize} />,
    },
    {
      label: 'Explorer',
      href: '/dashboard/select-deal/explorer',
      icon: <FaSearch size={iconSize} />,
    },
  ]



// const customerTabs = [
//   { label: "Home", href: "/" },
//   { label: "Explorer", href: "/explorer" },
//   { label: "Purchase", href: "/purchase" },
//   { label: "Receive", href: "/receive" },
//   { label: "Your Products", href: "/your-products" },
// ];

// const distributorTabs = [
//   { label: "Home", href: "/" },
//   { label: "Explorer", href: "/explorer" },
//   { label: "Buy Product", href: "/buy-product" },
//   { label: "Receive", href: "/receive" },
//   { label: "Ship Product", href: "/ship-product" },
// ];

// const farmerTabs = [
//   { label: "Home", href: "/" },
//   { label: "Explorer", href: "/explorer" },
//   { label: "Add Product", href: "/add-product" },
//   { label: "Ship Product", href: "/ship-product" },
//   { label: "All Product", href: "/all-product" },
// ];

  const allTabs = {
    customer: customerTabs,
    distributor: distributorTabs,
    farmer: farmerTabs,
    admin: adminTabs,
    "select-deal": selectDealTabs
  }

function capitalizeWords(string) {
  return string.replace(/\b\w/g, (c) => c.toUpperCase());
}

const NavBar = ({ user, filteredDeals, isNavOpen }) => {

  const [selectedDeal, setSelectedDeal] = useSelectedDeal();

  const [isDealListOpen, setIsDealListOpen] = useState(false); 

  console.log('selectedDeal from navbar', selectedDeal)

  const pathname = usePathname();

  const router = useRouter();

  const role = user.isAdmin ? 'admin' : selectedDeal ? selectedDeal?.participants?.find(participant => participant.username === user.username).role ?? 'select-deal' : 'select-deal';

  console.log('role', role)
  
  const tabs = getTabs(role, selectedDeal?.dealId || 'select-deal');

  console.log('tabs', tabs)

  // const currentTab = tabs?.find((tab) => tab.href === pathname);

  // if (user.role === 'admin') {

  // }

  // const isNavOpen = true
  // const filteredDeals = deals.filter(deal =>
  //   deal.participants.some(participant =>
  //     participant.username === user.username 
  //   )
  // );

  return (
    <nav className={`${isNavOpen ? 'w-65' : 'w-25'} flex flex-col fixed top-20 left-0 gap-10 p-8 text-sky-100 h-[calc(100%-80px)] border-amber-50 border-r-2 transition-all duration-500 ease-in-out`}>
      { isNavOpen &&
        <div className="text-3xl whitespace-nowrap font-bold text-center border-b-2 border-amber-50 rounded-b-4xl w-full p-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
            {selectedDeal || pathname.split('/')[2] === 'select-deal' ? capitalizeWords(role.replace('-', ' ') ) : '.'}
        </div>
      }
      <div className='flex flex-col gap-8 w-full'>
      { 
        isNavOpen ?
          tabs.map(({ label, href, icon }, index) => (
            <Link href={href} key={index} className={`h-10 text-nowrap transition-all duration-500 ease-in-out border-b-3 border-amber-50 hover:border-amber-200 text-l font-semibold  w-[80%] ${pathname === href ? 'border-amber-500 w-full' : ''} hover:w-full`}>
              <div className="flex flex-row items-center">
                {icon}
                <span className="ml-2 overflow-hidden">{label}</span>
              </div>
            </Link>
          )) :
          tabs.map(({ label, href, icon }, index) => (
            <Link href={href} key={index} className={`h-10 transition-all duration-500 ease-in-out border-b-3 border-amber-50 hover:border-amber-200 hover:text-amber-200 text-l font-semibold  w-full ${pathname === href ? 'border-amber-500 text-amber-500' : ''}`}>
              <div className="flex flex-col items-center">
                {icon}
              </div>
            </Link>
          ))
      }
      </div>
      {/* {
        isNavOpen ?
          filteredDeals.map((deal, index) => {
            const dealParticipants = deal.participants.map((participant, index) => {
              if (participant.username === user.username) {

              }
            // <Link href={`/dashboard/${role}/home`} 
          }
      } */}
      {
        isDealListOpen ?
        <div className='fixed w-49 h-full opacity-100 flex flex-col gap-6 bg-black rounded-xl'>

          <button className='text-3xl w-10 h-10 flex items-center mx-auto mt-4 justify-center cursor-pointer' onClick={() => setIsDealListOpen(false)}>
            ✕
          </button>

            <div className='flex flex-col gap-6'>


            {
              
              filteredDeals.map((deal, index) => {
                
                // const role = deal.participants.find(participant => participant.username === user.username).role
                
                return (
                  <div className={`${selectedDeal?.dealId === deal.dealId ? 'text-amber-500' : ''} border-amber-50 border-b-2 cursor-pointer gap-3 flex flex-col items-center rounded-xl hover:text-amber-200 transition-all duration-500 ease-in-out bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800 p-4`} key={index} onClick={() => {
                    
                    router.push(`/dashboard/${deal.dealId}/home`);
                    
                  }}>
                    <p className='text-lg font-semibold'>Deal ID: {deal.dealId}</p>
                    <div className="flex flex-row items-center justify-around w-full">
                      {
                        deal.participants.map((participant, index) =>
                          <div key={index} className='flex flex-col items-center'>

                            <div className="h-10 aspect-square">
                              <Image src={participant.profileImage ? participant.profileImage : '/images/avatar.jpg'} alt={participant.username} width={1000} height={1000} className="rounded-full w-full h-full object-cover" />
                            </div>

                            <p>{participant.username}</p>
                          </div> 
                        )
                      }
                    </div>
                      
                  </div>
                )
              }) 
            }
              
          </div>
        </div>
        :
        <div className='mt-auto opacity-100 flex flex-col whitespace-nowrap gap-4 bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800 rounded-xl'>
          <div className='cursor-pointer rounded-xl flex flex-row justify-center hover:text-amber-200 transition-all duration-500 ease-in-out bg-blue-500 p-2' onClick={() => {
            setIsDealListOpen(true)
          }}>
            <p className='overflow-hidden'>{ isNavOpen ? 'Your Deals' : 'X' }</p>
          </div>
        </div>
      }

    </nav>
  )
}

export default NavBar

