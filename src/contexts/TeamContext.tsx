import React, { createContext, useContext, useState, useEffect } from 'react';
import { Team, TeamInvite } from '../types/team';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface TeamContextType {
  teams: Team[];
  userTeams: Team[];
  teamInvites: TeamInvite[];
  createTeam: (name: string, description: string) => Promise<Team>;
  joinTeam: (teamId: string) => Promise<void>;
  leaveTeam: (teamId: string) => Promise<void>;
  inviteMember: (teamId: string, userId: string) => Promise<void>;
  respondToInvite: (inviteId: string, accept: boolean) => Promise<void>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

// Mock data for demonstration
const MOCK_TEAMS: Team[] = [
  {
    id: '1',
    name: '算法竞赛队',
    description: '专注于算法竞赛训练的团队',
    createdBy: 'admin',
    createdAt: new Date('2024-01-01').toISOString(),
    members: [
      {
        id: '1',
        username: 'admin',
        role: 'leader',
        joinedAt: new Date('2024-01-01').toISOString(),
      }
    ],
    solvedProblems: ['1', '2', '3', '4', '5'],
  },
  {
    id: '2',
    name: '编程学习小组',
    description: '一起学习编程，共同进步',
    createdBy: 'user1',
    createdAt: new Date('2024-01-02').toISOString(),
    members: [
      {
        id: '2',
        username: 'user1',
        role: 'leader',
        joinedAt: new Date('2024-01-02').toISOString(),
      }
    ],
    solvedProblems: ['1', '2'],
  },
];

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
  const [teamInvites, setTeamInvites] = useState<TeamInvite[]>([]);

  const userTeams = teams.filter(team => 
    team.members.some(member => member.id === user?.id)
  );

  const createTeam = async (name: string, description: string): Promise<Team> => {
    if (!user) throw new Error('Must be logged in to create a team');

    const newTeam: Team = {
      id: (teams.length + 1).toString(),
      name,
      description,
      createdBy: user.username,
      createdAt: new Date().toISOString(),
      members: [{
        id: user.id,
        username: user.username,
        role: 'leader',
        joinedAt: new Date().toISOString(),
      }],
      solvedProblems: [],
    };

    setTeams(prev => [...prev, newTeam]);
    return newTeam;
  };

  const joinTeam = async (teamId: string) => {
    if (!user) throw new Error('Must be logged in to join a team');

    setTeams(prev => prev.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: [...team.members, {
            id: user.id,
            username: user.username,
            role: 'member',
            joinedAt: new Date().toISOString(),
          }],
        };
      }
      return team;
    }));
  };

  const leaveTeam = async (teamId: string) => {
    if (!user) throw new Error('Must be logged in to leave a team');

    setTeams(prev => prev.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.filter(member => member.id !== user.id),
        };
      }
      return team;
    }));
  };

  const inviteMember = async (teamId: string, userId: string) => {
    if (!user) throw new Error('Must be logged in to invite members');

    const team = teams.find(t => t.id === teamId);
    if (!team) throw new Error('Team not found');

    const invite: TeamInvite = {
      id: Date.now().toString(),
      teamId,
      teamName: team.name,
      invitedBy: user.username,
      invitedUserId: userId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setTeamInvites(prev => [...prev, invite]);
    toast.success('邀请已发送');
  };

  const respondToInvite = async (inviteId: string, accept: boolean) => {
    const invite = teamInvites.find(i => i.id === inviteId);
    if (!invite) throw new Error('Invite not found');

    if (accept) {
      await joinTeam(invite.teamId);
      toast.success('已加入团队');
    }

    setTeamInvites(prev => prev.filter(i => i.id !== inviteId));
  };

  return (
    <TeamContext.Provider value={{
      teams,
      userTeams,
      teamInvites,
      createTeam,
      joinTeam,
      leaveTeam,
      inviteMember,
      respondToInvite,
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = (): TeamContextType => {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};