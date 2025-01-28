import React, { useEffect, useState } from 'react';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy: (itemID: string) => void;
}

interface SidebarButtonProps {
  emoji: string;
  onClick: () => void;
}

interface ShopItemProps {
  onClick: () => void;
  children: React.ReactNode;
}

interface ShopItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ emoji, onClick }) => (
  <button
    onClick={onClick}
    className="h-20 w-20 p-3 bg-white text-3xl rounded-xl hover:scale-105 transition-transform"
  >
    {emoji}
  </button>
);

const ShopItem: React.FC<ShopItemProps> = ({ onClick, children }) => (
  <div
    onClick={onClick}
    className="w-[150px] h-[150px] border-2 border-[#46655C] bg-white rounded-3xl hover:scale-105 flex items-center justify-center cursor-pointer transition-transform"
  >
    {children}
  </div>
);

const ShopPopUp: React.FC<ShopModalProps> = ({ isOpen, onClose, onBuy }) => {
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) return;
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/items`
        );
        const data = await response.json();
        setShopItems(data);
      } catch (error) {
        console.error('Failed to fetch shop items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-10 rounded-3xl w-4/5 max-w-4xl h-4/5 shadow-lg relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-4xl"
        >
          ✕
        </button>
        <h2 className="text-4xl font-bold border-b border-[#46655C] pb-5 text-[#46655C]">
          SHOP
        </h2>
        <div className="flex mt-8">
          <div className="border-2 border-[#46655C] rounded-xl flex flex-col gap-6 p-3 mr-10">
            <SidebarButton emoji="💡" onClick={() => console.log('Light')} />
            <SidebarButton emoji="🍔" onClick={() => console.log('Food')} />
            <SidebarButton emoji="🎁" onClick={() => console.log('Gifts')} />
          </div>
          <div className="grid grid-cols-4 gap-5 w-full">
            {shopItems.map((item) => (
              <ShopItem key={item._id} onClick={() => onBuy(item._id)}>
                {item.image ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
                )}
              </ShopItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPopUp;
