
const TrendingOffers = () => {
    return (
        <div className='flex flex-col justify-center gap-8 p-8 object-cover sm:flex-row sm:items-start' style={{ backgroundImage: "url('/src/assets/logo/bg4.jpg')" }}>
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full sm:w-[22rem] h-[54vh] sm:max-h-[54vh] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-xl text-gray-800">Flash Deal</span>
                    <div className="bg-yellow-500 text-white font-semibold px-3 py-1 rounded-full text-sm">Limited Time</div>
                </div>
                <div className="relative h-[32vh] mb-6">
                    <img src="https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg" alt="Product" className="w-full h-full object-cover rounded-lg" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">This is the trending offer product</h3>
                    <p className="text-gray-600 font-medium">Redeem it fast before it's gone!</p>
                </div>
            </div>

            <div className='flex flex-col gap-8 w-full sm:w-auto'>
                <span className='font-nunitobold text-slate-100 text-2xl'>More Currently Trending offers</span>
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-2">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="bg-gray-100 rounded-lg shadow-md p-4 max-w-sm mx-auto sm:p-6 sm:max-w-lg lg:p-4">
                            <div className="flex">
                                <img src="https://letsenhance.io/static/03620c83508fc72c6d2b218c7e304ba5/11499/UpscalerAfter.jpg" alt="Fortnite Skin" className="w-24 h-24 object-cover rounded-lg sm:w-40 sm:h-40" />
                                <div className="ml-4 sm:ml-6 flex-1">
                                    <h2 className="lg:text-[1.1rem] font-nunitobold mb-2 sm:text-2xl">Random FORTNITE Skin / Item | Deluxe (PC) - Epic Games Key - $15.10</h2>
                                    <p className="text-gray-600 text-sm mb-4 sm:text-base">Epic Games Key - PC</p>
                                    <p className="lg:text-[1.15rem] font-bold text-gray-800 sm:text-3xl">$ 15.10</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingOffers;