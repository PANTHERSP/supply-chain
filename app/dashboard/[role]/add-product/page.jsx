"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios'

const AddProductPage = () => {
  const [productName, setProductName] = useState('')
  const [productCode, setProductCode] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [weight, setWeight] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [plantingDate, setPlantingDate] = useState('')
  const [expiryDate, setExpiryDate] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/add-product', {
        productName,
        productCode,
        description,
        price,
        quantity,
        weight,
        latitude,
        longitude,
        plantingDate,
        expiryDate
      } , {
        withCredentials: true
      })
      console.log(res.data)
      setProductName('')
      setProductCode('')
      setDescription('')
      setPrice('')
      setQuantity('')
      setWeight('')
      setLatitude('')
      setLongitude('')
      setPlantingDate('')
      setExpiryDate('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
    <div className="flex flex-col">
      <h1 className="self-center">AddProductPage</h1>
      <form onSubmit={handleSubmit} action="" className="mt-10 grid grid-cols-2 min-w-sm max-lg:grid-cols-1 max-w-lg mx-auto gap-6 p-10 rounded-lg shadow-md border-amber-50 border-3 text-xl">
        <label className="flex flex-col gap-2">
          <span className="text-lg text-white">Product Name:</span>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            autoFocus
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg text-white">Product Code:</span>
          <input
            type="text"
            placeholder="Enter Product Code"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg text-white">Description:</span>
          <input
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg text-white">Price:</span>
          <input
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg text-white">Quantity:</span>
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg text-white">Product Weight:</span>
          <input
            type="number"
            placeholder="Enter Product Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg text-white">Farm Latitude:</span>
          <input
            type="number"
            placeholder="Enter Farm Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg text-white">Farm Longitude:</span>
          <input
            type="number"
            placeholder="Enter Farm Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg text-white">Planting Date:</span>
          <input
            type="datetime-local"
            placeholder="Enter Planting Date"
            value={plantingDate}
            onChange={(e) => setPlantingDate(e.target.value)}
            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-lg text-white">Expiry Date:</span>
          <input
            type="datetime-local"
            placeholder="Enter Expiry Date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </label>

        <button type='submit' className="p-2 text-sm text-white bg-yellow-500 rounded-2xl translate-x-1/2 max-lg:translate-x-0">
          Add Product
        </button>
      </form>
    </div>
    </>

      
  )
}

export default AddProductPage

