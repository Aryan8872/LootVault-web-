// src/components/ProductRow.tsx
import axios from 'axios';
import { ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteProduct } from './ApiService';


const SellerHome = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [games, setGames] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null); // State for editing product


    const getAllGames = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/game/").then((response) => {
                setGames(response.data.games);
                console.log(response.data.games);
            });
        } catch (e) {
            console.log(e);
        }
    }




    useEffect(() => { getAllGames() }, [])

    return (
        <>
            <div>
                <div className='text-white justify-self-center font-nunitobold text-2xl mb-4'>
                    Welcome Back!
                </div>
                {games.map((game) => <ProductRow
                    key={game._id}
                    games={game}
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    product={[]}
                    setGames={setGames}
                    setEditingProduct={setEditingProduct} // Pass function to open edit form

                />)}


                {editingProduct && (
                    console.log(editingProduct),
                    <EditForm
                        game={editingProduct}
                        setGames={setGames}
                        onUpdate={() => setEditingProduct(null)} // Close form
                    />
                )}
            </div>
        </>


    );
}

const ProductRow = ({ product, setIsExpanded, isExpanded, games,setGames, setEditingProduct }) => {

    const handleDelete = async () => {
        try {
            await deleteProduct(games._id)
            toast.success('Product deleted successfully!');
            setGames((prevGames) => prevGames.filter((game) => game._id !== games._id)); // Remove deleted game from the state
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleExpansion = () => {
        setIsExpanded((prevExpanded) => prevExpanded === games._id ? null : games._id);  // Toggle logic
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-lg p-4 mb-3 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shrink-0">
                        <img src={`http://localhost:3000/public/uploads/${games.gameImagePath || games.skinImagePath}`} alt={games?.gameName} className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-100">{games?.gameName}</h3>
                        <div className="text-sm text-gray-400">
                            {games.category.categoryName}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${product?.status === 'Live'
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-gray-800 text-gray-400'
                        }`}>
                        {/* {product.status} */}    status
                    </span>

                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                            onClick={() => setEditingProduct(games)} // Open edit form
                        >
                            <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-400 transition-colors" onClick={handleDelete}>
                            <Trash2 size={18} />
                        </button>
                        <button
                            className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                            onClick={handleExpansion}  // Call handleExpansion to toggle
                        >
                            {isExpanded === games._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {isExpanded === games._id && (  // Only show details if the current game is expanded
                <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <div className="text-sm text-gray-400">Price</div>
                            <div className="font-medium text-cyan-400">${games?.gamePrice}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm text-gray-400">Description</div>
                            <div className="font-medium text-cyan-400">{games?.gameDescription}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-sm text-gray-400">Rating</div>
                            <div className="font-medium text-cyan-400">⭐ {games?.rating}/5</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};





const EditForm = ({ game, onUpdate,setGames }) => {
    const [skinName, setSkinName] = useState(game.gameName || "");
    const [skinPrice, setSkinPrice] = useState(game.gamePrice || "");
    const [skinDescription, setSkinDescription] = useState(game.gameDescription || "");
    const [image, setImage] = useState(null);
    const [gamePlatform, setGamePlatform] = useState([]);
    const [selectedGamePlatform, setSelectedGamePlatform] = useState(game.gamePlatform || null);
    const [gameCategories, setGameCategories] = useState([]);
    const [selectedGameCategory, setSelectedGameCategory] = useState(game.category || null);
    const [platformQuery, setPlatformQuery] = useState('');
    const [categoryQuery, setCategoryQuery] = useState('');

    useEffect(() => {
        getAllGameCategory();
        getAllGamePlatform();
    }, []);

    useEffect(() => {
        if (categoryQuery === '') {
            setGameCategories(gameCategories); // Fix: Use setter for categories
        } else {
            setGameCategories(
                gameCategories.filter((category) =>
                    category.categoryName.toLowerCase().includes(categoryQuery.toLowerCase())
                )
            );
        }
    }, [categoryQuery, gameCategories]);

    useEffect(() => {
        if (platformQuery === '') {
            setGamePlatform(gamePlatform); // Fix: Use setter for platform
        } else {
            setGamePlatform(
                gamePlatform.filter((platform) =>
                    platform.platformName.toLowerCase().includes(platformQuery.toLowerCase())
                )
            );
        }
        console.log(gamePlatform)

    }, [platformQuery, gamePlatform]);

    async function getAllGameCategory() {
        try {
            const response = await axios.get("http://localhost:3000/api/category/game/all");
            setGameCategories(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function getAllGamePlatform() {
        try {
            const response = await axios.get("http://localhost:3000/api/platform/game");
            setGamePlatform(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = async (e) => {
        if (!selectedGamePlatform?._id) {
            alert("Please select a valid platform.");
            return; // Stop the form submission if no platform is selected
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append("gameName", skinName);
        formData.append("gamePrice", skinPrice);
        formData.append("gameDescription", skinDescription);
        if (image) formData.append("image", image);
        formData.append("gamePlatform", selectedGamePlatform?._id);
        formData.append("category", selectedGameCategory?._id);

        try {
            const response = await axios.patch(`http://localhost:3000/api/game/${game._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const updatedGame = response.data
            setGames((prevGames) =>
                prevGames.map((g) => (g._id === game._id ? updatedGame : g))
            );
            alert("Product updated successfully!");

            onUpdate();
        } catch (error) {
            console.error("Error updating game:", error);
            alert("Failed to update product.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Game</h2>
            <div className="space-y-6">

                {/* Game Name */}
                <div className="space-y-2">
                    <label htmlFor="skinName" className="block text-gray-700 font-medium">Game Name</label>
                    <input
                        type="text"
                        id="skinName"
                        value={skinName}
                        onChange={(e) => setSkinName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter game name"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label htmlFor="skinDescription" className="block text-gray-700 font-medium">Description</label>
                    <textarea
                        id="skinDescription"
                        value={skinDescription}
                        onChange={(e) => setSkinDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter game description"
                    />
                </div>

                {/* Price */}
                <div className="space-y-2">
                    <label htmlFor="skinPrice" className="block text-gray-700 font-medium">Price</label>
                    <input
                        type="number"
                        id="skinPrice"
                        value={skinPrice}
                        onChange={(e) => setSkinPrice(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter game price"
                    />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <label htmlFor="productImage" className="block text-gray-700 font-medium">Product Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Platform */}
                <div className="space-y-2">
                    <label htmlFor="skinPlatform" className="block text-gray-700 font-medium">Platform</label>
                    <select
                        id="skinPlatform"
                        value={selectedGamePlatform?._id || ''}
                        onChange={(e) => setSelectedGamePlatform(gamePlatform.find(p => p._id === e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Platform</option>
                        {gamePlatform.map((platform) => (
                            <option key={platform._id} value={platform._id}>{platform.platformName}</option>
                        ))}
                    </select>
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label htmlFor="skinCategory" className="block text-gray-700 font-medium">Category</label>
                    <select
                        id="skinCategory"
                        value={selectedGameCategory?._id || ''}
                        onChange={(e) => setSelectedGameCategory(gameCategories.find(c => c._id === e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Category</option>
                        {gameCategories.map((category) => (
                            <option key={category._id} value={category._id}>{category.categoryName}</option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
                    >
                        Update Game
                    </button>
                </div>
            </div>
        </form>
    );
};



export default SellerHome;