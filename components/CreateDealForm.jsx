"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { FileUploader } from 'react-drag-drop-files'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const CreateDealForm = ({ user }) => {

    const [farmer, setFarmer] = useState('');
    const [distributor, setDistributor] = useState('');
    const [customer, setCustomer] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8000/create-deal', {
                dealName: farmer + ' - ' + distributor + ' - ' + customer,
                participants: [
                    {
                        username: farmer,
                        role: 'farmer'
                    },
                    {
                        username: distributor,
                        role: 'distributor'
                    },
                    {
                        username: customer,
                        role: 'customer'
                    }
                ],
                
            }, {
                withCredentials: true
            })
            console.log('Created deal', res.data)
            
            setFarmer('')
            setDistributor('')
            setCustomer('')
            setError(null)
        } catch (err) {
            console.error(err)
            setError(err.response.data.message)
        }
    }

    return (
        <>
            <div className="flex flex-col w-[60%] max-w-md min-w-xs mx-auto rounded-3xl bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800">
                <h1 className="self-center mt-10 text-3xl">Create Deal</h1>
                
                <form id="create-deal-form" onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 rounded-lg shadow-md border-amber-50 text-xl">
                    <label className="flex flex-col gap-2">
                        <span className="text-lg text-white">Farmer:</span>
                        <input
                            type="text"
                            placeholder="Enter farmer username"
                            value={farmer}
                            onChange={(e) => setFarmer(e.target.value)}
                            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-lg text-white">Distributor:</span>
                        <input
                            type="text"
                            placeholder="Enter distributor username"
                            value={distributor}
                            onChange={(e) => setDistributor(e.target.value)}
                            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-lg text-white">Customer:</span>
                        <input
                            type="text"
                            placeholder="Enter customer username"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </label>
                    {error && <p className="text-red-500 text-[16px]">{error}</p>}
                    <button type='submit' className="p-2 mx-auto text-sm text-white bg-yellow-500 rounded-2xl cursor-pointer">
                        Create
                    </button>
                </form>
                
                
            </div>
        </>
    )
}

export default CreateDealForm

