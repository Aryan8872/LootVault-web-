import { Cards, Coin } from '@phosphor-icons/react';
import axios from 'axios';
import { Diamond, Gamepad2 } from 'lucide-react';
import React, { Suspense, useEffect, useState } from 'react';
import ShiftProductPage from './attract';
import NewAndUpcomingReleases from './new';
import DlcExplorer from './DlcExplorer';
import NewGames from './NewGames';
const LazyTrendingOffer = React.lazy(() => import('./TrendingOffers'))
const LazyFeaturedProduct = React.lazy(() => import('./FeaturedProduct'))
const LazyFeaturedCategory = React.lazy(() => import('./FeaturedCategory'))
const LazyHeroBar = React.lazy(() => import('./HeroBar'))
const LazyBestSelling = React.lazy(() => import('./BestSelling'));
const products = [
  {
    id: 1,
    image: 'https://example.com/product1.jpg',
    title: 'Product 1',
    description: 'This is the description for Product 1',
    price: 19.99
  },
  {
    id: 2,
    image: 'https://example.com/product2.jpg',
    title: 'Product 2',
    description: 'This is the description for Product 2',
    price: 24.99
  },

  {
    id: 2,
    image: 'https://example.com/product2.jpg',
    title: 'Product 2',
    description: 'This is the description for Product 2',
    price: 24.99
  },

  {
    id: 3,
    image: 'https://example.com/product2.jpg',
    title: 'Product 2',
    description: 'This is the description for Product 2',
    price: 24.99
  },

  {
    id: 4,
    image: 'https://example.com/product2.jpg',
    title: 'Product 2',
    description: 'This is the description for Product 2',
    price: 24.99
  },

  {
    id: 5,
    image: 'https://example.com/product2.jpg',
    title: 'Product 2',
    description: 'This is the description for Product 2',
    price: 24.99
  },

  {
    id: 6,
    image: 'https://example.com/product2.jpg',
    title: 'Product 2',
    description: 'This is the description for Product 2',
    price: 24.99
  },
  // Add more products as needed
];


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
const categories = [
  { icon: Gamepad2, label: 'Games' },
  { icon: Cards, label: 'GiftCards' },
  { icon: Diamond, label: 'Top up' },
  { icon: Coin, label: 'Skins', isActive: true },
];
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
      const { games: gamesData } = response.data
      setGames(gamesData)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred')
      console.error('API Error:', e)
    } finally {
      setLoading(false)
    }
  }


  return (

    <Suspense fallback={<div>Loading...</div>}>

      <LazyHeroBar />
      <LazyFeaturedCategory />
      <LazyFeaturedProduct />
      <LazyTrendingOffer />
      <LazyBestSelling />
      {/* <LazyGames/> */}
      <NewAndUpcomingReleases />
      <NewGames />
      <DlcExplorer />
      <ShiftProductPage />
    </Suspense>



  )
}

export default HomePage