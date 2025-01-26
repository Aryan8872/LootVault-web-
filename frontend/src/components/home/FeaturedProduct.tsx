import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';

const FeaturedProduct = () => {

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
        <div className='flex flex-col gap-10 items-center font-semibold overflow-hidden'>
            <div>
                <span className='font-nunitobold text-2xl'>FEATURED PRODUCT</span>
            </div>

            <div className='flex gap-9 mb-4'>
            {games.map((game) => (
                <ProductCard
                    key={game._id}
                    product={game}
                />
            ))}
            </div>


        </div>
    )
}

export default FeaturedProduct
