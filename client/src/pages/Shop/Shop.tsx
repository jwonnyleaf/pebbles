import { useEffect, useState } from 'react';
import ShopPopUp from './ShopPopUp';
import { useAuth } from '@/context/AuthContext';

const Shop: React.FC = () => {
  const { user } = useAuth();
  const [isShopOpen, setIsShopOpen] = useState<boolean>(true);
  const [inventory, setInventory] = useState<string[]>([]);

  useEffect(() => {
    if (user?.inventory) {
      setInventory(user.inventory.map((item) => item.itemID));
    }
  }, [user?.inventory]);

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
        throw new Error('Failed to Purchase Item');
      }
      setInventory((prev) => [...prev, itemID]);
    } catch (error) {
      console.error('Failed to Purchase Item:', error);
    }
  };

  return (
    <ShopPopUp
      isOpen={isShopOpen}
      onClose={() => setIsShopOpen(false)}
      onBuy={(itemID) => handleBuy(itemID)}
      inventory={inventory}
    />
  );
};

export default Shop;
