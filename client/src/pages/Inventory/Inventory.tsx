import React, { useState } from "react";
import ShopPopUp from "@/components/ui/shopPopUp";

const Inventory = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
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
    );
  };
  
export default Inventory;
  