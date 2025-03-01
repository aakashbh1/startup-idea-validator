import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Lightbulb className="h-6 w-6 text-teal-500 dark:text-teal-400" />
            <span className="ml-2 text-lg font-semibold text-gray-800 dark:text-white">
              IdeaEvaluator
            </span>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://github.com/aakashbh1" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://x.com/imaakashbh" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/aakashbh1/" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/help" className="hover:text-teal-500 dark:hover:text-teal-400">
                Help
              </Link>
              <a href="#" className="hover:text-teal-500 dark:hover:text-teal-400">
                Privacy
              </a>
              <a href="#" className="hover:text-teal-500 dark:hover:text-teal-400">
                Terms
              </a>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} IdeaEvaluator. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;