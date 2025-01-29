import React, { useEffect, useState } from 'react';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy: (itemID: string) => void;
  inventory: string[];
}

interface ShopItemProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

interface ShopItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ShopItem: React.FC<ShopItemProps> = ({
  onClick,
  disabled = false,
  children,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-[150px] h-[150px] border-2 rounded-3xl flex items-center justify-center transition-transform ${
      disabled
        ? 'bg-gray-300 cursor-not-allowed opacity-50'
        : 'bg-white hover:scale-105 cursor-pointer'
    }`}
  >
    {children}
  </button>
);

const ShopPopUp: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  onBuy,
  inventory,
}) => {
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);

  // Fetch Shop Items
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
      }
    };

    fetchItems();
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSlots = 64;
  const itemSlots = [
    ...shopItems,
    ...Array(totalSlots - shopItems.length).fill(null),
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white bg-opacity-75 border-4 border-green-light p-6 w-4/5 max-w-[80%] h-4/5 shadow-lg relative rounded-3xl flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-6 -right-6 bg-red-500 text-white text-4xl rounded-full p-3 shadow-lg hover:bg-red-600 transition-all"
        >
          ✕
        </button>

        {/* Shop Items */}
        <div className="grid grid-cols-8 gap-4 w-full flex-grow min-h-0 overflow-y-auto p-4">
          {itemSlots.map((item, index) => {
            const isOwned = item && inventory.includes(item._id);
            return (
              <div
                key={item ? item._id : `empty-${index}`}
                className={`w-36 h-48 flex flex-col items-center justify-center rounded-2xl shadow-md p-3 transition-all ${
                  item
                    ? isOwned
                      ? 'bg-gray-300 cursor-not-allowed opacity-50'
                      : 'bg-green hover:scale-105 hover:shadow-xl cursor-pointer'
                    : 'bg-green-dark'
                }`}
                onClick={item && !isOwned ? () => onBuy(item._id) : undefined}
              >
                {/* Item Image or Placeholder */}
                <div className="w-24 h-24 flex items-center justify-center rounded-xl bg-green border border-gray-300 shadow-sm">
                  {item ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-contain rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400 text-2xl">❔</span>
                  )}
                </div>

                {/* Item Info */}
                {item ? (
                  <div className="mt-2 text-center">
                    <p className="font-bold text-md text-white">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                    <p className="text-sm font-semibold text-lime-500 mt-1">
                      ${item.price}
                    </p>
                    {isOwned && (
                      <p className="text-xs text-green-500 font-semibold mt-1">
                        ✅ Owned
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm mt-2">Coming Soon...</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopPopUp;
