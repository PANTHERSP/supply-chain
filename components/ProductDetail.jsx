"use client"

import Image from 'next/image'
import React from 'react'

const ProductDetail = ({ selectedProduct, toggleModal, modalRef }) => {
  return (
    <>
    {selectedProduct && (
        <div ref={modalRef} className="fixed top-0 left-0 w-full h-full bg-black/85 flex justify-center z-50">
            <div className="flex flex-col bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800 p-8 rounded-3xl max-w-md w-full text-sky-100 overflow-auto my-6">
                <button onClick={toggleModal} className="text-white absolute top-4 right-4 cursor-pointer text-5xl">✕</button>
                <div className="relative w-full aspect-square mb-4">
                    <Image fill src={selectedProduct.imageUrl} alt={selectedProduct.productName} className="object-cover rounded-xl" />
                </div>
                <h2 className="text-3xl font-semibold text-amber-500 mb-4">{selectedProduct.productName}</h2>
                {/* <p className="text-lg font-semibold mb-4">{selectedProduct.productDescription}</p> */}
                <p className="text-lg">Product ID: {selectedProduct.productId}</p>
                <p className="text-lg">Farm Name: {selectedProduct.farmName}</p>
                <p className="text-lg">Price: ฿{selectedProduct.price}</p>
                <p className="text-lg">Grade: {selectedProduct.grade}</p>
                <p className="text-lg">Quantity: {selectedProduct.quantity}</p>
                {/* <p className="text-lg">In Stock Date: {selectedProduct.inStockDate}</p> */}
                <p className="text-lg">Plant Date: {selectedProduct.plantDate}</p>
                <p className="text-lg">Harvest Date: {selectedProduct.harvestDate}</p>
                { selectedProduct.history && 
                    <div className="flex flex-col mt-10 border-t-3 border-sky-100 text-lg py-6 gap-5">
                        {
                            selectedProduct.history.map((history, index) => (
                                <div key={index} className={`flex flex-col border-dashed border-l-3 ${index === 0 ? 'border-amber-500' : 'border-amber-200'} pb-8 pl-4`}>
                                    <p className={`${index === 0 && 'text-amber-500' } font-bold`}>{history.date}</p>
                                    <p className={`${index === 0 && 'text-amber-500' } font-semibold`}>{history.status}</p>
                                    <p className={`text-sm ${index === 0 && 'text-amber-500' }`}>{history.evidence}</p>
                                    {/* <p>^</p> */}
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )}    
    </>
  )
}

export default ProductDetail
