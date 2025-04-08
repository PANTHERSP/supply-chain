"use client"

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSelectedDeal } from '@/contexts/SelectedDealContext';
import { FaTruckFast } from 'react-icons/fa6';

const mockProducts = Array.from({ length: 100 }, (_, i) => ({
    universalId: i + 1,
    productName: `Product ${i + 1}`,
    productDescription: `Description ${i + 1}`,
    price: (Math.random() * 20 + 5).toFixed(2),
    quantity: Math.floor(Math.random() * 50 + 1),
    inStockDate: new Date(2023, i % 12, 1).toISOString().split('T')[0],
    productImage: `https://picsum.photos/512/384?random=${i + 1}`,
}));

const ExplorePage = () => {

    const [selectDeal, setSelectedDeal] = useSelectedDeal();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const modalRef = useRef();

    const currentDealId = selectDeal?.dealId;

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get('http://localhost:8000/products', { withCredentials: true });
            const products = res.data.products;
            const filteredProducts = products.filter(product => product.dealId === currentDealId);
            // setProducts(filteredProducts);
            setProducts(products);
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleModal = (product) => {
        if (selectedProduct) {
            const modal = modalRef.current;
            if (modal) {
                modal.style.transition = 'opacity 400ms ease, transform 400ms ease';
                modal.style.opacity = 0;
                modal.style.transform = 'scale(0)';
                setTimeout(() => {
                    setSelectedProduct(null);
                }, 400);
            } else {
                setSelectedProduct(null);
            }
        } else {
            setSelectedProduct(product);
            requestAnimationFrame(() => {
                const modal = modalRef.current;
                if (modal) {
                    modal.style.opacity = 0;
                    modal.style.transform = 'scale(0)';
                    requestAnimationFrame(() => {
                        modal.style.transition = 'opacity 400ms ease, transform 400ms ease';
                        modal.style.opacity = 1;
                        modal.style.transform = 'scale(1)';
                    });
                }
            });
        }
    };

    return (
        <>
            <div className="flex flex-col mx-auto w-full min-w-[225px] relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-gray-800 text-lg mb-10 p-2 pl-4 border border-gray-300 rounded-3xl bg-white mx-auto"
                    autoFocus
                />
                <div className='grid grid-cols-[repeat(auto-fit,minmax(235px,235px))] gap-6 justify-center'>
                    {filteredProducts.map((product, index) => (
                        <div
                            key={index}
                            className="flex flex-col p-5 text-sky-100 bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                            onClick={() => toggleModal(product)}
                        >
                            <div className='bg-indigo-600 font-bold rounded-full flex justify-center items-center self-center px-3 py-1 text-xl mb-4'>
                                {product.dealId}
                            </div>
                            <div className="relative w-full aspect-square mb-4">
                                <Image fill src={product.imageUrl} alt={product.productName} className="object-cover rounded-lg" />
                            </div>
                            <h2 className="text-xl font-semibold text-amber-500 mb-2 truncate">{product.productName}</h2>
                            <p className="text-sm text-sky-100">Product ID: {product.productId}</p>
                            <p className="text-sm text-sky-100">Farm Name: {product.farmName}</p>
                            <p className="text-sm text-sky-100">Price: ฿{product.price}</p>
                            <p className="text-sm text-sky-100">Grade: {product.grade}</p>
                            <p className="text-sm text-sky-100">Quantity: {product.quantity}</p>
                            <p className="text-sm text-sky-100">Plant Date: {product.plantDate}</p>
                            <p className="text-sm text-sky-100">Harvest Date: {product.harvestDate}</p>
                            
                            {/* <div className="text-sky-100 flex justify-between mt-4 text-sm"> */}
                            
                            <div className='bg-red-500 font-bold rounded-full flex justify-center items-center self-center px-2 py-2 text-sm mt-4'>
                                {product.history[0].status}
                            </div>
                                {/* <div className='bg-blue-500 font-bold rounded-2xl flex justify-center items-center px-2 py-1'>
                                    {product.history[0].status}
                                </div> */}
                            {/* </div> */}
                        </div>
                    ))}
                </div>
            </div>
            {selectedProduct && (
                <div ref={modalRef} className="fixed top-0 left-0 w-full h-full bg-black/85 flex justify-center z-50">
                        <button onClick={toggleModal} className="text-white absolute top-4 right-4 cursor-pointer text-5xl">✕</button>
                    <div className="flex flex-col relative bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800 p-8 rounded-3xl max-w-md w-full text-sky-100 overflow-auto my-6">
                        
                        <div className='flex justify-between'>
                            <div className='bg-indigo-600 font-bold rounded-full flex justify-center items-center self-center px-6 py-3 text-3xl mb-6'>
                                {selectedProduct.dealId}
                            </div>
                            <div className='bg-red-500 font-bold rounded-full flex justify-center items-center self-center px-3 py-3 text-base mb-6'>
                                {selectedProduct.history[0].status}
                            </div>
                        </div>
                        <div className="relative w-full aspect-square mb-4">
                            <Image fill src={selectedProduct.imageUrl} alt={selectedProduct.productName} className="object-cover rounded-xl" />
                        </div>
                        <h2 className="text-3xl font-semibold text-amber-500 mb-4">{selectedProduct.productName}</h2>
                        <p className="text-lg">Product ID: {selectedProduct.productId}</p>
                            <p className="text-lg">Farm Name: {selectedProduct.farmName}</p>
                            <p className="text-lg">Price: ฿{selectedProduct.price}</p>
                            <p className="text-lg">Grade: {selectedProduct.grade}</p>
                            <p className="text-lg">Quantity: {selectedProduct.quantity}</p>
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
                            <div className='sticky bottom-0 right-0 cursor-pointer bg-green-500/85 hover:bg-green-600/85 hover:scale-110 transition-all duration-300 ease-in-out flex justify-center items-center self-end px-4 py-2 rounded-2xl text-xl'>
                                <FaTruckFast size={30} /><p className='pl-2'>Ship Now!</p>
                            </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ExplorePage

