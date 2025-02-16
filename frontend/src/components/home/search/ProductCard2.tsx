import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

type SearchResultProductData = {
    _id: string;
    gameName: string;
    gamePrice: number;
    gameDescription: string;
    category: {
        _id: string;
        categoryName: string;
    };
};

const ProductCard2: React.FC<{ game: SearchResultProductData }> = ({ game }) => {
    return (
        <div className="max-w-xs mx-auto p-4">
            <div className="relative border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                    <Heart />
                </button>
                <div className="p-4 flex justify-center">
                    <img
                        src="https://via.placeholder.com/150" // Replace with actual game image if available
                        alt={game.gameName}
                        className="h-40 object-contain"
                    />
                </div>
                <div className="p-4 text-center">
                    <p className="text-sm text-gray-500 font-medium">{game.category.categoryName}</p>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {game.gameName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{game.gameDescription}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">${game.gamePrice.toFixed(2)}</p>
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2">
                        <ShoppingCart size={20} />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard2;
