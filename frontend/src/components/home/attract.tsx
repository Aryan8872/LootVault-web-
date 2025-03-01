import Spline from '@splinetool/react-spline';

export default function ShiftProductPage() {
    return (
        <div className="flex flex-col items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold italic mb-2 sm:mb-4">
                How SHIFT <span className="font-normal not-italic">works</span>
            </h1>
            <p className="text-gray-600 mb-8 sm:mb-12">
                No complicated user settings. <br />
                No app. No Bluetooth. Simply press and restore.
            </p>

            {/* Main content area with 3 columns that stack on mobile */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                {/* Left column */}
                <div className="text-left px-4">
                    <div className="mb-6 sm:mb-8">
                        <span className="font-bold text-xl">&#x269B;</span>
                        <p className="mt-2 text-gray-700 text-sm sm:text-base">
                            Lovell microcoil emitters tie unique multidirectional magnetic fields
                        </p>
                    </div>
                    <div>
                        <span className="font-bold text-xl">&#x1F50B;</span>
                        <p className="mt-2 text-gray-700 text-sm sm:text-base">
                            Small, discrete controller allows users to access therapy with one press of a button
                        </p>
                    </div>
                </div>

                {/* Center column with 3D model */}
                <div className="w-full h-64 sm:h-80 md:h-96 relative">
                    <Spline scene="https://prod.spline.design/aWwif5WQdqqb-c4c/scene.splinecode" />
                </div>

                {/* Right column */}
                <div className="text-left px-4">
                    <div className="mb-6 sm:mb-8">
                        <p className="text-gray-700 text-sm sm:text-base">
                            SHIFT is sized to every user's head, ensuring everyone gets the proper SHIFT experience
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-700 text-sm sm:text-base">
                            Unique pulse trains and emitter sequencing algorithms yield a whole brain stimulation that is rapid and effective
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            <div className="mt-8 md:mt-16 max-w-xl md:max-w-2xl mx-auto text-gray-700 text-sm sm:text-base px-4">
                Our proprietary stimulation protocol allows users to obtain the benefits of SHIFT without having to navigate complicated user settings.
            </div>

            <button className="mt-6 md:mt-8 bg-black text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg shadow-md hover:bg-gray-800 transition">
                Buy now
            </button>
        </div>
    );
}