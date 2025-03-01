// src/seller/SellerDashboard.tsx
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AddProduct from '../components/product/AddProduct';
import { addProduct, deleteProduct, editProduct } from './ApiService';
import EditProductForm from './EditProducForm';
import ProductRow from './ProductRow';
import { toast } from 'react-toastify';
import SellerSidebar from './SellerSideBar';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePage, setActivePage] = useState('Campaigns');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const categories = [
    'All',
    'Games',
    'Game Skins',
    'Gift Cards',
    'DLC',
    'In-Game Items'
  ];






  const filteredProducts = products.filter(product =>
    activeCategory === 'All' || product.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black">
      <div className="flex">
        {/* Desktop Sidebar */}
        <SellerSidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
