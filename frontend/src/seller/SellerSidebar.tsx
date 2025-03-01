// src/components/Sidebar.tsx

import { BarChart3, DollarSign, Gift, Menu, MessageSquare, Package, PieChart, Settings, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, text, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200
      ${active
                ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'}`}
    >
        <Icon size={20} />
        <span className="font-medium">{text}</span>
    </button>
);

const SellerSidebar = ({ activePage, setActivePage }) => {
    const navigate = useNavigate();



    return (
        <div className="hidden md:block w-64 h-screen bg-gray-900/50 backdrop-blur-xl border-r border-cyan-500/20 p-4 flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-4 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Menu className="text-cyan-400" size={20} />
                </div>
                <span className="text-cyan-400 font-bold text-lg">GameMarket</span>
            </div>

            <div className="space-y-2">
                <SidebarItem
                    icon={Package}
                    text="Campaigns"
                    active={activePage === 'Campaigns'}
                    onClick={() => {
                        setActivePage('Campaigns')
                        navigate('seller-dashboard')
                    }}
                />
                <SidebarItem
                    icon={BarChart3}
                    text="Analytics"
                    active={activePage === 'Analytics'}
                    onClick={() => {
                        navigate('/add-game')
                        setActivePage('Analytics')
                    }}
                />
                <SidebarItem
                    icon={PieChart}
                    text="Overview"
                    active={activePage === 'Overview'}
                    onClick={() => {
                        setActivePage('Overview')
                        navigate('/add-skin')

                    }}
                />
                <SidebarItem
                    icon={MessageSquare}
                    text="Messages"
                    active={activePage === 'Messages'}
                    onClick={() => {
                        setActivePage('Messages')
                    }
                    }
                />
                <SidebarItem
                    icon={Gift}
                    text="Promotions"
                    active={activePage === 'Promotions'}
                    onClick={() => setActivePage('Promotions')}
                />
                <SidebarItem
                    icon={DollarSign}
                    text="Payouts"
                    active={activePage === 'Payouts'}
                    onClick={() => setActivePage('Payouts')}
                />
                <SidebarItem
                    icon={Tag}
                    text="Pricing"
                    active={activePage === 'Pricing'}
                    onClick={() => setActivePage('Pricing')}
                />
                <SidebarItem
                    icon={Settings}
                    text="Settings"
                    active={activePage === 'Settings'}
                    onClick={() => setActivePage('Settings')}
                />
            </div>
        </div>
    );
};

export default SellerSidebar;
