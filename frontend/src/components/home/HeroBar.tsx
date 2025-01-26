import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function HeroBar() {
    interface Slide {
        title: string;
        description: string;
        imageSrc: string;
        ctaText: string;
    }
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<Slide[]>([
        {
            title: 'Dell XPS 13 Plus 9320 2023',
            description: 'Power, grace and elegance with unmatched portability.',
            imageSrc: 'https://admin.itti.com.np/storage/banner/fc968258-6e2d-4bca-88bf-482176eb6971.png',
            ctaText: 'Shop Now'
        },
        // You can add more slides here
        {
            title: 'MacBook Pro 2023',
            description: 'Unleash your creativity with cutting-edge performance.',
            imageSrc: 'path/to/macbook-image.png',
            ctaText: 'Explore'
        }
    ]);

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
        );
    };


    return (
        <div className="flex h-[40vh] w-[93vw] overflow-hidden sm:block md:mx-14 relative">
            <div
                className="flex w-[80%] transition-transform ease-out duration-500"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                    width: "100%"
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="w-full flex  flex-col-reverse items-center  justify-center  gap-6 md:h-auto md:gap-10 md:flex-row md:items-center"
                        style={{ width: '100%', flexShrink: 0 }}
                    >
                        {/* Left Section */}
                        <div className="z-10 lg:ml-[5rem] flex flex-2 flex-col justify-start w-full  sm:mb-0 ml-0 px-7 md:w-1/2 md:h-auto">
                            <h2
                                className="text-xl font-medium text-black sm:text-2xl md:text-4xl lg:text-4xl limit-line-2"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                {slide.title}
                            </h2>
                            <div
                                className="text-base text-[#616161]   md:text-xl mt-4 mb-6 sm:mt-22 sm:mb-[26px] sm:text-2xl limit-line-2"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                {slide.description}
                            </div>
                            <div
                                className="py-[10.5px] px-5 bg-main_blue rounded-md w-full text-center sm:w-max"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                <a
                                    className="font-bold text-white uppercase w-max whitespace-nowrap hover:text-white"
                                    aria-label={slide.ctaText.toLowerCase()}
                                >
                                    {slide.ctaText}
                                </a>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="relative flex items-start justify-center flex-1 w-full overflow-hidden md:w-1/2 md:h-auto">
                            {/* Decorative SVG */}
                            <div
                                className="absolute z-[5] left-0 right-0 flex items-center justify-center m-auto transform -translate-x-1/2 -translate-y-1/2 top-6 md:top-14"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                <svg
                                    width="422"
                                    height="386"
                                    viewBox="0 0 422 386"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-[220px] md:w-[240px] sml:w-[200px] xl:w-auto h-[170px] md:h-[250px] sml:h-[300px]"
                                >
                                    <path
                                        d="M47.1827 237.798C25.8996 164.052 -30.9964 73.5025 24.1799 20.1449C79.3888 -33.2443 165.643 35.9331 241.092 50.2808C301.768 61.8193 380.932 40.31 411.736 93.844C442.2 146.786 391.065 206.979 362.247 260.834C341.528 299.555 313.97 330.867 274.549 350.222C227.372 373.385 174.092 399.642 126.98 376.346C76.7173 351.493 62.7304 291.671 47.1827 237.798Z"
                                        fill="#BE1E2D"
                                    ></path>
                                </svg>
                            </div>

                            {/* Image for Desktop */}
                            <div
                                className="z-10 hidden md:flex justify-center items-center md:h-[300px] xl:h-[370px]"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                <img
                                    alt={slide.title}
                                    src={slide.imageSrc}
                                    width="515"
                                    height="370"
                                    className="object-contain"
                                />
                            </div>

                            {/* Image for Mobile */}
                            <div
                                className="z-10 flex justify-center h-[200px] items-center md:hidden"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                <img
                                    alt={slide.title}
                                    src={slide.imageSrc}
                                    width="290"
                                    height="200"
                                    className="object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white pointer-events-auto"
                >
                    <ChevronLeft size={25} />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white pointer-events-auto"
                >
                    <ChevronRight size={25} />
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`transition-all w-3 h-3 bg-main_blue rounded-full ${currentSlide === i ? "px-3" : "bg-opacity-50"
                                }`}
                            onClick={() => setCurrentSlide(i)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}