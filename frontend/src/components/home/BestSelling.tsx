import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ProductCard from "../product/ProductCard";
import CardSlider from "./CardSlider";

export default function BestSelling() {


    return (
        <div className="flex flex-col items-center gap-10">
            <div>
            <span className='font-nunitobold text-2xl'>BEST SELLING PRODUCTS</span>

           </div>
            <CardSlider/>
        </div>
        
    );
}
