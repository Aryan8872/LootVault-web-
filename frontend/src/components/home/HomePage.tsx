import React, { useEffect } from 'react'
import { NavBar } from '../Navbar'
import { HelpCircle, Home, MessageSquare, Settings, ShoppingBag } from 'lucide-react'
import { SidebarItem } from '../SideBarItem'
import { Sidebar } from '../SideBar';
import axios from 'axios';

const HomePage = () => {

  const loadGame = useEffect(()=>{
    getAllGames();
  })



  
  async function getAllGames() {

    try{
      const gameData = axios.get('http://localhost:3000/api/game/').then((res)=>{
        console.log(res.data)
      })

    }
    catch(e){
      console.log(e)
    }

    
  }
  return (
<div className="flex h-screen bg-gray-50">
      {/* Sidebar */}

      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" active />
        <SidebarItem icon={<ShoppingBag size={20} />} text="Products" />
        <SidebarItem 
          icon={<MessageSquare size={20} />} 
          text="Community" 
          alert 
        />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<HelpCircle size={20} />} text="Help" />
      </Sidebar>
    

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="flex-1 overflow-y-auto p-4">
          {/* Your page content goes here */}
          <h1 className="text-2xl font-semibold mb-4">Welcome to LootVault</h1>
          {/* Add more content as needed */}
        </main>
      </div>

   
    </div>
  )
}

export default HomePage
