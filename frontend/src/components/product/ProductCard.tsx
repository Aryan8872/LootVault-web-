import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from './CartContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductCard = ({ product }) => {

    
    console.log(`image name${product.gameImagePath} `)

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };



    return (

        <div className="w-[17rem] flex flex-col flex-wrap  gap-[0.3rem] rounded-3xl bg-white p-4 shadow-lg">
            {/* <div className="text-right text-sm text-gray-500 mb-4">
                id: {product._id}
            </div> */}

            <div className="relative ">
                <img
                    src={`http://localhost:3000/public/uploads/${product.gameImagePath}`}
                    alt={product.gameName}
                    className="w-full h-[12rem] rounded-lg"
                />

                {/* <div className="absolute right-2 top-2 flex flex-col gap-2">
                    <button className="p-2 bg-white rounded-full shadow-md">
                        <Scale className="w-5 h-5 text-blue-600" />
                    </button>
                    <button className="p-2 bg-gray-800 rounded-full shadow-md">
                        <Heart className="w-5 h-5 text-white" />
                    </button>
                </div> */}
            </div>
            <div className='flex flex-col'>
                <div className="text-[1.25rem]  font-nunitosemibold ">
                    {product.gameName}
                </div>
                <div className='text-[#616161] text-[0.9rem] font-nunitoregular'>
                    sub heading
                </div>
            </div>



            <div className="flex items-center gap-2">
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            className="w-3 h-5 fill-yellow-400 text-yellow-400"
                        />
                    ))}
                </div>
                <span className="text-gray-500 text-[0.8rem] font-nunitoregular">{23}</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-gray-400  text-[1rem] font-nunitoregular">${product.gamePrice}</span>
                    {/* <span className="text-blue-600 text-sm font-nunitoregular">{0}%</span>
                    <span className="text-[1.2rem] font-bold font-nunitoregular">${0}</span> */}
                </div>

                <div className='flex flex-wrap gap-2'>
                    <button
                        onClick={handleAddToCart}
                        className="p-3 bg-blue-600 font-nunitoregular text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Buy
                    </button>

                    <button
                        onClick={handleAddToCart}
                        className="px-3.5 text-white border-blue-300 border-[1.4px] rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        <ShoppingCart className="w-[1rem] h-[1rem] text-main_blue" />
                    </button>
                </div>


            </div>
        </div>
    );
};

export default ProductCard;