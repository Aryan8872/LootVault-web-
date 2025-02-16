import { Button, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDown, Search } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

const HeroSection = () => {
    const locations = ["Tokyo", "Osaka", "Kyoto", "Fukuoka", "Sapporo"];
    const prices = ["Under ¥50M", "¥50M - ¥100M", "¥100M - ¥200M", "¥200M+"];
    const beds = ["1", "2", "3", "4+"];
    const propertyTypes = ["Apartment", "House", "Mansion", "Land"];

    return (
        <div className="relative w-full min-h-[600px]  text-white"
            style={{
                backgroundImage: 'url("https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_1280.jpg")',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            {/* Background overlay */}
            {/* <div className="absolute inset-0 bg-black/50" /> */}

            <div className="relative z-10 container mx-auto px-4 pt-20">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
                    Find your ideal home in Japan
                </h1>

                <div className="flex justify-center gap-2 mb-8 transition duration-500 ease-in-out transform hover:translate-y-1">
                    <Button as={Fragment}>
                        {({ hover, active }) => (
                            <button
                                className={clsx(
                                    'rounded py-2 px-4 text-sm text-white',
                                    !hover && !active && 'bg-sky-600',
                                    hover && !active && 'bg-sky-500',
                                    active && 'bg-sky-700'
                                )}
                            >
                                Buy
                            </button>
                        )}
                    </Button>
                    <Button className="text-white hover:bg-white/20">
                        Rent
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto">
                    {/* Property Location */}
                    <Menu as="div" className="relative flex-1">
                        {({ open }) => (
                            <>
                                <Menu.Button className="w-full bg-white text-gray-900 px-4 py-2 rounded-md flex items-center justify-between transition duration-300 ease-in-out hover:bg-gray-100">
                                    <span>Property Location</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                                </Menu.Button>
                                <Transition
                                    show={open}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg">
                                        <div className="py-1">
                                            {locations.map((location) => (
                                                <Menu.Item key={location}>
                                                    {({ active }) => (
                                                        <button
                                                            className={`$${active ? 'bg-gray-100' : ''
                                                                } w-full text-left px-4 py-2 text-sm text-gray-900`}
                                                        >
                                                            {location}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>

                    {/* Max Price */}
                    <Menu as="div" className="relative flex-1">
                        {({ open }) => (
                            <>
                                <Menu.Button className="w-full bg-white text-gray-900 px-4 py-2 rounded-md flex items-center justify-between transition duration-300 ease-in-out hover:bg-gray-100">
                                    <span>Max Price</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                                </Menu.Button>
                                <Transition
                                    show={open}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg">
                                        <div className="py-1">
                                            {prices.map((price) => (
                                                <Menu.Item key={price}>
                                                    {({ active }) => (
                                                        <button
                                                            className={`$${active ? 'bg-gray-100' : ''
                                                                } w-full text-left px-4 py-2 text-sm text-gray-900`}
                                                        >
                                                            {price}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>

                    {/* Beds */}
                    <Menu as="div" className="relative flex-1">
                        {({ open }) => (
                            <>
                                <MenuButton className="w-full bg-white text-gray-900 px-4 py-2 rounded-md flex items-center justify-between transition duration-300 ease-in-out hover:bg-gray-100">
                                    <span>Beds</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                                </MenuButton>
                                <Transition
                                    show={open}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg">
                                        <div className="py-1">
                                            {beds.map((bed) => (
                                                <Menu.Item key={bed}>
                                                    {({ active }) => (
                                                        <button
                                                            className={`$${active ? 'bg-gray-100' : ''
                                                                } w-full text-left px-4 py-2 text-sm text-gray-900`}
                                                        >
                                                            {bed}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Transition>
                            </>
                        )}
                    </Menu>

                    {/* Property Type */}
                    <Menu as="div" className="relative flex-1">
                        {({ open }) => (
                            <>
                                <MenuButton className="w-full bg-white text-gray-900 px-4 py-2 rounded-md flex items-center justify-between transition duration-300 ease-in-out hover:bg-gray-100">
                                    <span>Property Type</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                                </MenuButton>
                                <Transition
                                    show={open}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute z-20 w-full mt-1 bg-white rounded-md shadow-lg">
                                        <div className="py-1">
                                            {propertyTypes.map((type) => (
                                                <MenuItem key={type}>
                                                    {({ active }) => (
                                                        <button
                                                            className={`$${active ? 'bg-gray-100' : ''
                                                                } w-full text-left px-4 py-2 text-sm text-gray-900`}
                                                        >
                                                            {type}
                                                        </button>
                                                    )}
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Transition>
                            </>
                        )}
                    </Menu>

                    {/* Search Button */}
                    <Button className="bg-red-600 hover:bg-red-700 text-white px-8 transition duration-300 transform hover:scale-105">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
