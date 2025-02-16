import Spline from '@splinetool/react-spline';

export default function ShiftProductPage() {
    return (
        <div className="flex flex-col items-center py-16 px-8 text-center">
            <h1 className="text-4xl font-semibold italic mb-4">
                How SHIFT <span className="font-normal not-italic">works</span>
            </h1>
            <p className="text-gray-600 mb-12">
                No complicated user settings. <br />
                No app. No Bluetooth. Simply press and restore.
            </p>

            <div className="relative flex flex-col md:flex-row items-center gap-12">
                <div className="text-left max-w-sm">
                    <div className="mb-8">
                        <span className="font-bold">&#x269B;</span>
                        <p className="mt-2 text-gray-700">
                            Lovell microcoil emitters tie unique multidirectional magnetic fields
                        </p>
                    </div>
                    <div>
                        <span className="font-bold">&#x1F50B;</span>
                        <p className="mt-2 text-gray-700">
                            Small, discrete controller allows users to access therapy with one press of a button
                        </p>
                    </div>
                </div>

                <Spline scene="https://prod.spline.design/aWwif5WQdqqb-c4c/scene.splinecode" />


                {/* <img
            src="/shift-cap.png"
            alt="SHIFT cap"
            className="w-full md:w-1/2 max-w-lg shadow-lg"
          /> */}

                <div className="text-left max-w-sm">
                    <div className="mb-8">
                        <p className="mt-2 text-gray-700">
                            SHIFT is sized to every user's head, ensuring everyone gets the proper SHIFT experience
                        </p>
                    </div>
                    <div>
                        <p className="mt-2 text-gray-700">
                            Unique pulse trains and emitter sequencing algorithms yield a whole brain stimulation that is rapid and effective
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16 max-w-2xl text-gray-700">
                Our proprietary stimulation protocol allows users to obtain the benefits of SHIFT without having to navigate complicated user settings.
            </div>

            <button className="mt-8 bg-black text-white px-6 py-3 rounded-full text-lg shadow-md hover:bg-gray-800 transition">
                Buy now
            </button>
        </div>
    );
}
