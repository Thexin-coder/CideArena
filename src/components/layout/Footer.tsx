import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Github as GitHub, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-accent-400" />
              <span className="text-lg font-bold">CodeArena</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              A competitive programming platform for coding enthusiasts.
              Practice, compete, and improve your skills.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/problems" className="text-gray-300 hover:text-white text-sm">
                  Problem Set
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Contests
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white text-sm">
                  <GitHub className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white text-sm">
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CodeArena. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;