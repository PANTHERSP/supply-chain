"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import axios from 'axios'
import uploadFile from '@/actions/uploadFile'
import { usePathname } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

const AddProductPage = () => {

  const pathname = usePathname();

  const middlePathname = pathname.split('/')[2];

  const [productName, setProductName] = useState('')
  const [productCode, setProductCode] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [grade, setGrade] = useState('')
  const [farmName, setFarmName] = useState('')
  const [plantDate, setplantDate] = useState('')
  const [harvestDate, setharvestDate] = useState('')
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState('')

  const handleChange = (file) => {
    setFile(file)
    const preview = URL.createObjectURL(file)
    setFilePreview(preview)
    console.log('file', file)
    console.log('filePreview', preview)
  }

  const handleSubmitOnlyFile = async (e) => {
    e.preventDefault()
    try {
      await uploadFile(file)
      console.log('file uploaded')
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8000/add-product', {
        productName,
        productCode,
        price,
        quantity,
        grade,
        farmName,
        plantDate: format(new Date(plantDate), 'dd/MM/yyyy HH:mm', { locale: th }),
        harvestDate: format(new Date(harvestDate), 'dd/MM/yyyy HH:mm', { locale: th }),
        imageUrl: await uploadFile(file, 'products'),
        dealId: middlePathname,
        history: [
          {
            status: 'farmer add product',
            evidence: uuidv4(),
            date: format(new Date(), 'dd/MM/yyyy HH:mm', { locale: th }),
            timestamp: new Date().getTime()
          }
        ]
      }, {
        withCredentials: true
      })
      console.log(res.data)
      setProductName('')
      setProductCode('')
      setPrice('')
      setQuantity('')
      setGrade('')
      setFarmName('')
      setplantDate('')
      setharvestDate('')
      setFile(null)
      setFilePreview('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className="flex flex-col mx-auto rounded-3xl bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800">
        <h1 className="self-center mt-10">Add Your Product</h1>
        <form id="add-product-form" onSubmit={handleSubmit} className="mt-5 grid grid-cols-2 min-w-sm max-lg:grid-cols-1 max-w-lg mx-auto gap-8 p-10 rounded-lg shadow-md border-amber-50 text-xl">
          <label className="flex flex-col gap-2 col-span-2 max-lg:col-span-1">
            <span className="text-lg text-white">Upload Image:</span>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={["JPG", "PNG", "GIF"]}
              className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            {filePreview && <Image src={filePreview} alt="Preview" width={200} height={200} className="rounded-md w-full h-full" />}
          </label>
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
            <span className="text-lg text-white">Grade:</span>
            <input
              type="text"
              placeholder="Enter Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lg text-white">Farm Name:</span>
            <input
              type="text"
              placeholder="Enter Farm Name"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lg text-white">Plant Date:</span>
            <input
              type="datetime-local"
              placeholder="Enter Plant Date"
              value={plantDate}
              onChange={(e) => setplantDate(e.target.value)}
              className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-lg text-white">Harvest Date:</span>
            <input
              type="datetime-local"
              placeholder="Enter Harvest Date"
              value={harvestDate}
              onChange={(e) => setharvestDate(e.target.value)}
              className="p-2 pl-4 text-sm text-gray-700 bg-white rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </label>
      
          <button type='submit' className="p-2 mx-auto text-sm text-white bg-yellow-500 rounded-2xl col-span-2 max-lg:col-span-1 cursor-pointer">
            Add Product
          </button>
        </form>
      </div>
    </>
  )
}

export default AddProductPage

