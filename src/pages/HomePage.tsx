import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProblems } from '../contexts/ProblemsContext';
import { useUi } from '../contexts/UiContext';
import { 
  Award, 
  Code, 
  Clock, 
  Zap, 
  BookOpen, 
  Trophy, 
  Users,
  PlusCircle,
  ChevronRight,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import BadgeModal from '../components/badges/BadgeModal';
import { badges } from '../data/badges';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { problems } = useProblems();
  const { setShowBadgeModal, setSelectedBadge } = useUi();
  const [showSpinner, setShowSpinner] = useState(false);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  const recentProblems = problems.slice(0, 5);
  const easyChallenges = problems.filter(p => p.difficulty === 'easy').slice(0, 4);
  
  const handleCollectDailyReward = () => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
      // Randomly select a badge
      const randomBadge = badges[Math.floor(Math.random() * badges.length)];
      setActiveBadge(randomBadge.id);
      setSelectedBadge(randomBadge.id);
      setShowBadgeModal(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Level Up Your Coding Skills
              </motion.h1>
              <motion.p 
                className="text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Master algorithms, solve challenging problems, and compete with
                fellow programmers in a supportive community.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/problems" className="btn-accent">
                  Start Solving
                </Link>
                {!isAuthenticated && (
                  <Link to="/register" className="btn-outline">
                    Sign Up Free
                  </Link>
                )}
              </motion.div>
            </div>
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent-500 rounded-lg transform -rotate-3"></div>
                <div className="relative bg-dark-800 text-gray-300 p-6 rounded-lg shadow-xl font-mono text-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-error-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-warning-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
                    <span className="ml-2 text-gray-400">problem.cpp</span>
                  </div>
                  <pre className="text-xs md:text-sm">
                    <code>
{`#include <iostream>
#include <vector>
using namespace std;

int solve(vector<int>& nums) {
    // Your solution here
    int n = nums.size();
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < n; i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    
    return maxSum;
}

int main() {
    int n;
    cin >> n;
    
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    cout << solve(nums) << endl;
    return 0;
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Daily Reward Section (for logged in users) */}
      {isAuthenticated && (
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-accent-100 to-accent-200 rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-accent-900 mb-2">Daily Badge Collection</h2>
                  <p className="text-accent-800">
                    Spin the wheel to collect a random badge for your profile!
                  </p>
                </div>
                <button 
                  className="btn-accent flex items-center space-x-2"
                  onClick={handleCollectDailyReward}
                  disabled={showSpinner}
                >
                  {showSpinner ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      <span>Spinning...</span>
                    </>
                  ) : (
                    <>
                      <Award className="h-5 w-5" />
                      <span>Collect Daily Reward</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-primary-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Code className="h-6 w-6 text-primary-700" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Problems</p>
                  <p className="text-2xl font-bold text-primary-900">100</p>
                </div>
              </div>
            </div>
            <div className="bg-secondary-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="bg-secondary-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-secondary-700" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-secondary-900">500+</p>
                </div>
              </div>
            </div>
            <div className="bg-success-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="bg-success-100 p-3 rounded-lg">
                  <Zap className="h-6 w-6 text-success-700" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Submissions</p>
                  <p className="text-2xl font-bold text-success-900">10k+</p>
                </div>
              </div>
            </div>
            <div className="bg-warning-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="bg-warning-100 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-warning-700" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Badges</p>
                  <p className="text-2xl font-bold text-warning-900">20+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Problems */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary-600 text-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Recent Problems
                    </h2>
                    <Link to="/problems" className="text-sm text-primary-100 hover:text-white flex items-center">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                <div>
                  {recentProblems.map((problem, index) => (
                    <Link 
                      key={problem.id}
                      to={`/problems/${problem.id}`}
                      className={`block px-6 py-4 hover:bg-gray-50 ${
                        index < recentProblems.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{problem.title}</h3>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              problem.difficulty === 'easy' ? 'bg-success-100 text-success-800' :
                              problem.difficulty === 'medium' ? 'bg-warning-100 text-warning-800' :
                              problem.difficulty === 'hard' ? 'bg-error-100 text-error-800' :
                              'bg-primary-100 text-primary-800'
                            }`}>
                              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                            </span>
                            <span className="text-gray-500 text-xs ml-2">
                              {problem.categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)).join(', ')}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recommended for Beginners */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary-600" />
                  Recommended for Beginners
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {easyChallenges.map((problem) => (
                    <Link 
                      key={problem.id}
                      to={`/problems/${problem.id}`}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-5">
                        <h3 className="font-medium text-gray-900 mb-2">{problem.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-100 text-success-800">
                            Easy
                          </span>
                          <span className="text-gray-500 text-sm">
                            <Star className="h-4 w-4 inline text-warning-500 mr-1" />
                            {Math.floor(Math.random() * 50) + 50}% success rate
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* User Profile Summary (if logged in) */}
              {isAuthenticated && user && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-primary-600 text-white px-6 py-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Trophy className="h-5 w-5 mr-2" />
                      Your Progress
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{user.username}</h3>
                        <p className="text-gray-500 text-sm capitalize">{user.role}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Problems Solved</span>
                        <span className="font-medium">{user.solvedProblems.length} / {problems.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary-600 h-2.5 rounded-full" 
                          style={{ width: `${(user.solvedProblems.length / problems.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Badges Earned</span>
                        <span className="font-medium">{user.badges.length} / {badges.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-accent-500 h-2.5 rounded-full" 
                          style={{ width: `${(user.badges.length / badges.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <Link to="/profile" className="w-full btn-outline flex items-center justify-center">
                      View Profile
                    </Link>
                  </div>
                </div>
              )}

              {/* Leaderboard */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-secondary-600 text-white px-6 py-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Top Coders
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { username: 'codemaster', solved: 89, rank: 1 },
                      { username: 'algopro', solved: 76, rank: 2 },
                      { username: 'owner', solved: 72, rank: 3 },
                      { username: 'devninja', solved: 68, rank: 4 },
                      { username: 'admin', solved: 65, rank: 5 }
                    ].map((coder, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-amber-600' :
                          'bg-primary-600'
                        }`}>
                          {coder.rank}
                        </div>
                        <div className="ml-3 flex-grow">
                          <div className="font-medium">{coder.username}</div>
                          <div className="text-gray-500 text-sm">{coder.solved} problems</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="#" className="mt-4 text-center block text-sm text-primary-600 hover:text-primary-800">
                    View Full Leaderboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badge Modal */}
      <BadgeModal />
    </div>
  );
};

export default HomePage;