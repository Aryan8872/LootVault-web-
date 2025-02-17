import { DribbbleLogo, FacebookLogo, GithubLogo, LinkedinLogo, Peace, TwitterLogo } from "@phosphor-icons/react";


const Footer = () => {
    return (
        <>
            <div className="bg-gray-50 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        About Japan-Property.jp
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Japan-property.jp has one of the leading property portal websites in Japan,
                        foreign buyers and investors to find property from the country's top real estate agents and property developers.
                        The site's search tools empower customers to easily 'move online' becoming the one stop shop to buy, sell or rent real estate.
                        We will fully support you in purchasing real estate made for investment, as well as securing rental properties such as houses or
                        apartments at popular locations in Japan such as Tokyo, Yokohama, Osaka and Kyoto.

                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mt-4">
                    </p>
                </div>
            </div>
            <div className="bg-black text-white">
                {/* Newsletter Section */}
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                        <div>
                            <h2 className="text-2xl font-bold">Let's stay in touch!</h2>
                            <p className="text-blue-100 mt-1">We'll send you a nice letter once per week. No spam.</p>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 md:w-64 px-4 py-2 text-gray-900 rounded-l focus:outline-none"
                            />
                            <button className="bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-r transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="border-t border-blue-500">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
                            <div className="col-span-2 md:col-span-3 lg:col-span-2">
                                <img src="src\assets\logo\logo.png" alt="Logo" className="h-10 w-auto mb-4" />
                                <p className="text-blue-100 text-sm max-w-md">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a?
                                </p>
                            </div>

                            {/* Product */}
                            <div>
                                <h3 className="text-sm font-semibold mb-4">Property Listings</h3>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="#" className="text-blue-100 hover:text-white">Apartments for Sale</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Houses for Sale</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Commercial Buildings</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Hotels & Ryokans</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Land for sale </a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Apartments for Rent </a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Share Houses for Rent </a></li>
                                </ul>
                            </div>

                            {/* Resources */}
                            <div>
                                <h3 className="text-sm font-semibold mb-4">Locations</h3>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="#" className="text-blue-100 hover:text-white">Hokkaido</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Kanagawa</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Tokyo</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Osaka </a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Fukuoka</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Okinawa</a></li>
                                </ul>
                            </div>

                            {/* Company */}
                            <div>
                                <h3 className="text-sm font-semibold mb-4">Company</h3>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="#" className="text-blue-100 hover:text-white">About us</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Contact us</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Terms of use</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Privacy Policy</a></li>
                                </ul>
                            </div>

                            {/* Inquiry */}
                            <div>
                                <h3 className="text-sm font-semibold mb-4">Inquiry</h3>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="#" className="text-blue-100 hover:text-white">Buying a Home</a></li>
                                    <li><a href="#" className="text-blue-100 hover:text-white">Selling a Home</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Footer Bottom */}
                        <div className="border-t border-blue-500 pt-8 flex flex-col md:flex-row justify-between items-center">
                            <p className="text-blue-100 text-sm">© Copyright 2017 japan-property.jp</p>
                            <div className="flex space-x-4 mt-4 md:mt-0">
                                <a href="#" className="text-blue-100 hover:text-white"><TwitterLogo size={20} /></a>
                                <a href="#" className="text-blue-100 hover:text-white"><LinkedinLogo size={20} /></a>
                                <a href="#" className="text-blue-100 hover:text-white"><FacebookLogo size={20} /></a>
                                <a href="#" className="text-blue-100 hover:text-white"><GithubLogo size={20} /></a>
                                <a href="#" className="text-blue-100 hover:text-white"><Peace size={20} /></a>
                                <a href="#" className="text-blue-100 hover:text-white"><DribbbleLogo size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;