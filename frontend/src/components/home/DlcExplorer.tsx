const DlcExplorer = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="py-4">
                <h1 className="font-nunitobold text-2xl text-center mb-4 md:mb-8">EXPLORE GAME DLCs</h1>
            </div>

            {/* Main grid container - switch to single column on small screens */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5 items-center justify-center bg-blue-100 p-4 md:p-6 lg:p-12">

                {/* First column - stacked images */}
                <div className="flex flex-col items-center w-full gap-6 md:gap-10 lg:gap-14">
                    <div className="relative w-full max-w-xs">
                        <div className="relative pb-[100%]"> {/* Maintain aspect ratio */}
                            <img
                                src="https://i.pinimg.com/736x/3d/ed/33/3ded334dd6aee2c1f0287e7299f612cf.jpg"
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                alt="Game DLC"
                            />
                        </div>
                        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 sm:px-6 py-2 bg-main_blue font-nunitobold text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition">
                            Shop Now
                        </button>
                    </div>

                    <div className="relative w-full max-w-xs">
                        <div className="relative pb-[100%]"> {/* Maintain aspect ratio */}
                            <img
                                src="https://i.pinimg.com/736x/7f/8d/20/7f8d20eab3dc9896d14dca33bbfe30e5.jpg"
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                alt="Game DLC"
                            />
                        </div>
                        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 sm:px-6 py-2 bg-main_blue font-nunitobold text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition">
                            Shop Now
                        </button>
                    </div>
                </div>

                {/* Middle featured section - spans 2 columns on large screens */}
                <div className="grid grid-cols-1 md:col-span-2 gap-6 items-center bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                    {/* Featured content grid - stacks on mobile, side by side on larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Left Side - Watch Image */}
                        <div className="flex justify-center">
                            <img
                                src="https://i.pinimg.com/736x/1b/0b/e1/1b0be1293a91e01e03f0942f01775818.jpg"
                                alt="Watches"
                                className="max-w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Right Side - Text Content */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-500 w-2 h-7 rounded-md"></div>
                                <h4 className="text-base sm:text-lg font-semibold text-main_blue">New Collection</h4>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 break-words">
                                Explore The World Of Advanced Handwear
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur elit adipiscing. Donec
                                semper diam nisl, a pharetra scelerisqu nibh quis.
                            </p>
                            <button className="px-4 sm:px-6 py-2 bg-main_blue text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Last column - stacked images */}
                <div className="flex flex-col items-center w-full gap-6 md:gap-10 lg:gap-14">
                    <div className="relative w-full max-w-xs">
                        <div className="relative pb-[100%]"> {/* Maintain aspect ratio */}
                            <img
                                src="https://blog.playstation.com/tachyon/2023/12/56935f822f365f2cae0282333bf9f2e60dcb4211.jpg"
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                alt="Game DLC"
                            />
                        </div>
                        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 sm:px-6 py-2 bg-main_blue font-nunitobold text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition">
                            Shop Now
                        </button>
                    </div>

                    <div className="relative w-full max-w-xs">
                        <div className="relative pb-[100%]"> {/* Maintain aspect ratio */}
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwO0ggVX7eaPpzslviQRWZO919gl2UnoSVGQ&s"
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                alt="Game DLC"
                            />
                        </div>
                        <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 sm:px-6 py-2 bg-main_blue font-nunitobold text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DlcExplorer