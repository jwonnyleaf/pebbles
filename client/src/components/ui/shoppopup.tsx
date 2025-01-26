import React from "react";
import { CatBow } from "@/components/ui/catBow"

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyBow: () => void; // Add a function prop to handle buying the bow
}

const ShopPopUp: React.FC<ShopModalProps> = ({ isOpen, onClose, onBuyBow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-3xl w-3/5 h-4/5 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-4xl mr-10 mt-8"
        >
          ✕
        </button>

        <h2 className="text-4xl font-bold mb- ml-4 mt-2 border-b border-[#46655C] pb-7 text-[#46655C]">
          SHOP
        </h2>
        <div className="flex">
          {/* Sidebar with Categories */}
          <div className="border-2 border-[#46655C] rounded-xl flex flex-col justify-center gap-8 p-3 mr-10 mt-14">
            <button className="h-20 w-20 p-3 bg-white-200 text-3xl rounded-xl hover:scale-105">
              💡
            </button>
            <button className="h-20 w-20 p-3 bg-white-200 text-3xl rounded-xl hover:scale-105">
              🍔
            </button>
            <button className="h-20 w-20 p-3 bg-white-200 text-3xl rounded-xl hover:scale-105">
              🎁
            </button>
          </div>
          {/* Shop Items */}
          <div className="grid grid-cols-4 gap-3 w-full mr-5 mt-14">
            {/* Bow Item */}
            <div
              onClick={onBuyBow} // Trigger the bow purchase when clicked
              className="w-[150px] h-[150px] border-2 border-[#46655C] bg-[#FFFFFF] rounded-3xl hover:scale-105 flex items-center justify-center cursor-pointer"
            >
                <CatBow className = "w-24 h-24" />
            </div>
            {/* Other Items */}
            <div className="w-[150px] h-[150px] border-2 border-[#46655C] bg-[#FFFFFF] rounded-3xl hover:scale-105"></div>
            <div className="w-[150px] h-[150px] border-2 border-[#46655C] bg-[#FFFFFF] rounded-3xl hover:scale-105"></div>
            <div className="w-[150px] h-[150px] border-2 border-[#46655C] bg-[#FFFFFF] rounded-3xl hover:scale-105"></div>
            <div className="w-[150px] h-[150px] border-2 border-[#46655C] bg-[#FFFFFF] rounded-3xl hover:scale-105"></div>
            <div className="w-[150px] h-[150px] border-2 border-[#46655C] bg-[#FFFFFF] rounded-3xl hover:scale-105"></div>
            <div className="w-[150px] h-[150px] border-2 border-[#46655C] bg-[#FFFFFF] rounded-3xl hover:scale-105"></div>
            <div className="w-[150px] h-[150px] border-2 border-[#46655C] bg-[#FFFFFF] rounded-3xl hover:scale-105"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPopUp;
