import React from 'react';
import { Link } from 'react-router-dom';
import { useProblems } from '../../contexts/ProblemsContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  FileText, 
  Award, 
  Clock, 
  CheckCircle,
  Settings,
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';

const AdminDashboard: React.FC = () => {
  const { problems } = useProblems();
  const { user } = useAuth();
  
  const isOwner = user?.role === 'owner';
  
  // Problem stats
  const totalProblems = problems.length;
  const easyProblems = problems.filter(p => p.difficulty === 'easy').length;
  const mediumProblems = problems.filter(p => p.difficulty === 'medium').length;
  const hardProblems = problems.filter(p => p.difficulty === 'hard').length;
  const expertProblems = problems.filter(p => p.difficulty === 'expert').length;
  
  // Chart data
  const difficultyData = {
    labels: ['Easy', 'Medium', 'Hard', 'Expert'],
    datasets: [
      {
        data: [easyProblems, mediumProblems, hardProblems, expertProblems],
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
  
  const categoryData = {
    labels: ['Arrays', 'Strings', 'DP', 'Graphs', 'Trees', 'Math', 'Other'],
    datasets: [
      {
        data: [20, 15, 18, 12, 10, 15, 10],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.username}! Here's what's happening with your coding platform.
        </p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Problems</h2>
            <div className="p-2 bg-primary-100 rounded-full">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalProblems}</p>
          <p className="text-gray-500 mb-4">Total problems in the system</p>
          <Link 
            to="/admin/problems/new" 
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            <span>Add New Problem</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Users</h2>
            <div className="p-2 bg-secondary-100 rounded-full">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">500+</p>
          <p className="text-gray-500 mb-4">Registered users</p>
          <Link 
            to="/admin/users" 
            className="flex items-center text-secondary-600 hover:text-secondary-800"
          >
            <Users className="h-4 w-4 mr-1" />
            <span>Manage Users</span>
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Submissions</h2>
            <div className="p-2 bg-success-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">10k+</p>
          <p className="text-gray-500 mb-4">Total submissions</p>
          <Link 
            to="#" 
            className="flex items-center text-success-600 hover:text-success-800"
          >
            <Clock className="h-4 w-4 mr-1" />
            <span>View Recent Submissions</span>
          </Link>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Problem Difficulty Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={difficultyData} 
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
                cutout: '65%',
              }}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Problem Category Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut 
              data={categoryData} 
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
                cutout: '65%',
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { action: 'Added new problem', problem: 'Maximum Subarray Sum', time: '2 hours ago' },
            { action: 'Updated problem', problem: 'Binary Tree Traversal', time: '5 hours ago' },
            { action: 'Deleted problem', problem: 'Duplicate Test Case', time: '1 day ago' },
            { action: 'Added new problem', problem: 'Graph Coloring', time: '2 days ago' },
            { action: 'Updated site settings', problem: null, time: '3 days ago' },
          ].map((activity, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {activity.action.includes('Added') ? (
                    <div className="h-8 w-8 rounded-full bg-success-100 flex items-center justify-center">
                      <PlusCircle className="h-4 w-4 text-success-600" />
                    </div>
                  ) : activity.action.includes('Updated') ? (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-primary-600" />
                    </div>
                  ) : activity.action.includes('Deleted') ? (
                    <div className="h-8 w-8 rounded-full bg-error-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-error-600" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-secondary-100 flex items-center justify-center">
                      <Settings className="h-4 w-4 text-secondary-600" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}{activity.problem ? `: ${activity.problem}` : ''}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <Link to="#" className="text-sm text-primary-600 hover:text-primary-800 flex items-center justify-center">
            View All Activity <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
      
      {/* Admin Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Problem Management</h2>
          <div className="space-y-4">
            <Link 
              to="/admin/problems" 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-primary-600 mr-3" />
                <span>Manage Problems</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link 
              to="/admin/problems/new" 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <div className="flex items-center">
                <PlusCircle className="h-5 w-5 text-success-600 mr-3" />
                <span>Add New Problem</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Management</h2>
          <div className="space-y-4">
            <Link 
              to="/admin/users" 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 text-secondary-600 mr-3" />
                <span>Manage Users</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            {isOwner && (
              <Link 
                to="/admin/settings" 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-gray-600 mr-3" />
                  <span>Site Settings</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;