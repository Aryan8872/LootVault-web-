import { ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  const determineType = (product) => {
    if ("gameName" in product) return "game";
    if ("skinName" in product) return "skin";
    return "unknown"; // Fallback if a new type is introduced
  };
  
  const handleClick = () => {
    console.log("handle click");
    const type = determineType(product);
    console.log(type);
    navigate(`/${type}/${product._id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-lg transition-transform transform hover:scale-105 h-full"
    >
      {/* Image Section */}
      <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
        <img 
   src={`http://localhost:3000/public/uploads/${product.gameImagePath || product.skinImagePath}`}
   alt={product.gameName}
   className="w-full h-full object-cover rounded-lg"
   loading="lazy"	
        />
      </div>
      
      {/* Product Info */}
      <div className="flex flex-col">
        <h3 className="font-bold text-lg truncate">
          {product.gameName || product.skinName}
        </h3>
        <p className="text-gray-500">
          {product.gameName ? 'Game' : 'Skin'}
        </p>
      </div>
      
      {/* Rating Section */}
      <div className="flex items-center">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <Star 
              key={index}
              className={`w-4 h-4 ${index < (product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-1">(23)</span>
      </div>
      
      {/* Pricing and Buttons */}
      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold">${product.gamePrice || product.skinPrice}</span>
        <button className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 flex items-center">
          <ShoppingCart className="w-4 h-4" />
          <span className="ml-1 hidden sm:inline">Buy</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;