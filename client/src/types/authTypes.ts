export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
  petName: string;
  equippedItems: {
    itemID: string;
  }[];
  inventory: {
    itemID: string;
    obtainedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
