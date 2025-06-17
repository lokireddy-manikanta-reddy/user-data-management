
import { User } from '@/types/user';

export const fetchUsers = async (): Promise<User[]> => {
  console.log('Fetching users from API...');
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  const users = await response.json();
  console.log('Fetched users:', users);
  return users;
};

export const fetchUserById = async (id: number): Promise<User> => {
  console.log(`Fetching user with ID: ${id}`);
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID: ${id}`);
  }
  
  const user = await response.json();
  console.log('Fetched user:', user);
  return user;
};
