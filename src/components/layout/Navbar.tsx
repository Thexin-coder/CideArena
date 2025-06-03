import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Code, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Award,
  BarChart2
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
    navigate('/');
  };

  return (
    <nav className="bg-primary-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenus}>
              <Code className="h-8 w-8 text-accent-400" />
              <span className="text-xl font-bold">代码竞技场</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? 'nav-link nav-link-active' : 'nav-link nav-link-inactive'
                  }
                  end
                >
                  首页
                </NavLink>
                <NavLink 
                  to="/problems" 
                  className={({ isActive }) => 
                    isActive ? 'nav-link nav-link-active' : 'nav-link nav-link-inactive'
                  }
                >
                  题库
                </NavLink>
                {(user?.role === 'admin' || user?.role === 'owner') && (
                  <NavLink 
                    to="/admin" 
                    className={({ isActive }) => 
                      isActive ? 'nav-link nav-link-active' : 'nav-link nav-link-inactive'
                    }
                  >
                    管理后台
                  </NavLink>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-white focus:outline-none"
                    onClick={toggleProfileMenu}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {user?.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>{user?.username}</span>
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenus}
                      >
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>个人中心</span>
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center space-x-2">
                          <LogOut className="h-4 w-4" />
                          <span>退出登录</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-x-2">
                  <Link to="/login" className="btn-outline text-white">登录</Link>
                  <Link to="/register" className="btn-accent">注册</Link>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={toggleMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-800 pt-2 pb-4 px-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-white">菜单</span>
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={toggleMenu}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-3 space-y-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? 'block nav-link nav-link-active' 
                  : 'block nav-link nav-link-inactive'
              }
              onClick={closeMenus}
              end
            >
              首页
            </NavLink>
            <NavLink 
              to="/problems" 
              className={({ isActive }) => 
                isActive 
                  ? 'block nav-link nav-link-active' 
                  : 'block nav-link nav-link-inactive'
              }
              onClick={closeMenus}
            >
              题库
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    isActive 
                      ? 'block nav-link nav-link-active' 
                      : 'block nav-link nav-link-inactive'
                  }
                  onClick={closeMenus}
                >
                  个人中心
                </NavLink>
                {(user?.role === 'admin' || user?.role === 'owner') && (
                  <NavLink 
                    to="/admin" 
                    className={({ isActive }) => 
                      isActive 
                        ? 'block nav-link nav-link-active' 
                        : 'block nav-link nav-link-inactive'
                    }
                    onClick={closeMenus}
                  >
                    管理后台
                  </NavLink>
                )}
                <button 
                  className="w-full text-left block nav-link nav-link-inactive"
                  onClick={handleLogout}
                >
                  退出登录
                </button>
              </>
            ) : (
              <div className="pt-4 flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="btn-outline w-full text-center"
                  onClick={closeMenus}
                >
                  登录
                </Link>
                <Link 
                  to="/register" 
                  className="btn-accent w-full text-center"
                  onClick={closeMenus}
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;