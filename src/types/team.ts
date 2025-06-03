export interface TeamMember {
  id: string;
  username: string;
  role: 'leader' | 'member';
  joinedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  members: TeamMember[];
  solvedProblems: string[];
  avatar?: string;
}

export interface TeamInvite {
  id: string;
  teamId: string;
  teamName: string;
  invitedBy: string;
  invitedUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}