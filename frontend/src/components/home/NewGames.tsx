import CardSlider from './CardSlider'

const NewGames = () => {
    return (
        <div className='flex flex-col gap-10 items-center'>
            <div >
                <span className='font-nunitobold text-2xl'>GAMES</span>
            </div>
            <CardSlider />

        </div>
    )
}

export default NewGames
