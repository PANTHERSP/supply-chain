"use client"

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import NotificationModal from '@/components/NotificationModal';
import { useSelectedDeal } from '@/contexts/SelectedDealContext';
import { useUser } from '@/contexts/UserContext';

const mockProducts = Array.from({ length: 100 }, (_, i) => ({
    universalId: i + 1,
    productName: `Product ${i + 1}`,
    productDescription: `Description ${i + 1}`,
    price: (Math.random() * 20 + 5).toFixed(2),
    quantity: Math.floor(Math.random() * 50 + 1),
    inStockDate: new Date(2023, i % 12, 1).toISOString().split('T')[0],
    productImage: `https://picsum.photos/512/384?random=${i + 1}`,
}));

const YourProductsPage = () => {

    // const pathname = usePathname();
    // const role = pathname.split('/')[3];
    // const lastStatus = role === 'distributor' ? 'farmer add product' : 'distributor receive product';
    // const updateStatus = role === 'distributor' ? 'distributor order product' : 'customer order product';
    const [selectedDeal, setSelectedDeal] = useSelectedDeal();
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const modalRef = useRef();

    const user = useUser();
    const role = user.isAdmin ? 'admin' : selectedDeal ? selectedDeal?.participants?.find(participant => participant.username === user.username).role ?? 'select-deal' : 'select-deal';

    const fetchProducts = async () => {
      // const res = await axios.get('http://localhost:8000/products', { withCredentials: true });
      // setProducts(mockProducts);
      // setProducts(res.data.products);

      const res = await axios.get('http://localhost:8000/products', { withCredentials: true });
      const products = res.data.products;
      const filteredProducts = products.filter(product => product.status === 'end process');
      setProducts(filteredProducts);
      console.log('products', products);
    };

    useEffect(() => {
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

    const handleViewReceipt = async (product) => {
        try {
            // const res = await axios.post('http://localhost:8000/update-product-status', {
            //     productId: product.productId,
            //     status: updateStatus,
            // }, { withCredentials: true });
            // console.log(res.data);
            // fetchProducts();
            setVisible(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NotificationModal message="Product added successfully!" visible={visible} setVisible={setVisible} />
            <div className="flex flex-col mx-auto w-full min-w-[225px] relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-gray-800 text-lg mb-10 p-2 pl-4 border border-gray-300 rounded-3xl bg-white mx-auto"
                    autoFocus
                />
                <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,240px))] gap-6 justify-center'>
                    {filteredProducts.map((product, index) => (
                        <div
                            key={index}
                            className="flex flex-col p-5 text-sky-100 bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800 rounded-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                            onClick={() => toggleModal(product)}
                        >
                            <div className="relative w-full aspect-square mb-4">
                                <Image fill src={product.imageUrl} alt={product.productName} className="object-cover rounded-lg" />
                            </div>
                            <h2 className="text-xl font-semibold text-sky-100 mb-2">{product.productName}</h2>
                            {/* <p className="text-sm text-sky-100 font-semibold mb-2">{product.productDescription}</p> */}
                            <p className="text-sm text-sky-100">Price: ฿{product.price}</p>
                            <p className="text-sm text-sky-100">Grade: {product.grade}</p>
                            <p className="text-sm text-sky-100">Quantity: {product.quantity}</p>
                            <p className="text-sm text-sky-100">Farm Name: {product.farmName}</p>
                            <p className="text-sm text-sky-100">In Stock Date: {product.inStockDate}</p>
                            <p className="text-sm text-sky-100">Product ID: {product.productId}</p>
                            <button className="mt-4 bg-gradient-to-r from-blue-600/80 via-indigo-400/80 to-purple-500/80 cursor-pointer rounded-2xl p-2 text-xl" onClick={(e) => {e.stopPropagation(); handleViewReceipt(product)}}>View Receipt</button>
                        </div>
                    ))}
                </div>
            </div>
            {selectedProduct && (
                <div ref={modalRef} className="fixed top-0 left-0 w-full h-full bg-black/85 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-r from-indigo-950 via-gray-900 to-gray-800 p-8 rounded-3xl max-w-md w-full text-sky-100">
                        <button onClick={toggleModal} className="text-white absolute top-4 right-4 cursor-pointer text-5xl">✕</button>
                        <div className="relative w-full aspect-square mb-4">
                            <Image fill src={selectedProduct.imageUrl} alt={selectedProduct.productName} className="object-cover rounded-xl" />
                        </div>
                        <h2 className="text-3xl font-semibold mb-4">{selectedProduct.productName}</h2>
                        {/* <p className="text-lg font-semibold mb-4">{selectedProduct.productDescription}</p> */}
                        <p className="text-lg">Price: ฿{selectedProduct.price}</p>
                        <p className="text-lg">Grade: {selectedProduct.grade}</p>
                        <p className="text-lg">Quantity: {selectedProduct.quantity}</p>
                        <p className="text-lg">Farm Name: {selectedProduct.farmName}</p>
                        <p className="text-lg">In Stock Date: {selectedProduct.inStockDate}</p>
                        <p className="text-lg">Product ID: {selectedProduct.productId}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default YourProductsPage
