import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import CardSlider from "./CardSlider";
import useAxiosInterceptor from "../../interceptors/AxiosInstance";

export default function BestSelling() {

    
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
    const axiosInstance = useAxiosInterceptor(); // Use Axios interceptor


    useEffect(() => {
        getAllGames()
    }, [])

    async function getAllGames() {
        try {
            setLoading(true)
            const response = await axiosInstance.get<ApiResponse>('/game/')
            const skinResponse = await axiosInstance.get('/skins/')
            const games = response.data.games.map((game:any)=>({
                ...game,
                type:"game"
            }))
            const skins = skinResponse.data.map((skin:any)=>({...skin,type:"skin"}))
            setGames([...games,...skins])
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred')
            console.error('API Error:', e)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center gap-10">
            <div>
            <span className='font-nunitobold text-2xl'>BEST SELLING PRODUCTS</span>

           </div>
            <CardSlider products={games}/>
        </div>
        
    );
}
