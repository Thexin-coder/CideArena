import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProblems } from '../contexts/ProblemsContext';
import { useUi } from '../contexts/UiContext';
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Award, 
  CheckCircle,
  ChevronRight,
  BarChart2
} from 'lucide-react';
import { badges } from '../data/badges';
import { Badge } from '../types/user';
import BadgeModal from '../components/badges/BadgeModal';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { problems } = useProblems();
  const { setSelectedBadge, setShowBadgeModal } = useUi();
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'submissions'>('overview');
  
  if (!user) {
    return null;
  }

  const userBadges = badges.filter(badge => user.badges.includes(badge.id));
  
  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge.id);
    setShowBadgeModal(true);
  };

  // Calculate statistics
  const totalProblems = problems.length;
  const solvedProblems = user.solvedProblems.length;
  const solvingRate = totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0;

  // Prepare chart data
  const chartData = {
    labels: ['Solved', 'Unsolved'],
    datasets: [
      {
        data: [solvedProblems, totalProblems - solvedProblems],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(209, 213, 219, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(209, 213, 219, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare difficulty distribution
  const difficultyData = {
    labels: ['Easy', 'Medium', 'Hard', 'Expert'],
    datasets: [
      {
        data: [
          user.solvedProblems.filter(id => 
            problems.find(p => p.id === id)?.difficulty === 'easy'
          ).length,
          user.solvedProblems.filter(id => 
            problems.find(p => p.id === id)?.difficulty === 'medium'
          ).length,
          user.solvedProblems.filter(id => 
            problems.find(p => p.id === id)?.difficulty === 'hard'
          ).length,
          user.solvedProblems.filter(id => 
            problems.find(p => p.id === id)?.difficulty === 'expert'
          ).length,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(99, 102, 241, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(99, 102, 241, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-16"></div>
          <div className="px-6 py-4 flex flex-col md:flex-row md:items-end -mt-12">
            <div className="flex-shrink-0 mr-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-primary-700 text-4xl font-bold border-4 border-white shadow-md">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {user.role !== 'user' && (
                  <div className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs px-2 py-1 rounded-full capitalize">
                    {user.role}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex-grow">
              <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center mt-1 text-gray-500 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{user.email}</span>
                </div>
                <span className="hidden sm:inline mx-2">•</span>
                <div className="flex items-center mt-1 sm:mt-0">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="flex">
              <button
                className={`flex-1 py-4 px-6 text-center ${
                  activeTab === 'overview' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center ${
                  activeTab === 'badges' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('badges')}
              >
                Badges ({userBadges.length})
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center ${
                  activeTab === 'submissions' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('submissions')}
              >
                Submissions
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stats Cards */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Solved Problems</div>
                    <div className="mt-1 text-2xl font-bold text-primary-600">{solvedProblems}</div>
                    <div className="text-sm text-gray-500">of {totalProblems} total</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Solving Rate</div>
                    <div className="mt-1 text-2xl font-bold text-primary-600">{solvingRate.toFixed(1)}%</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Badges Earned</div>
                    <div className="mt-1 text-2xl font-bold text-accent-600">{userBadges.length}</div>
                    <div className="text-sm text-gray-500">of {badges.length} total</div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Problem Solving Progress</h3>
                    <div className="h-64 flex items-center justify-center">
                      <Doughnut 
                        data={chartData} 
                        options={{
                          plugins: {
                            legend: {
                              position: 'bottom',
                            },
                          },
                          cutout: '70%',
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Difficulty Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                      <Doughnut 
                        data={difficultyData} 
                        options={{
                          plugins: {
                            legend: {
                              position: 'bottom',
                            },
                          },
                          cutout: '60%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                
                <div className="space-y-4">
                  {user.solvedProblems.length > 0 ? (
                    user.solvedProblems.slice(0, 5).map((problemId) => {
                      const problem = problems.find(p => p.id === problemId);
                      return problem ? (
                        <div key={problemId} className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-success-100 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-success-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              Solved "{problem.title}"
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <div className="text-gray-500 text-center py-4">
                      No recent activity. Start solving problems!
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">My Badges</h2>
                  <button 
                    className="text-primary-600 text-sm flex items-center"
                    onClick={() => setActiveTab('badges')}
                  >
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                
                {userBadges.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {userBadges.slice(0, 6).map((badge) => (
                      <div 
                        key={badge.id}
                        className="flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleBadgeClick(badge)}
                      >
                        <div className={`h-14 w-14 rounded-full flex items-center justify-center shadow-md ${
                          badge.rarity === 'common' ? 'bg-gray-200' :
                          badge.rarity === 'uncommon' ? 'bg-green-200' :
                          badge.rarity === 'rare' ? 'bg-blue-200' :
                          badge.rarity === 'epic' ? 'bg-purple-200' :
                          'bg-yellow-200'
                        }`}>
                          <Award className={`h-8 w-8 ${
                            badge.rarity === 'common' ? 'text-gray-600' :
                            badge.rarity === 'uncommon' ? 'text-green-600' :
                            badge.rarity === 'rare' ? 'text-blue-600' :
                            badge.rarity === 'epic' ? 'text-purple-600' :
                            'text-yellow-600'
                          }`} />
                        </div>
                        <div className="mt-2 text-xs text-center text-gray-600">
                          {badge.name}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-4">
                    No badges earned yet. Keep solving problems to earn badges!
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Skill Breakdown</h2>
                
                <div className="space-y-4">
                  {[
                    { category: 'Arrays', progress: 75 },
                    { category: 'Strings', progress: 60 },
                    { category: 'Dynamic Programming', progress: 40 },
                    { category: 'Graphs', progress: 25 },
                    { category: 'Trees', progress: 50 },
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm font-medium text-gray-700">{skill.category}</div>
                        <div className="text-sm text-gray-500">{skill.progress}%</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary-600 h-2.5 rounded-full" 
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'badges' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Badges</h2>
            
            {userBadges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {userBadges.map((badge) => (
                  <div 
                    key={badge.id} 
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleBadgeClick(badge)}
                  >
                    <div className={`h-20 w-20 rounded-full flex items-center justify-center shadow-lg ${
                      badge.rarity === 'common' ? 'bg-gray-200' :
                      badge.rarity === 'uncommon' ? 'bg-green-200' :
                      badge.rarity === 'rare' ? 'bg-blue-200' :
                      badge.rarity === 'epic' ? 'bg-purple-200' :
                      'bg-yellow-200'
                    }`}>
                      <Award className={`h-12 w-12 ${
                        badge.rarity === 'common' ? 'text-gray-600' :
                        badge.rarity === 'uncommon' ? 'text-green-600' :
                        badge.rarity === 'rare' ? 'text-blue-600' :
                        badge.rarity === 'epic' ? 'text-purple-600' :
                        'text-yellow-600'
                      }`} />
                    </div>
                    <div className="mt-3 text-center">
                      <div className="font-medium text-gray-900">{badge.name}</div>
                      <div className="text-xs text-gray-500 capitalize mt-1">{badge.rarity} Rarity</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No badges yet</h3>
                <p className="mt-2 text-gray-500">
                  Earn badges by solving problems, participating in contests, and being active on the platform.
                </p>
              </div>
            )}
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Available Badges</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {badges
                  .filter(badge => !user.badges.includes(badge.id))
                  .slice(0, 6)
                  .map((badge) => (
                    <div key={badge.id} className="bg-gray-50 rounded-lg p-4 flex items-center">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        badge.rarity === 'common' ? 'bg-gray-200' :
                        badge.rarity === 'uncommon' ? 'bg-green-200' :
                        badge.rarity === 'rare' ? 'bg-blue-200' :
                        badge.rarity === 'epic' ? 'bg-purple-200' :
                        'bg-yellow-200'
                      }`}>
                        <Award className={`h-6 w-6 opacity-40 ${
                          badge.rarity === 'common' ? 'text-gray-600' :
                          badge.rarity === 'uncommon' ? 'text-green-600' :
                          badge.rarity === 'rare' ? 'text-blue-600' :
                          badge.rarity === 'epic' ? 'text-purple-600' :
                          'text-yellow-600'
                        }`} />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{badge.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{badge.criteria}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'submissions' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">My Submissions</h2>
            </div>
            
            {/* Sample submissions table - in a real app, this would be populated from the actual user submissions */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Problem
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Language
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Runtime
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Memory
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user.solvedProblems.length > 0 ? (
                    user.solvedProblems.map((problemId) => {
                      const problem = problems.find(p => p.id === problemId);
                      return problem ? (
                        <tr key={problemId}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{problem.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                              Accepted
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            C++
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Math.floor(Math.random() * 500) + 50} ms
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Math.floor(Math.random() * 10000) + 1000} KB
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date().toLocaleDateString()}
                          </td>
                        </tr>
                      ) : null;
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        No submissions yet. Start solving problems!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      {/* Badge Modal */}
      <BadgeModal />
    </div>
  );
};

export default ProfilePage;