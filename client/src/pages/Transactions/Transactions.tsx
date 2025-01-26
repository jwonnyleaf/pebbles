import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const transactionData = {
    userID: user!.id,
    amount: 100,
    type: 'credit',
  };

  // Function to fetch transactions
  const fetchTransactions = async () => {
    if (!user) {
      alert('User not logged in');
      return;
    }

    setLoading(true);
    setError(null);

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
      setError(err.message || 'An error occurred');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
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

  // Fetch transactions when the component mounts
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <button onClick={createTransaction}>Create Transaction</button>

      {loading && <p>Loading transactions...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            <strong>Type:</strong> {transaction.type} | <strong>Amount:</strong>{' '}
            {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
