import { CarSvg } from '@/components/ui/carSvg';
import DecorCarSvg from '@/components/ui/decorCarSvg';
import { CatBow } from '@/components/ui/catBow';
import { useEffect, useState } from 'react';
import ShopPopUp from '../Shop/ShopPopUp';
import { useAuth } from '@/context/AuthContext';

const Inventory = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasBow, setHasBow] = useState(false);
  const [canEquipBow, setCanEquipBow] = useState(false);
  const bowtieID = '6796c0958389bb04b5690ad0'; // Define bowtie ID

  /**
   * Fetch user's inventory and update `canEquipBow`
   */
  const fetchInventory = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${user!.id}/inventory`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to Retrieve Inventory');
      }

      const data = await response.json();
      const inventory = data.inventory.map(
        (item: { itemID: { _id: string } }) => item.itemID._id
      );
      setCanEquipBow(inventory.includes(bowtieID));

      console.log(
        'Inventory:',
        inventory,
        'Can Equip Bow:',
        inventory.includes(bowtieID)
      );
    } catch (error) {
      console.error('Failed to Retrieve Inventory:', error);
    }
  };

  /**
   * Handle equipping and removing the bow
   */
  const handleEquipBow = () => {
    if (!canEquipBow) {
      console.log("You don't own the bow!");
      return;
    }
    setHasBow((prev) => !prev);
  };

  /**
   * Fetch inventory when component mounts
   */
  useEffect(() => {
    fetchInventory();
  }, []);

  /**
   * Fetch inventory when shop is opened (in case user buys the bow)
   */
  useEffect(() => {
    if (isModalOpen) {
      fetchInventory();
    }
  }, [isModalOpen]);

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

        <ShopPopUp
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBuy={handleEquipBow}
          inventory={[]} // Pass inventory to disable already owned items
        />
      </div>
    </div>
  );
};

export default Inventory;
