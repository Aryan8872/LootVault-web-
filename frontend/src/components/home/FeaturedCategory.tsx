import { Cards, CloudLightning, CurrencyDollar, DownloadSimple, GameController } from '@phosphor-icons/react';
import React from 'react';

const FeaturedCategory = () => {
  return (
    <div className="flex flex-col gap-6 items-center font-semibold px-4">
      {/* Title */}
      <span className="font-nunitobold text-xl sm:text-2xl md:text-3xl text-center">
        FEATURED CATEGORY
      </span>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-10 w-full max-w-[90vw] mx-auto">
        {/* Game */}
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <GameController
            weight="thin"
            size={32}
            className="group-hover:scale-125 transition-transform duration-500 ease-in-out group-hover:text-main_blue"
          />
          <span className="font-nunitosemibold text-sm sm:text-base">Game</span>
        </div>

        {/* Gift Cards */}
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <Cards
            weight="thin"
            size={32}
            className="group-hover:scale-125 transition-transform duration-500 ease-in-out group-hover:text-main_blue"
          />
          <span className="font-nunitosemibold text-sm sm:text-base">Gift Cards</span>
        </div>

        {/* Game Skins */}
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <CloudLightning
            weight="thin"
            size={32}
            className="group-hover:scale-125 transition-transform duration-500 ease-in-out group-hover:text-main_blue"
          />
          <span className="font-nunitosemibold text-sm sm:text-base">Game Skins</span>
        </div>

        {/* Game DLCs */}
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <DownloadSimple
            weight="thin"
            size={32}
            className="group-hover:scale-125 transition-transform duration-500 ease-in-out group-hover:text-main_blue"
          />
          <span className="font-nunitosemibold text-sm sm:text-base">Game DLCs</span>
        </div>

        {/* Game Subscriptions */}
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <CurrencyDollar
            weight="thin"
            size={32}
            className="group-hover:scale-125 transition-transform duration-500 ease-in-out group-hover:text-main_blue"
          />
          <span className="font-nunitosemibold text-sm sm:text-base">Game Subscriptions</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategory;