import { Star, Heart, Scale, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';

const ProductCard = ({ product }) => {


    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="max-w-sm rounded-3xl bg-white p-6 shadow-lg">
            <div className="text-right text-sm text-gray-500 mb-4">
                id: {product._id}
            </div>

            <div className="relative mb-4">
                <img 
                    src={`http://localhost:3000${product.gameImagePath}`}
                    alt={product.gameName}
                    className="w-full h-auto rounded-lg"
                />
                
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                    <button className="p-2 bg-white rounded-full shadow-md">
                        <Scale className="w-5 h-5 text-blue-600" />
                    </button>
                    <button className="p-2 bg-gray-800 rounded-full shadow-md">
                        <Heart className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">
                {product.gameName}
            </h2>

            <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                        <Star 
                            key={index}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                    ))}
                </div>
                <span className="text-gray-500">{23}</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-gray-400 line-through text-lg">${product.gamePrice}</span>
                    <span className="text-blue-600 text-sm">{0}%</span>
                    <span className="text-2xl font-bold">${0}</span>
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                    <ShoppingCart className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;