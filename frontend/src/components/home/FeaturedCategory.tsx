import { Cards, CloudLightning, CurrencyDollar, DownloadSimple, GameController } from '@phosphor-icons/react'
import { Download } from 'lucide-react'
import React from 'react'

const FeaturedCategory = () => {
  return (
    <div className='flex flex-col gap-10 items-center font-semibold'>
        <span className='font-nunitobold text-2xl'>FEATURED CATEGORY</span>

        <div className='flex gap-28'>
            <div className='flex flex-col items-center gap-5'>
                <GameController weight='thin' size={40} stroke='regular' className='cursor-pointer hover:scale-125 transition-transform duration-500 ease-in-out hover:text-main_blue'/>
                <span className='font-nunitosemibold '>Game</span>

            </div>

            <div className='flex flex-col items-center gap-5'>
                <Cards weight='thin' size={40} stroke='regular' className='cursor-pointer hover:scale-125 transition-transform duration-500 ease-in-out hover:text-main_blue'/>
                <span className='font-nunitosemibold  '>Gift Cards</span>

            </div>

            <div className='flex flex-col items-center gap-5'>
                <CloudLightning  stroke='thin' size={40} className='cursor-pointer hover:scale-125 transition-transform duration-500 ease-in-out hover:text-main_blue'/>
                <span className='font-nunitosemibold '>Game Skins</span>

            </div>

            <div className='flex flex-col items-center gap-5'>
            <DownloadSimple stroke='thin' size={40} className='cursor-pointer hover:scale-125 transition-transform duration-500 ease-in-out hover:text-main_blue'/>
            <span className='font-nunitosemibold '>Game DLCs</span>

            </div>

            <div className='flex flex-col items-center gap-5'>
                <CurrencyDollar  size={40} stroke='thin' className='cursor-pointer hover:scale-125 transition-transform duration-500 ease-in-out hover:text-main_blue'/>
                <span className='font-nunitosemibold '>Game Subscriptions</span>

            </div>
        </div>
      
    </div>
  )
}

export default FeaturedCategory
