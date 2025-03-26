"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { FileUploader } from 'react-drag-drop-files'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import uploadFile from '@/actions/uploadFile'

const SettingsForm = ({ user }) => {

    // const [user, setUser] = useState(null);
        const [profileImage, setProfileImage] = useState(null);
        const [profileImagePreview, setProfileImagePreview] = useState('');
        const [walletAddress, setWalletAddress] = useState('');
        const [generatedWalletAddressPreview, setGeneratedWalletAddressPreview] = useState('');

        const handleGenerateWalletAddress = () => {
            const newWalletAddress = uuidv4();
            setGeneratedWalletAddressPreview(newWalletAddress);
        };
    
        const handleChange = (profileImage) => {
            setProfileImage(profileImage)
            const preview = URL.createObjectURL(profileImage)
            setProfileImagePreview(preview)
            console.log('profileImage', profileImage)
            console.log('profileImagePreview', preview)
        }
        
        
          const handleSubmit = async (e) => {
            e.preventDefault()
            try {
              const res = await axios.post('http://localhost:8000/update-settings', {
                username: user?.username,
                walletAddress: walletAddress ? walletAddress : user?.wallet?.address,
                profileImage: profileImage ? await uploadFile(profileImage, 'profileImages') : user?.profileImage
              }, {
                withCredentials: true
              })
              console.log('updated settings', res.data)
              
              setProfileImage(null)
              setProfileImagePreview('')
              setWalletAddress('')
            } catch (err) {
              console.error(err)
            }
          }

  return (
    <>
    
      {/* <GradientBackground /> */}
      {/* <div className="text-sky-100 h-screen w-full flex flex-col relative overflow-hidden"> */}
          
        {/* <LandingPageHeader user={user}/> */}
        {/* <div className='w-full h-full flex flex-col mt-20'> */}
        <div className="flex flex-col mx-auto rounded-3xl bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800">
        <h1 className="self-center mt-10 text-3xl">Settings</h1>
        <Image src={user?.profileImage ? user?.profileImage : '/images/avatar.jpg'} alt="Profile Image" width={200} height={200} className="rounded-full w-25 h-25 self-center mt-6" />
        <form id="update-settings-form" onSubmit={handleSubmit} className="grid grid-cols-2 min-w-sm max-lg:grid-cols-1 max-w-lg mx-auto gap-8 p-10 rounded-lg shadow-md border-amber-50 text-xl">
          <label className="flex flex-col gap-2 col-span-2 max-lg:col-span-1">
            <span className="text-lg text-white">Upload Profile Image:</span>
            <FileUploader
              handleChange={handleChange}
              name="profileImage"
              types={["JPG", "PNG", "GIF"]}
              className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            {profileImagePreview && <Image src={profileImagePreview} alt="Profile Image Preview" width={200} height={200} className="rounded-full w-25 h-25 self-center" />}
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lg text-white">Wallet Address:</span>
            <input
              type="text"
              placeholder="Enter your wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              autoFocus
            />
          </label>
          
          <button type='submit' className="p-2 mx-auto text-sm text-white bg-yellow-500 rounded-2xl col-span-2 max-lg:col-span-1 cursor-pointer">
            Save
          
          </button>
          </form>
          <button className='text-nowrap self-center text-center bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 cursor-pointer rounded-2xl p-3' onClick={handleGenerateWalletAddress}>
            Generate Wallet Address
          </button>
          {generatedWalletAddressPreview && (
              <h1 className="text-center text-white mt-4">{generatedWalletAddressPreview}</h1>
          )}
          </div>
        {/* </div> */}

      {/* </div> */}
    </>
  )
}

export default SettingsForm