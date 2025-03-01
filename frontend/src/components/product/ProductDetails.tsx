import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Checkout from '../order/CheckOut';

// Define the interfaces based on your Mongoose model
interface IPlatform {
    _id: string;
    platformName: string;
}

interface ICategory {
    _id: string;
    categoryName: string;
}

interface IGame {
    _id: string;
    gameName: string;
    gamePrice: number;
    gameDescription: string;
    gameImagePath: string;
    gamePlatform: IPlatform;
    category: ICategory;
}

// Additional interfaces for our UI-specific data
interface IBenchmark {
    model: string;
    score: number;
}

interface IComparison {
    model: string;
    type: string;
    score: number;
    percentage: number;
}

interface ISpecs {
    cudaCores: number;
    boostClock: string;
    memorySize: string;
    memoryType: string;
}

// Extended game interface with UI-specific properties
interface IExtendedGame extends IGame {
    specs?: ISpecs;
    benchmarks?: IBenchmark[];
    comparison?: IComparison;
}



const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IExtendedGame>({
        _id: '',
        gameName: '',
        gamePrice: 0,
        gameDescription: '',
        gameImagePath: '',
        gamePlatform: { _id: '', platformName: '' },
        category: { _id: '', categoryName: '' },
        // UI-specific default data
        specs: {
            cudaCores: 8704,
            boostClock: '1.71 GHz',
            memorySize: '10 GB',
            memoryType: 'GDDR6X'
        },
        benchmarks: [
            { model: 'GeForce RTX 3090', score: 16591 },
            { model: 'GeForce RTX 3080', score: 15667 },
            { model: 'GeForce RTX 3070', score: 12736 },
            { model: 'GeForce RTX 3080Ti', score: 19945 }
        ],
        comparison: {
            model: 'GeForce 1070 Ti',
            type: 'Your Display Card',
            score: 7363,
            percentage: 67
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cartCount, setCartCount] = useState(2);
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Refs for slider functionality
    const sliderRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [showCheckout, setShowCheckout] = useState(false);

    const [type, setType] = useState("");


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                let response;
                if (window.location.pathname.includes("/game/")) {
                    response = await axios.get(`http://localhost:3000/api/game/${id}`);
                    setType("game");
                } else if (window.location.pathname.includes("/skin/")) {
                    response = await axios.get(`http://localhost:3000/api/skins/${id}`);
                    setType("skin");
                }

                // Merge fetched game data with UI-specific data
                setProduct({
                    ...response.data,
                    specs: {
                        cudaCores: 8704,
                        boostClock: '1.71 GHz',
                        memorySize: '10 GB',
                        memoryType: 'GDDR6X'
                    },
                    benchmarks: [
                        { model: 'GeForce RTX 3090', score: 16591 },
                        { model: 'GeForce RTX 3080', score: 15667 },
                        { model: 'GeForce RTX 3070', score: 12736 },
                        { model: 'GeForce RTX 3080Ti', score: 19945 }
                    ],
                    comparison: {
                        model: 'GeForce 1070 Ti',
                        type: 'Your Display Card',
                        score: 7363,
                        percentage: 67
                    }
                });


                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Failed to fetch product details');
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    useEffect(() => {
        fetchRelatedProducts();

    }, [])

    // Function to fetch related products with the same category
    const fetchRelatedProducts = async () => {
        try {

            // In a real app, you would fetch from your API
            let response;
            if (window.location.pathname.includes("/game/")) {
                response = await axios.get(`http://localhost:3000/api/game/`);
                setType("game");
                setRelatedProducts(response.data.games);

            } else if (window.location.pathname.includes("/skin/")) {
                response = await axios.get(`http://localhost:3000/api/skins/`);
                setType("skin");
                setRelatedProducts(response.data);

            }


            // For now, use mock data

        } catch (error) {
            console.error('Error fetching related products:', error);
        }
    };


    // Slider navigation functions
    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
            checkScrollPosition();
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            checkScrollPosition();
        }
    };

    const checkScrollPosition = () => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener('scroll', checkScrollPosition);
            // Check initial state
            checkScrollPosition();

            return () => {
                slider.removeEventListener('scroll', checkScrollPosition);
            };
        }
    }, [relatedProducts]);

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-blue-50 min-h-screen">
            <main className="max-w-7xl mx-auto p-4">
                {/* Back Button */}
                <div className="mb-6">
                    <Link to="/" className="flex items-center text-sm font-medium">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white mr-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 19L5 12L12 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        Back to Homepage
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="mb-8">
                            <div className="text-xl font-bold text-gray-500">    {type === "game" ? 'Game' : 'Skin'}
                            </div>
                            <h1 className="text-5xl font-light text-gray-800 mb-8">    {type === "game" ? product.gameName : product.skinName}
                            </h1>

                            <div className="flex items-baseline mb-8">
                                <span className="text-gray-500 text-sm mr-2">$</span>
                                <span className="text-5xl font-bold">    {type === "game" ? product.gamePrice : product.skinPrice}
                                </span>
                                <span className="text-2xl">.00</span>
                            </div>

                            <button 
                            onClick={() => setShowCheckout(true)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-3 px-6 rounded-md text-sm uppercase">
                                Place your order
                            </button>
                        </div>

                        {/* Card Slider for Related Products */}
                        <div className="mt-8">
                            <h2 className="text-2xl font-medium mb-4">Similar Products</h2>

                            <div className="relative">
                                {/* Left Navigation Arrow */}
                                {showLeftArrow && (
                                    <button
                                        onClick={scrollLeft}
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 19L8 12L15 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                )}

                                {/* Slider Container */}
                                <div
                                    ref={sliderRef}
                                    className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {relatedProducts.map((item) => (
                                        <Link
                                            to={`/${type}/${item._id}`}
                                            key={item._id}
                                            className="snap-start flex-none w-64 border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow duration-200"
                                        >
                                            <div className="text-sm font-medium text-gray-600">{type}</div>
                                            <div className="font-medium">    {type === "game" ? item.gameName : item.skinName}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">$    {type === "game" ? item.gamePrice : item.skinPrice}
                                            </div>
                                            <div className="h-40 bg-gray-50 rounded-md mt-3 flex items-center justify-center">
                                                <img
                                                    src={`http://localhost:3000/public/uploads/${item.gameImagePath ||item.skinImagePath}`}

                                                    className="h-32 w-auto object-contain"
                                                />
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Right Navigation Arrow */}
                                {showRightArrow && (
                                    <button
                                        onClick={scrollRight}
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L16 12L9 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        {/* Product Image */}
                        <div className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-center mb-6">
                            <img
                                src=
                                
                                {product.gameImagePath ?
                                    `http://localhost:3000/public/uploads/${product.gameImagePath}` :
                                    `http://localhost:3000/public/uploads/${product.skinImagePath}`}
                                alt= {type === "game" ? product.gameName : product.skinName}
                                className="max-h-96 object-contain"
                            />
                        </div>

                        {/* Specifications */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            {/* Product Description */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold mb-4">Description</h3>
                                <p className="text-gray-700"> {type === "game" ? product.gameDescription : product.skinDescription}</p>
                            </div>

                            {/* Category and Platform */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <div className="text-gray-500 text-sm">Category</div>
                                    <div className="text-lg font-medium">{product.category?.categoryName || 'Graphics Card'}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm">Platform</div>
                                    <div className="text-lg font-medium"> {type === "game" ? product.gamePlatform.platformName : product.skinPlatform.platformName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {showCheckout && <Checkout product={product} onClose={() => setShowCheckout(false)} />}
        </div>

        
    );
};

export default ProductDetails;