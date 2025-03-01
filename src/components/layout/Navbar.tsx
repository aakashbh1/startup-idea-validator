import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Lightbulb, Moon, Sun, LogOut, HelpCircle, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Lightbulb className="h-8 w-8 text-teal-500 dark:text-teal-400" />
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
                IdeaEvaluator
              </span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/analyze" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  New Analysis
                </Link>
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <button
                      onClick={handleLogout}
                      className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 focus:outline-none"
                    >
                      <LogOut className="h-6 w-6" />
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="ml-3 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 focus:outline-none"
                    >
                      {theme === 'dark' ? (
                        <Sun className="h-6 w-6" />
                      ) : (
                        <Moon className="h-6 w-6" />
                      )}
                    </button>
                    <Link
                      to="/help"
                      className="ml-3 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 focus:outline-none"
                    >
                      <HelpCircle className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-3 px-3 py-2 rounded-md text-sm font-medium bg-teal-500 text-white hover:bg-teal-600"
                >
                  Register
                </Link>
                <button
                  onClick={toggleTheme}
                  className="ml-3 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 focus:outline-none"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-6 w-6" />
                  ) : (
                    <Moon className="h-6 w-6" />
                  )}
                </button>
                <Link
                  to="/help"
                  className="ml-3 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 focus:outline-none"
                >
                  <HelpCircle className="h-6 w-6" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;