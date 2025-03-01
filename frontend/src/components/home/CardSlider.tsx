import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";




const CardSlider = ({products}) => {


    const [currentSlide, setCurrentSlide] = useState(0);
    const [productsPerSlide, setProductsPerSlide] = useState(4);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setProductsPerSlide(1);
            else if (window.innerWidth < 768) setProductsPerSlide(2);
            else if (window.innerWidth < 1024) setProductsPerSlide(3);
            else setProductsPerSlide(4);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalSlides = Math.ceil(products?.length / productsPerSlide);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full max-w-[88rem] mx-auto px-6  pb-6 overflow-hidden">
            {/* Slider Container */}
            <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full flex-shrink-0 px-8`}
                    >
                        {products
                            .slice(index * productsPerSlide, (index + 1) * productsPerSlide)
                            .map((product, idx) => (
                                <div key={idx} className="hover:scale-105 transition-transform">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white shadow-md rounded-full z-20 hover:bg-gray-200"
            >
                <ChevronLeft size={25} />
            </button>
            <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white shadow-md rounded-full z-20 hover:bg-gray-200"
            >
                <ChevronRight size={25} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
                {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                            currentSlide === i ? "bg-blue-600" : "bg-gray-400 bg-opacity-50"
                        }`}
                        onClick={() => setCurrentSlide(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardSlider;