import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  Edit, 
  Trash, 
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  XCircle,
  Shield
} from 'lucide-react';
import { User, UserRole } from '../../types/user';
import { useAuth } from '../../contexts/AuthContext';

// This is a mock component since we don't have a real backend
// In a real app, this would fetch users from an API
const UserManager: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | 'all'>('all');
  const [sortField, setSortField] = useState<'username' | 'role' | 'createdAt'>('username');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Mock users
  const [users] = useState<User[]>([
    {
      id: '1',
      username: 'admin',
      email: 'admin@codearena.com',
      role: 'admin',
      solvedProblems: ['1', '2', '3', '5'],
      badges: ['first-solve', 'streak-7', 'problem-creator'],
      createdAt: new Date('2023-01-01').toISOString(),
    },
    {
      id: '2',
      username: 'owner',
      email: 'owner@codearena.com',
      role: 'owner',
      solvedProblems: ['1', '2', '3', '4', '5'],
      badges: ['first-solve', 'streak-30', 'problem-creator', 'contest-winner'],
      createdAt: new Date('2023-01-01').toISOString(),
    },
    {
      id: '3',
      username: 'user1',
      email: 'user1@example.com',
      role: 'user',
      solvedProblems: ['1', '2'],
      badges: ['first-solve'],
      createdAt: new Date('2023-01-15').toISOString(),
    },
    {
      id: '4',
      username: 'coder42',
      email: 'coder42@example.com',
      role: 'user',
      solvedProblems: ['1', '2', '3', '4'],
      badges: ['first-solve', 'streak-7'],
      createdAt: new Date('2023-02-10').toISOString(),
    },
    {
      id: '5',
      username: 'dev_ninja',
      email: 'ninja@example.com',
      role: 'user',
      solvedProblems: ['1', '3', '5'],
      badges: ['first-solve'],
      createdAt: new Date('2023-03-05').toISOString(),
    },
    {
      id: '6',
      username: 'pythonista',
      email: 'python@example.com',
      role: 'user',
      solvedProblems: ['2', '4'],
      badges: [],
      createdAt: new Date('2023-03-20').toISOString(),
    },
    {
      id: '7',
      username: 'algorithm_master',
      email: 'algo@example.com',
      role: 'user',
      solvedProblems: ['1', '2', '3', '4', '5'],
      badges: ['first-solve', 'streak-7', 'contest-winner'],
      createdAt: new Date('2023-04-12').toISOString(),
    }
  ]);

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    
    setIsDeleting(true);
    // In a real app, this would call an API to delete the user
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteModal(false);
      // Mock deletion success message
      alert(`User ${userToDelete.username} would be deleted in a real app`);
    }, 1000);
  };

  const handleSort = (field: 'username' | 'role' | 'createdAt') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (sortField === 'username') {
        return sortDirection === 'asc' 
          ? a.username.localeCompare(b.username)
          : b.username.localeCompare(a.username);
      } else if (sortField === 'role') {
        return sortDirection === 'asc'
          ? a.role.localeCompare(b.role)
          : b.role.localeCompare(a.role);
      } else { // createdAt
        return sortDirection === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const isOwner = currentUser?.role === 'owner';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">
            Manage and oversee all users on the platform.
          </p>
        </div>
        <button 
          className="btn-primary flex items-center"
          onClick={() => alert('In a real app, this would open a form to add a new user')}
        >
          <UserPlus className="h-5 w-5 mr-2" />
          <span>Add User</span>
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-3xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="form-input pl-10 pr-4 py-2 w-full"
                placeholder="Search users by username or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Role Filter */}
            <div>
              <select
                className="form-input py-2"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole | 'all')}
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* User List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('username')}
                  >
                    Username
                    {sortField === 'username' && (
                      sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      )
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('role')}
                  >
                    Role
                    {sortField === 'role' && (
                      sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      )
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => handleSort('createdAt')}
                  >
                    Joined
                    {sortField === 'createdAt' && (
                      sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      )
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-700">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>
                          <div className="text-xs text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-primary-100 text-primary-800' :
                        user.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role === 'admin' || user.role === 'owner' ? (
                          <Shield className="h-3 w-3 mr-1" />
                        ) : null}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button 
                          className="text-primary-600 hover:text-primary-900"
                          onClick={() => alert(`In a real app, this would open a form to edit ${user.username}`)}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        {/* Only allow deleting if current user is owner or if the target is not an admin/owner */}
                        {(isOwner || (user.role !== 'admin' && user.role !== 'owner')) && (
                          <button 
                            className="text-error-600 hover:text-error-900"
                            onClick={() => handleDeleteClick(user)}
                            disabled={user.id === currentUser?.id}
                          >
                            <Trash className={`h-5 w-5 ${user.id === currentUser?.id ? 'opacity-50 cursor-not-allowed' : ''}`} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No users found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
            <div className="flex items-center text-error-600 mb-4">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Confirm User Deletion</h3>
            </div>
            <p className="mb-4">
              Are you sure you want to delete the user "{userToDelete.username}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="btn-outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                className="btn-error flex items-center"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;