import axios from 'axios'
import React from 'react'

const AllProductsPage = async () => {

    const res = await axios.get('http://localhost:8000/products', { withCredentials: true });
    const products = res.data.products;
    console.log('products', products);

  return (
    <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full rounded-lg text-sm">
            <thead>
                <tr className="bg-purple-700 text-white">
                    <th className="px-4 py-6 max-w-30">Product ID</th>
                    <th className="px-4 py-6 max-w-30">Product Code</th>
                    <th className="px-4 py-6 max-w-30">Farm Name</th>
                    <th className="px-4 py-6 max-w-30">Planting Date</th>
                    <th className="px-4 py-6 max-w-30">Expiry Date</th>
                    <th className="px-4 py-6 max-w-30">Product Name</th>
                    <th className="px-4 py-6 max-w-30">Owner</th>
                </tr>
            </thead>
            <tbody className='text-gray-800 text-center'>
                {products.map((product) => (
                    <tr key={product.id} className="bg-purple-100 hover:bg-purple-200">
                        <td className="px-4 py-6 border-b border-gray-300 truncate max-w-30">{product.productId}</td>
                        <td className="px-4 py-6 border-b border-gray-300 truncate max-w-30">{product.productCode}</td>
                        <td className="px-4 py-6 border-b border-gray-300 truncate max-w-30">{product.farmName}</td>
                        <td className="px-4 py-6 border-b border-gray-300 truncate max-w-30">{product.plantingDate}</td>
                        <td className="px-4 py-6 border-b border-gray-300 truncate max-w-30">{product.expiryDate}</td>
                        <td className="px-4 py-6 border-b border-gray-300 truncate max-w-30">{product.productName}</td>
                        <td className="px-4 py-6 border-b border-gray-300 truncate max-w-30">farmer</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default AllProductsPage

