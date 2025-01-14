import { SlidersHorizontal } from "@phosphor-icons/react";
import * as React from "react";
import { SearchBarProps } from "../constants/types";
import { Icon } from "./Icon";

// export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => (
//     <div className="flex flex-wrap gap-10 justify-between shadow-sm items-center self-stretch py-2 pr-6 pl-4 my-auto text-xl text-gray-400 rounded-full bg-zinc-100 min-h-[48px] min-w-[240px] w-[749px] max-md:pr-5 max-md:max-w-full">
//         <div className="flex gap-4 justify-center items-center self-stretch py-1.5 pr-2 pl-4 my-auto rounded min-h-[32px]">
//             <Icon
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/82d3573faecc0518b3e62bb0af2b7301d58518aa1cef618e04c681b0b120950c?placeholderIfAbsent=true&apiKey=9734732ac204410384dfb945c40bc10e"
//                 alt="Search icon"
//                 className="w-5 aspect-square fill-gray-400"
//             />
//             <label htmlFor="searchInput" className="sr-only">Search Gmail</label>
//             <input
//                 id="searchInput"
//                 type="text"
//                 placeholder="Search"
//                 className="bg-transparent border-none outline-none text-gray-400"
//                 onChange={(e) => onSearch?.(e.target.value)}
//             />
//         </div>
//         <Icon
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/682d3390996a7866ee0121467a2a3997ac1af09a5a4b13268a4def312b4c4f44?placeholderIfAbsent=true&apiKey=9734732ac204410384dfb945c40bc10e"
//             alt="Filter"
//             className="aspect-[1.86] fill-gray-500 w-[13px]"
//         />
//     </div>
// );


export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <div className="relative w-full max-w-[750px] min-w-[240px] group">
            <div className="flex items-center gap-3 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full transition-all duration-200 hover:border-gray-300 hover:shadow-sm focus-within:border-blue-400 focus-within:shadow-sm">
                {/* Search Icon */}

                <Icon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/82d3573faecc0518b3e62bb0af2b7301d58518aa1cef618e04c681b0b120950c?placeholderIfAbsent=true&apiKey=9734732ac204410384dfb945c40bc10e"
                    alt="Search icon"
                    className="w-5 aspect-square fill-gray-400"
                />

                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Search games, items, sellers..."
                    className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base"
                    onChange={(e) => onSearch?.(e.target.value)}
                />

                {/* Divider */}
                <div className="w-px h-5 bg-gray-200"></div>

                {/* Filter Button */}
                <button
                    className="flex items-center gap-2 px-2 py-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    aria-label="Filter search"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">Filters</span>
                </button>
            </div>

            {/* Focus ring animation */}
            <div className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-25"></div>
            </div>
        </div>
    );
};