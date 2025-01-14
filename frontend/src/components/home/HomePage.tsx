import React, { useEffect, useState } from 'react'
import { NavBar } from '../Navbar'
import { HelpCircle, Home, MessageSquare, Settings, ShoppingBag } from 'lucide-react'
import { SidebarItem } from '../SideBarItem'
import { Sidebar } from '../SideBar'
import axios from 'axios'
import ProductCard from '../product/ProductCard'

interface Game {
  _id: string;
  gameName: string;
  gamePrice: number;
  gameDescription: string;
  gameImagePath: string;
  gameType: string;
  category: string;
  popularity: number;
}

interface ApiResponse {
  error: boolean;
  total: number;
  page: number;
  limit: number;
  games: Game[];
}

const HomePage = () => {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllGames()
  }, [])

  async function getAllGames() {
    try {
      setLoading(true)
      const response = await axios.get<ApiResponse>('http://localhost:3000/api/game/')
      
      // Access the games array from the response
      const { games: gamesData } = response.data
      console.log(response.data)
      setGames(gamesData)
      
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred')
      console.error('API Error:', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
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

      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="flex-1 overflow-y-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">Welcome to LootVault</h1>
          
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-4">{error}</div>
          ) : games.length === 0 ? (
            <div className="text-center py-4">No games found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((game) => (
                <ProductCard 
                  key={game._id} 
                  product={game}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default HomePage