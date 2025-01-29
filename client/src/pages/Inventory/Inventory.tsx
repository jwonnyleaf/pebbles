import { CarSvg } from '@/components/ui/carSvg';
import DecorCarSvg from '@/components/ui/decorCarSvg';
import { CatBow } from '@/components/ui/catBow';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasBow, setHasBow] = useState(false);
  const [canEquipBow, setCanEquipBow] = useState(false);

  const handleEquipBow = () => {
    if (canEquipBow && !hasBow) {
      console.log('Equipping bow');
      setHasBow(true);
    } else if (hasBow) {
      console.log('Removing bow');
      setHasBow(false);
    }
  };

  return (
    <div className="h-full min-w-full bg-lightgreen flex items-center justify-center gap-7">
      {/* Card 1 */}
      <div className="w-3/5 max-h-[575px] h-[575px] bg-white rounded-3xl shadow-lg p-5 flex flex-col">
        <div className="flex justify-between items-center">
          <p className="text-dark-green text-lg font-bold">Pebbles</p>
        </div>
        <div className="w-full h-[400px] bg-green rounded-3xl flex justify-center items-center">
          {hasBow ? (
            <DecorCarSvg className="h-[300px]" />
          ) : (
            <CarSvg className="h-[300px]" />
          )}
          {/* Conditionally render based on whether the bow is purchased */}
        </div>
        <div className="text-center text-dark-green mt-4">doing great!</div>
        <div className="bg-gray-300 rounded-full h-4 w-full mt-4">
          <div className="bg-green h-full rounded-full w-2/3"></div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="w-[350px] h-5/6 bg-white rounded-3xl mr-8 p-8 items-center justify-center">
        <div className="grid grid-rows-4 grid-cols-2 h-full w-full gap-6">
          {!hasBow ? (
            <button
              onClick={() => handleEquipBow()}
              className="bg-white border-2 border-green h-1/8 rounded-[10px] hover:scale-105 flex justify-center items-center"
            >
              <CatBow className="w-24 h-24" />
            </button>
          ) : (
            <button
              onClick={() => handleEquipBow()}
              className="bg-white border-2 border-green h-1/8 rounded-[10px] hover:scale-105"
            >
              Remove Decorations
            </button>
          )}
          <div className="bg-white border-2 border-green h-1/8 rounded-[10px] hover:scale-105"></div>
          <div className="bg-white border-2 border-green h-1/8 rounded-[10px] hover:scale-105"></div>
          <div className="bg-white border-2 border-green h-1/8 rounded-[10px] hover:scale-105"></div>
          <div className="bg-white border-2 border-green h-1/8 rounded-[10px] hover:scale-105"></div>
          <div className="bg-white border-2 border-green h-1/8 rounded-[10px] hover:scale-105"></div>
          <div className="bg-white border-2 border-green h-1/8 rounded-[10px] hover:scale-105"></div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#393637] text-white h-1/8 rounded-[10px] hover:scale-105"
          >
            🛒 Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
