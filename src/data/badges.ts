import { Badge } from '../types/user';

export const badges: Badge[] = [
  {
    id: 'first-solve',
    name: 'First Blood',
    description: 'Awarded for solving your first problem on the platform.',
    imageUrl: '/badges/first-solve.png',
    rarity: 'common',
    criteria: 'Solve your first coding problem'
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Solve at least one problem every day for 7 consecutive days.',
    imageUrl: '/badges/streak-7.png',
    rarity: 'uncommon',
    criteria: 'Maintain a 7-day solving streak'
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: 'Solve at least one problem every day for 30 consecutive days.',
    imageUrl: '/badges/streak-30.png',
    rarity: 'rare',
    criteria: 'Maintain a 30-day solving streak'
  },
  {
    id: 'streak-100',
    name: 'Century Coder',
    description: 'Solve at least one problem every day for 100 consecutive days.',
    imageUrl: '/badges/streak-100.png',
    rarity: 'legendary',
    criteria: 'Maintain a 100-day solving streak'
  },
  {
    id: 'problem-creator',
    name: 'Problem Creator',
    description: 'Create a problem that gets approved and added to the platform.',
    imageUrl: '/badges/problem-creator.png',
    rarity: 'uncommon',
    criteria: 'Create a problem that gets approved'
  },
  {
    id: 'contest-winner',
    name: 'Contest Winner',
    description: 'Win first place in any coding contest on the platform.',
    imageUrl: '/badges/contest-winner.png',
    rarity: 'epic',
    criteria: 'Win a coding contest'
  },
  {
    id: 'easy-master',
    name: 'Easy Master',
    description: 'Solve all easy difficulty problems on the platform.',
    imageUrl: '/badges/easy-master.png',
    rarity: 'uncommon',
    criteria: 'Solve all easy problems'
  },
  {
    id: 'medium-master',
    name: 'Medium Master',
    description: 'Solve all medium difficulty problems on the platform.',
    imageUrl: '/badges/medium-master.png',
    rarity: 'rare',
    criteria: 'Solve all medium problems'
  },
  {
    id: 'hard-master',
    name: 'Hard Master',
    description: 'Solve all hard difficulty problems on the platform.',
    imageUrl: '/badges/hard-master.png',
    rarity: 'epic',
    criteria: 'Solve all hard problems'
  },
  {
    id: 'expert-master',
    name: 'Expert Master',
    description: 'Solve all expert difficulty problems on the platform.',
    imageUrl: '/badges/expert-master.png',
    rarity: 'legendary',
    criteria: 'Solve all expert problems'
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Solve a problem within 5 minutes of its release.',
    imageUrl: '/badges/speed-demon.png',
    rarity: 'rare',
    criteria: 'Solve a problem within 5 minutes of release'
  },
  {
    id: 'perfect-solution',
    name: 'Perfect Solution',
    description: 'Submit a solution that ranks in the top 1% in both time and memory efficiency.',
    imageUrl: '/badges/perfect-solution.png',
    rarity: 'epic',
    criteria: 'Submit a top 1% efficient solution'
  },
  {
    id: 'one-liner',
    name: 'One-Liner',
    description: 'Solve a problem with a valid solution that uses only one line of code.',
    imageUrl: '/badges/one-liner.png',
    rarity: 'rare',
    criteria: 'Solve a problem with one line of code'
  },
  {
    id: 'helpful-commenter',
    name: 'Helpful Commenter',
    description: 'Receive 10 upvotes on your solution explanations or comments.',
    imageUrl: '/badges/helpful-commenter.png',
    rarity: 'uncommon',
    criteria: 'Get 10 upvotes on your comments'
  },
  {
    id: 'bug-hunter',
    name: 'Bug Hunter',
    description: 'Report a valid bug in a problem or test case that gets fixed.',
    imageUrl: '/badges/bug-hunter.png',
    rarity: 'rare',
    criteria: 'Report a valid bug that gets fixed'
  },
  {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'Join the platform during its beta phase.',
    imageUrl: '/badges/early-adopter.png',
    rarity: 'legendary',
    criteria: 'Join during beta phase'
  },
  {
    id: 'polyglot',
    name: 'Polyglot',
    description: 'Solve the same problem in 5 different programming languages.',
    imageUrl: '/badges/polyglot.png',
    rarity: 'epic',
    criteria: 'Solve a problem in 5 different languages'
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Submit 10 successful solutions between midnight and 5 AM.',
    imageUrl: '/badges/night-owl.png',
    rarity: 'uncommon',
    criteria: 'Submit 10 solutions between midnight and 5 AM'
  },
  {
    id: 'competition-champion',
    name: 'Competition Champion',
    description: 'Participate in 10 coding competitions.',
    imageUrl: '/badges/competition-champion.png',
    rarity: 'rare',
    criteria: 'Participate in 10 coding competitions'
  },
  {
    id: 'centennial',
    name: 'Centennial',
    description: 'Solve 100 different problems on the platform.',
    imageUrl: '/badges/centennial.png',
    rarity: 'epic',
    criteria: 'Solve 100 different problems'
  }
];