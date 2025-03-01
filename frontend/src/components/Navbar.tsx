import { List } from "@phosphor-icons/react";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import for hook
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { SearchBar } from "./home/search/SearchBar";

export const NavBar: React.FC = () => {
    const navigate = useNavigate();  // Initialize useNavigate hook
    const { user, isAuthenticated } = useAuth(); // Consume the email from context


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="flex overflow-hidden w-full flex-row px-4 md:px-8 lg:px-16 py-4 bg-white shadow-sm">
                <div className="flex items-center justify-between w-full">
                    {/* Left Section */}
                    <div className="flex items-center justify-between min-w-[150px] md:min-w-[200px] lg:min-w-[250px]">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="cursor-pointer"
                        >
                            <List size={32} className="md:w-10 lg:w-12" />
                        </button>
                        <div
                            onClick={() => navigate("/")}

                            className="text-xl md:text-2xl font-medium font-patternbold text-logo-blue cursor-pointer">
                            LOOTVAULT
                        </div>

                    </div>

                    {/* Center Section - Search Bar */}
                    <div className="hidden md:flex flex-1 justify-center max-w-2xl px-4">
                        <SearchBar />
                    </div>

                    {/* Right Section */}
                    <div className="flex justify-between flex-row items-center gap-2 lg:gap-4">


                        {user?.role == "seller" && (<span onClick={() => navigate("/user-profile")}>seller</span>
                        )}
                        <button
                            onClick={() => navigate("/forum")}
                            className="btn btn-outline btn-neutral w-24 lg:w-28 border-logo-blue shadow-md text-logo-blue">Forum</button>


                        {/* Auth Buttons - Hidden on mobile */}
                        <div className="hidden md:flex  w-auto lg:gap-4">
                            {!isAuthenticated && (
                                <>
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="btn btn-outline btn-neutral w-24 lg:w-28 border-white bg-main_blue text-white"
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        className="btn btn-outline btn-neutral w-24 lg:w-28 border-logo-blue shadow-md text-logo-blue"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>



                        {/* Avatar - Responsive size */}
                        <div className="avatar online">
                            <div className="w-10 md:w-12 lg:w-16 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="md:hidden px-4 py-2 bg-white border-t">
                <SearchBar />
            </div>


            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                    <div className="bg-white w-64 h-full p-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-medium">Menu</span>
                                <button onClick={() => setIsMobileMenuOpen(false)}>×</button>
                            </div>
                            <button className="btn btn-active btn-secondary w-full">Sign In</button>
                            <button className="btn btn-outline btn-primary w-full">Sign Up</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};