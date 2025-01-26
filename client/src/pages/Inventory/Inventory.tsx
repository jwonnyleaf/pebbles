import React, { useState } from "react";
import ShopPopUp from "@/components/ui/shopPopUp";

const Inventory = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="h-full min-w-full bg-lightgreen flex items-center justify-center gap-7">
       
     {/* Card 1 */}
     <div className="w-1/2 h-4/5 bg-white rounded-3xl ml-8 p-8">
        <div className="w-full h-4/5 bg-green rounded-[15px] p-4 text-white">
        <h1 className="text-3xl font-Poppins p-3">Pebbles</h1>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-1/2 h-4/5 bg-white rounded-3xl mr-8 p-8 items-center justify-center ">
        <div className="grid grid-rows-4 grid-cols-2 h-full w-full gap-6">
        {/* Box 1 */}
        <div className="bg-lightgreen h-1/8 rounded-[10px]"></div>
        {/* Box 2 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 3 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 4 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 5 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 6 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 7 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
        {/* Box 8 */}
        <div className="bg-green h-1/8 rounded-[10px]"></div>
      </div>
        <div className="relative flex flex-col items-center p-5">
        <div className="flex flex-row justify-between w-full">
          <h1 className="text-3xl font-bold">Cat Game</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-3 bg-gray-800 text-white rounded-lg"
          >
            🛒 Shop
          </button>
        </div>

        <ShopPopUp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
        </div></div>  
      );
  };
  
export default Inventory;
  