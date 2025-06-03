export type UserRole = 'user' | 'admin' | 'owner';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  solvedProblems: string[]; // IDs of solved problems
  badges: string[]; // IDs of earned badges
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  criteria: string;
}