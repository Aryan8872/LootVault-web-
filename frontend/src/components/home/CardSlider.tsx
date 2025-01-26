import React, { useState } from 'react'
import ProductCard from '../product/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CardSlider = () => {
    interface Product {
        gameName: String,
        gameImagePath: String,
        gamePrice: String,

    }

    const [currentSlide, setCurrentSlide] = useState(0);
    const products: Product[] = [
        { gameName: "Product 1", gameImagePath: "image-1736860935691-459669928.png", gamePrice: "$100" },
        { gameName: "Product 2", gameImagePath: "image-1736860935691-459669928.png", gamePrice: "$200" },
        { gameName: "Product 3", gameImagePath: "image-1736860935691-459669928.png", gamePrice: "$300" },
        { gameName: "Product 4", gameImagePath: "image-1736860935691-459669928.png", gamePrice: "$400" },
        { gameName: "Product 5", gameImagePath: "image-1736860935691-459669928.png", gamePrice: "$500" },
        { gameName: "Product 6", gameImagePath: "image-1736860935691-459669928.png", gamePrice: "$600" },
        { gameName: "Product 7", gameImagePath: "image-1736860935691-459669928.png", gamePrice: "$700" },
        { gameName: "Product 8", gameImagePath: "image-1736860935691-459669928.png", gamePrice: "$800" }
    ];

    const productsPerSlide = 5;
    const totalSlides = Math.ceil(products.length / productsPerSlide);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };
  return (
    <div className="relative w-full max-w-[95rem] pb-10 mx-auto overflow-hidden">
    <div
        className="flex  transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)`, width: "100%" }}
    >
        {Array.from({ length: totalSlides }).map((_, index) => (
            <div key={index} className="grid grid-cols-1 pl-10 sm:grid-cols-2 md:grid-cols-5 gap-6 w-full flex-shrink-0">
                {products.slice(index * productsPerSlide, (index + 1) * productsPerSlide).map((product, idx) => (
                    <ProductCard key={idx} product={product} />
                ))}
            </div>
        ))}
    </div>

    <button
        onClick={prevSlide}
        className="absolute left-1 top-1/2 transform -translate-y-1/2 p-1 bg-white shadow-md rounded-full"
    >
        <ChevronLeft size={25} />
    </button>
    <button
        onClick={nextSlide}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 bg-white shadow-md rounded-full"
    >
        <ChevronRight size={25} />
    </button>

    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
            <div
                key={i}
                className={`transition-all w-3 h-3 rounded-full ${currentSlide === i ? " bg-main_blue  px-3" : "bg-gray-400 bg-opacity-50"}`}
                onClick={() => setCurrentSlide(i)}
            />
        ))}
    </div>
</div>
  )
}

export default CardSlider
