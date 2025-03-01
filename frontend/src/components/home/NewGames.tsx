import { useEffect, useState } from 'react'
import CardSlider from './CardSlider'
import useAxiosInterceptor from '../../interceptors/AxiosInstance'

const NewGames = () => {
    
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const axiosInstance = useAxiosInterceptor(); // Use Axios interceptor


    useEffect(() => {
        getAllGames()
    }, [])

    async function getAllGames() {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/game/')
            const games = response.data.games.map((game:any)=>({
                ...game,
                type:"game"
            }))
            setGames([...games])
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An error occurred')
            console.error('API Error:', e)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex flex-col gap-10 items-center'>
            <div >
                <span className='font-nunitobold text-2xl'>GAMES</span>
            </div>
            <CardSlider products={games} />

        </div>
    )
}

export default NewGames
