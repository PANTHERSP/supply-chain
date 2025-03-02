"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaSearch } from "react-icons/fa";
import { FaHouse, FaCartShopping, FaRegCalendarCheck, FaPlus, FaWarehouse, FaTruckFast  } from "react-icons/fa6";
import { SiAftership } from "react-icons/si";


const iconSize = 25

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
    farmer: farmerTabs
  }

function capitalizeWords(string) {
  return string.replace(/\b\w/g, (c) => c.toUpperCase());
}

const NavBar = ({ user, isNavOpen }) => {

  const pathname = usePathname();
  
  const tabs = allTabs[user.role]

  // const isNavOpen = true

  return (
    <nav className={`${isNavOpen ? 'w-65' : 'w-25'} flex flex-col fixed top-20 left-0 gap-10 p-8 text-sky-100 h-[calc(100%-80px)] border-amber-50 border-r-2 transition-all duration-500 ease-in-out bg-gradient-to-r from-gray-900 via-gray-950 to-[#22053C]`}>
      { isNavOpen &&
        <div className="text-3xl font-bold text-center border-b-2 border-amber-50 rounded-b-4xl w-full p-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
            {capitalizeWords(user.role)}
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
    </nav>
  )
}

export default NavBar

