import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../product/ProductCard";
import useAxiosInterceptor from "../../../interceptors/AxiosInstance";


interface SearchResultGame {
    _id: string;
    gameName: string;
    gamePrice: number;
    gameDescription: string;
    category: {
        _id: string;
        categoryName: string;
    };
}

export const SearchResults: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [displayQuery, setDisplayQuery] = useState<string[]>([query]);
    const [games, setGames] = useState<SearchResultGame[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("gamePrice");
    const [order, setOrder] = useState("asc");
    const [categories, setCategories] = useState<any[]>([]);
    const [platform, setGamePlatform] = useState<any[]>([]);
    const axiosInstance = useAxiosInterceptor(); // Use Axios interceptor


    async function getAllGameCategory() {
        try {
            const response = await axiosInstance.get("/category/game/all");
            setCategories(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function getAllGamePlatform() {
        try {
            const response = await axiosInstance.get("/platform/game");
            setGamePlatform(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleCategoryChange = (category: string, categoryName: string) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);
        setDisplayQuery([...displayQuery, categoryName]);

        const params = new URLSearchParams(searchParams);
        params.set("categories", updatedCategories.join(","));
        setSearchParams(params);
    };

    const handlePlatformChange = (platform: string, platformName: string) => {
        const updatedPlatform = selectedPlatform.includes(platform)
            ? selectedPlatform.filter((p) => p !== platform)
            : [...selectedPlatform, platform];

        setSelectedPlatform(updatedPlatform);
        setDisplayQuery([...displayQuery, platformName]);

        const params = new URLSearchParams(searchParams);
        params.set("platform", updatedPlatform.join(","));
        setSearchParams(params);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        if (selectedOption === "Price: Low to High") {
            setSortBy("gamePrice");
            setOrder("asc");
        } else if (selectedOption === "Price: High to Low") {
            setSortBy("gamePrice");
            setOrder("desc");
        }
        fetchResults();
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedPlatform([]);
        setDisplayQuery(['']);
        setSortBy("gamePrice");
        setOrder("asc");
        const params = new URLSearchParams();
        setSearchParams(params);
    };

    useEffect(() => {
        getAllGameCategory();
        getAllGamePlatform();
    }, []);

    useEffect(() => {
        fetchResults();
    }, [query, selectedCategories, selectedPlatform, sortBy, order]);

    const fetchResults = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/game/advanced-search`, {
                params: {
                    q: query,
                    category: selectedCategories.join(","),
                    platform: selectedPlatform.join(","),
                    sortBy,
                    order,
                },
            });
            setGames(response.data.games.map((game: any) => ({
                ...game,
                gamePrice: parseFloat(game.gamePrice),
            })));
        } catch (err) {
            setError("Failed to fetch search results.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    return (
        <div className="container mx-auto sm:px-4 lg:px-20 px-4 py-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Search result for: {displayQuery.join(', ')}</h1>
                <div className="flex items-center gap-4">
                    <select className="border rounded-md px-4 py-2" onChange={handleSortChange}>
                        <option>Sort by: Popularity</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                    <div className="flex gap-2">
                        <button className="p-2 border rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Clear Filters Button */}
            <div className="mb-6">
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Filters */}
                <div className="w-full lg:w-64 space-y-6">
                    {/* Category Filter */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="font-semibold text-lg mb-4">Category</h2>
                        <div className="flex flex-col">
                            {categories.map((category) => (
                                <div className="flex flex-wrap items-center gap-5 p-2" key={category._id}>
                                    <input
                                        type="checkbox"
                                        value={category.categoryName}
                                        className="h-5 w-5"
                                        onChange={() => handleCategoryChange(category._id, category.categoryName)}
                                    />


                                    <span>{category.categoryName}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Platform Filter */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="font-semibold text-lg mb-4">Platform</h2>
                        <div className="grid grid-cols-3 gap-2">
                            {platform.map((plat, index) => (
                                <button
                                    key={index}
                                    className="border rounded-md py-2 px-4 text-center hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                    onClick={() => handlePlatformChange(plat._id, plat.platformName)}
                                >
                                    {plat.platformName}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {games.map((game) => <ProductCard product={game} key={game._id} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
