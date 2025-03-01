const TrendingOffers = () => {
    return (
        <div className='relative flex flex-col justify-center gap-8 p-4 sm:p-8 w-full' 
             style={{ backgroundImage: "url('/src/assets/logo/icebg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            
            {/* Background overlay */}
            <div className="z-0 absolute inset-0 bg-black opacity-15"></div>
            
            {/* Main content container with improved stacking for mobile */}
            <div className="z-10 flex flex-col lg:flex-row gap-8 w-full">
                
                {/* Flash Deal Card - Fixed height issues */}
                <div className="bg-white/50 backdrop-blur-lg border border-white/25 p-4 sm:p-6 w-full lg:w-[22rem] flex flex-col rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-lg sm:text-xl text-gray-800">Flash Deal</span>
                        <div className="bg-yellow-500 text-white font-semibold px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Limited Time</div>
                    </div>
                    
                    {/* Image container with responsive height */}
                    <div className="relative w-full aspect-[4/3] mb-4 sm:mb-6">
                        <img 
                            src="https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg" 
                            alt="Product" 
                            className="w-full h-full object-cover rounded-lg" 
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                    </div>
                    
                    <div className="text-center">
                        <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2 line-clamp-2">This is the trending offer product</h3>
                        <p className="text-gray-600 font-medium text-sm sm:text-base">Redeem it fast before it's gone!</p>
                    </div>
                </div>
                
                {/* Trending offers section */}
                <div className='z-10 flex flex-col gap-4 sm:gap-8 w-full'>
                    <span className='font-nunitobold text-slate-100 text-xl sm:text-2xl'>More Currently Trending offers</span>
                    
                    {/* Grid container with better responsive control */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-gray-100 rounded-lg shadow-md p-3 sm:p-4 w-full">
                                <div className="flex">
                                    {/* Fixed width image */}
                                    <img 
                                        src="https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg" 
                                        alt="Fortnite Skin" 
                                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0" 
                                    />
                                    
                                    {/* Content with proper text truncation */}
                                    <div className="ml-3 sm:ml-4 flex-1 flex flex-col justify-between overflow-hidden">
                                        <h2 className="text-sm sm:text-base md:text-lg font-nunitobold mb-1 sm:mb-2 line-clamp-2">
                                            Random FORTNITE Skin / Item | Deluxe (PC) - Epic Games Key - $15.10
                                        </h2>
                                        <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">Epic Games Key - PC</p>
                                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800">$ 15.10</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingOffers;