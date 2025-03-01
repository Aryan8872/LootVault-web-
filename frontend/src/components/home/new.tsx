import React, { useState } from 'react';

const NewUpcomingReleases = () => {
    const [hoverLeft, setHoverLeft] = useState(false);
    const [hoverRight, setHoverRight] = useState(false);
    
    // Game data for the featured releases
    const gameData = [
        {
            id: 'game1',
            title: 'Assetto Corsa EVO',
            image: 'https://i.pinimg.com/736x/14/79/49/14794916ffa7e91b00337a3c4d556110.jpg',
            releaseDate: 'March 15, 2025',
            platform: 'PS5, Xbox Series X, PC',
            description: 'The next evolution in racing simulation'
        },
        {
            id: 'game2',
            title: 'Final Fantasy VII Rebirth',
            image: 'https://i.pinimg.com/736x/79/11/17/791117c8699dbe3ec06a5b05181140ba.jpg',
            releaseDate: 'April 22, 2025',
            platform: 'PS5, PC',
            description: 'Continue the epic journey'
        }
    ];
    
    return (
        <div className="flex flex-col py-12 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-gray-100 to-gray-200">
            {/* Section Header with Animated Underline */}
            <div className="text-center mb-8 md:mb-12">
                <h1 className="font-nunitobold text-2xl md:text-3xl lg:text-4xl relative inline-block">
                    NEW AND UPCOMING RELEASES
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-blue-500 rounded"></span>
                </h1>
                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                    Discover the most anticipated games coming to your favorite platforms
                </p>
            </div>
            
            {/* Game Cards Container - Responsive Layout */}
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 px-2 md:px-4 overflow-hidden">
                {/* Left Game Card */}
                <div 
                    className="w-full md:w-1/2 relative group cursor-pointer transition-all duration-500 ease-in-out"
                    onMouseEnter={() => setHoverLeft(true)}
                    onMouseLeave={() => setHoverLeft(false)}
                >
                    <div className="relative h-64 sm:h-72 md:h-96 overflow-hidden rounded-3xl md:rounded-r-none shadow-lg">
                        {/* Main Image with custom clip path for large screens */}
                        <div
                            className="h-full w-full"
                            style={{
                                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                '@media (min-width: 768px)': {
                                    clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)'
                                }
                            }}
                        >
                            <img
                                src={gameData[0].image}
                                alt={gameData[0].title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                                style={{
                                    transform: hoverLeft ? 'scale(1.1)' : 'scale(1)'
                                }}
                            />
                        </div>
                        
                        {/* Overlay with game details */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-end p-6 opacity-90 transition-opacity duration-300">
                            <div className="transform transition-transform duration-300" style={{ transform: hoverLeft ? 'translateY(0)' : 'translateY(10px)' }}>
                                <span className="text-xs md:text-sm font-bold px-3 py-1 bg-blue-600 text-white rounded-full">
                                    {gameData[0].releaseDate}
                                </span>
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mt-2">
                                    {gameData[0].title}
                                </h2>
                                <p className="text-gray-300 text-sm md:text-base mt-1">
                                    {gameData[0].description}
                                </p>
                                <p className="text-gray-400 text-xs md:text-sm mt-2">
                                    {gameData[0].platform}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right Game Card */}
                <div 
                    className="w-full md:w-1/2 relative group cursor-pointer transition-all duration-500 ease-in-out md:-ml-16"
                    onMouseEnter={() => setHoverRight(true)}
                    onMouseLeave={() => setHoverRight(false)}
                >
                    <div className="relative h-64 sm:h-72 md:h-96 overflow-hidden rounded-3xl md:rounded-l-none md:rounded-r-3xl shadow-lg">
                        {/* Main Image with custom clip path for large screens */}
                        <div
                            className="h-full w-full"
                            style={{
                                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                '@media (min-width: 768px)': {
                                    clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                }
                            }}
                        >
                            <img
                                src={gameData[1].image}
                                alt={gameData[1].title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                                style={{
                                    transform: hoverRight ? 'scale(1.1)' : 'scale(1)'
                                }}
                            />
                        </div>
                        
                        {/* Overlay with game details */}
                        <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent flex flex-col justify-end p-6 text-right opacity-90 transition-opacity duration-300">
                            <div className="transform transition-transform duration-300" style={{ transform: hoverRight ? 'translateY(0)' : 'translateY(10px)' }}>
                                <span className="text-xs md:text-sm font-bold px-3 py-1 bg-purple-600 text-white rounded-full">
                                    {gameData[1].releaseDate}
                                </span>
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mt-2">
                                    {gameData[1].title}
                                </h2>
                                <p className="text-gray-300 text-sm md:text-base mt-1">
                                    {gameData[1].description}
                                </p>
                                <p className="text-gray-400 text-xs md:text-sm mt-2">
                                    {gameData[1].platform}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* "View All" Button */}
            <div className="mt-8 md:mt-12 text-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform transition-transform hover:-translate-y-1">
                    View All Upcoming Games
                </button>
            </div>
        </div>
    );
};

export default NewUpcomingReleases;