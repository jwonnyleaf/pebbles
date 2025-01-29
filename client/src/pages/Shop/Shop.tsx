import React, { useState } from 'react';
import ShopPopUp from './ShopPopUp';
import { useAuth } from '@/context/AuthContext';

const Shop: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBuy = async (itemID: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/items/${itemID}/buy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: user!.id }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update balance');
      }

      closeModal();
      console.log('Item purchased successfully');
    } catch (error) {
      console.error('Failed to buy item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-[#46655C] mb-10">
        Welcome to the Shop
      </h1>

      <button
        onClick={openModal}
        className="px-6 py-3 bg-[#46655C] text-white rounded-xl text-lg hover:bg-[#365047] transition"
      >
        Open Shop
      </button>

      <ShopPopUp
        isOpen={isModalOpen}
        onClose={closeModal}
        onBuy={(itemID) => handleBuy(itemID)}
        inventory={user!.inventory.map((item) => item.itemID)}
      />
    </div>
  );
};

export default Shop;
