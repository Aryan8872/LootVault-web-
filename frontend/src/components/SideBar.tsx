import React from 'react';
import { SidebarContext } from './SidebarContext';



export interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
}

export interface SidebarContextType {
    expanded: boolean;
}

// components/Sidebar/index.tsx
import { ChevronLast, List, MoreVertical } from "lucide-react";
import { useState } from 'react';

interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <aside className="h-screen sticky top-0">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    {/* <img
                        src="https://img.logoipsum.com/243.svg"
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
                            }`}
                        alt="Logo"
                    /> */}
                    {/* {expanded &&

                        <div className={`text-xl md:text-2xl font-medium font-patternbold text-logo-blue `}>
                            LOOTVAULT
                        </div>} */}

                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <List size={32} className="md:w-10 lg:w-12" />
                            : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt="User avatar"
                        className="w-10 h-10 rounded-md"
                    />
                    <div
                        className={`
                flex justify-between items-center
                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
            `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">John Doe</h4>
                            <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export { Sidebar };

