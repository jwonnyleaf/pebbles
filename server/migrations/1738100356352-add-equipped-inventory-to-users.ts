// Import your schemas here
import type { Connection } from 'mongoose';

export async function up(connection: Connection): Promise<void> {
  // Write migration here
  const userCollection = connection.collection('users');
  await userCollection.updateMany(
    {},
    {
      $set: {
        inventory: [],
        equippedItems: [],
      },
    }
  );
}

export async function down(connection: Connection): Promise<void> {
  // Write migration here
  const userCollection = connection.collection('users');
  await userCollection.updateMany(
    {},
    {
      $unset: {
        inventory: '',
        equippedItems: '',
      },
    }
  );
}
