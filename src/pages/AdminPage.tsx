import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  FileText, 
  Settings, 
  Home,
  ChevronRight,
  ChevronLeft,
  PlusCircle
} from 'lucide-react';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProblemManager from '../components/admin/ProblemManager';
import ProblemEditor from '../components/admin/ProblemEditor';
import UserManager from '../components/admin/UserManager';
import SiteSettings from '../components/admin/SiteSettings';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
    return null;
  }

  const isOwner = user.role === 'owner';

  const getCurrentPath = () => {
    return location.pathname.split('/').slice(2).join('/') || 'dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-primary-800 min-h-screen transition-all duration-300 flex-shrink-0 relative`}>
          <div className="py-6 flex flex-col h-full">
            <div className="px-4 flex items-center justify-between mb-6">
              <div className={`text-white font-bold text-xl ${!sidebarOpen && 'hidden'}`}>
                Admin Panel
              </div>
              <button 
                className="text-white p-2 rounded-md hover:bg-primary-700 transition-colors"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>
            </div>
            
            <nav className="flex-1 px-2 space-y-1">
              <Link
                to="/admin"
                className={`group flex items-center py-2 px-2 rounded-md ${
                  getCurrentPath() === 'dashboard' 
                    ? 'bg-primary-700 text-white' 
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                }`}
              >
                <Home className="h-6 w-6 mr-3" />
                <span className={!sidebarOpen ? 'hidden' : ''}>Dashboard</span>
              </Link>
              
              <Link
                to="/admin/problems"
                className={`group flex items-center py-2 px-2 rounded-md ${
                  getCurrentPath().startsWith('problems') 
                    ? 'bg-primary-700 text-white' 
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                }`}
              >
                <FileText className="h-6 w-6 mr-3" />
                <span className={!sidebarOpen ? 'hidden' : ''}>Problems</span>
              </Link>
              
              <Link
                to="/admin/users"
                className={`group flex items-center py-2 px-2 rounded-md ${
                  getCurrentPath() === 'users' 
                    ? 'bg-primary-700 text-white' 
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                }`}
              >
                <Users className="h-6 w-6 mr-3" />
                <span className={!sidebarOpen ? 'hidden' : ''}>Users</span>
              </Link>
              
              {isOwner && (
                <Link
                  to="/admin/settings"
                  className={`group flex items-center py-2 px-2 rounded-md ${
                    getCurrentPath() === 'settings' 
                      ? 'bg-primary-700 text-white' 
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                  }`}
                >
                  <Settings className="h-6 w-6 mr-3" />
                  <span className={!sidebarOpen ? 'hidden' : ''}>Settings</span>
                </Link>
              )}
            </nav>
            
            <div className="px-4 py-4">
              <Link
                to="/"
                className="flex items-center text-primary-100 hover:text-white"
              >
                <Home className="h-5 w-5 mr-3" />
                <span className={!sidebarOpen ? 'hidden' : ''}>Back to Site</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="py-6 px-8">
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="problems" element={<ProblemManager />} />
              <Route path="problems/new" element={<ProblemEditor />} />
              <Route path="problems/:id" element={<ProblemEditor />} />
              <Route path="users" element={<UserManager />} />
              <Route path="settings" element={<SiteSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;