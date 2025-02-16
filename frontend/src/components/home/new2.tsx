
const New2 = () => {
    return (
        <div className="flex-col ">
            <div>
            <h1 className="font-nunitobold text-2xl  text-center mb-8">EXPLORE GAME DLCs</h1>

            </div>
            <div className="grid grid-cols-4 gap-5 items-center justify-center bg-blue-100 p-6 md:p-12">
            <div className="flex flex-col items-center h-full gap-14">
                <div className=" relative h-[40%] w-[80%]">
                    <img src="https://i.pinimg.com/736x/3d/ed/33/3ded334dd6aee2c1f0287e7299f612cf.jpg" className="object-cover" />
                    <button className="absolute top-[78%] left-[28%] px-6 py-2 bg-main_blue font-nunitobold text-white rounded-lg hover:bg-blue-600 transition">
                        Shop Now
                    </button>
                </div>
                <div className="relative h-[40%] w-[80%] ">
                    <img src="https://i.pinimg.com/736x/7f/8d/20/7f8d20eab3dc9896d14dca33bbfe30e5.jpg" className="object-cover" />
                    <button className="absolute top-[78%] left-[28%] px-6 py-2 bg-main_blue font-nunitobold text-white rounded-lg hover:bg-blue-600 transition">
                        Shop Now
                    </button>

                </div>

            </div>
            <div className="grid grid-cols-1 col-span-2 h-[25rem] md:grid-cols-2 gap-8 items-center max-w-5xl bg-white p-6 md: rounded-xl shadow-lg" >
                {/* Left Side - Watch Image */}
                <div className="flex justify-center">
                    <img
                        src="https://i.pinimg.com/736x/1b/0b/e1/1b0be1293a91e01e03f0942f01775818.jpg" // Replace this with the actual path to your image
                        alt="Watches"
                        className="max-w-full h-auto"
                    />
                </div>

                {/* Right Side - Text Content */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-500 w-2 h-7 rounded-md"></div>
                        <h4 className="text-lg font-semibold text-main_blue">New Collection</h4>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
                        Explore The World Of Advanced Handwear
                    </h1>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur elit adipiscing. Donec
                        semper diam nisl, a pharetra scelerisqu nibh quis. Ante ipsum
                        vestibulum.
                    </p>
                    <button className="px-6 py-2 bg-main_blue text-white rounded-lg hover:bg-blue-600 transition">
                        Shop Now
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-center h-full gap-14">
                <div className="relative h-[40%] w-[80%]">
                    <img src="https://blog.playstation.com/tachyon/2023/12/56935f822f365f2cae0282333bf9f2e60dcb4211.jpg" className="object-cover" />
                    <button className="absolute top-[78%] left-[28%] px-6 py-2 bg-main_blue font-nunitobold text-white rounded-lg hover:bg-blue-600 transition">
                        Shop Now
                    </button>
                </div>
                <div className="relative h-[40%] w-[80%] ">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwO0ggVX7eaPpzslviQRWZO919gl2UnoSVGQ&s" className="object-cover" />
                    <button className="absolute top-[78%] left-[28%] px-6 py-2 bg-main_blue font-nunitobold text-white rounded-lg hover:bg-blue-600 transition">
                        Shop Now
                    </button>

                </div>

            </div>


        </div>
        </div>
    )
}

export default New2
