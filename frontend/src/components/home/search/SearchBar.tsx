import { SlidersHorizontal } from "@phosphor-icons/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { SearchBarProps } from "../../../constants/types";
import { Icon } from "../../Icon";



export const SearchBar: React.FC<SearchBarProps> = () => {
    const [query, setQuery] = React.useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-[750px] min-w-[240px] group">
            <div className="flex items-center gap-3 w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full transition-all duration-200 hover:border-gray-300 hover:shadow-sm focus-within:border-blue-400 focus-within:shadow-sm">
                <Icon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/82d3573faecc0518b3e62bb0af2b7301d58518aa1cef618e04c681b0b120950c?placeholderIfAbsent=true&apiKey=9734732ac204410384dfb945c40bc10e"
                    alt="Search icon"
                    className="w-5 aspect-square fill-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search games, items, sellers..."
                    className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button
                    type="submit"
                    className="flex items-center gap-2 px-2 py-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    aria-label="Search"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">Filters</span>
                </button>
            </div>
        </form>
    );
};
