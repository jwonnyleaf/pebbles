import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/context/AuthContext';

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);

  const transactionData = {
    userID: user!.id,
    name: 'Test Transaction',
    amount: 100,
    type: 'credit',
  };

  // Function to fetch transactions
  const fetchTransactions = async () => {
    if (!user) {
      alert('User not logged in');
      return;
    }

    try {
      const response = await fetch(`/api/transact/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      setTransactions(data);
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
    } finally {
    }
  };

  // Function to create a transaction
  const createTransaction = async () => {
    try {
      const response = await fetch('/api/transact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Transaction Created: ' + JSON.stringify(data));
        fetchTransactions(); // Refresh transactions after creating one
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      alert('Error creating transaction');
      console.error('Transaction error:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col p-4 bg-green-dark rounded-[1rem]">
        <Table className="flex-grow text-white">
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell className="font-medium">{transaction._id}</TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell className="text-right">
                  {transaction.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-4 bg-gray-200">
        <button
          onClick={createTransaction}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Transaction
        </button>
      </div>
    </div>
  );
};

export default Transactions;
