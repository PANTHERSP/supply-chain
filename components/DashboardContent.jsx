"use client"

import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios';
import { SelectedDealProvider } from '@/contexts/SelectedDealContext';
import { usePathname } from 'next/navigation';

const DashboardContent = ({ children, user }) => {

  const pathname = usePathname();

  const dealId = pathname.split('/')[2];

  console.log('dealId', dealId)

  const [isNavOpen, setIsNavOpen] = useState(true)
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [filteredDeals, setFilteredDeals] = useState([]);
  // const [deals] = useState([]);
  
  // const filteredDeals = deals.filter(deal =>
  //   deal.participants.some(participant =>
  //     participant.username === user.username 
  //   )
  // );
  // console.log('selectedDeal', selectedDeal)

  // useEffect(() => {
  //   const selectDeal = 
  // }, [middlePathname]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get('http://localhost:8000/deals', { withCredentials: true });
        const deals = res.data.deals;
        const filteredDeals = deals.filter(deal =>
          deal.participants.some(participant =>
            participant.username === user.username 
          )
        );

        const _SelectedDeal = filteredDeals.find(deal => deal.dealId.toString() === dealId);
        setSelectedDeal(_SelectedDeal);
        setFilteredDeals(filteredDeals);

      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };
    fetchDeals();
  }, []);

  return (
    <>
    <SelectedDealProvider selectedDeal={selectedDeal} setSelectedDeal={setSelectedDeal}>
      <NavBar user={user} filteredDeals={filteredDeals} isNavOpen={isNavOpen} />
      <div className={`mt-20 ${isNavOpen ? 'ml-65' : 'ml-25'} h-full transition-all duration-500 ease-in-out overflow-hidden text-sky-100 flex flex-col`}>
        <button className={`absolute z-1 cursor-pointer transition-all duration-500 ease-in-out ${!isNavOpen && '-rotate-180'}`} onClick={() => setIsNavOpen(!isNavOpen)}>
          <IoIosArrowBack size={50}/>
        </button>
        <div className="w-full h-full p-15 relative flex flex-col text-4xl overflow-y-auto bg-gradient-to-r from-gray-950 to-gray-950 ">
          {children}
        </div>
      </div>
    </SelectedDealProvider>
    </>
  )
}

export default DashboardContent