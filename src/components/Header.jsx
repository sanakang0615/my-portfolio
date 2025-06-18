import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Github, 
  Linkedin, 
  Search,
  Moon,
  Sun,
} from 'lucide-react';

const Header = ({ darkMode, setDarkMode, setShowSearch }) => {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
      darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
    }`}>
      <div className="w-full px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-semibold tossface">⛰️ Sana Kang</h1>
            </div>
            
            <nav className="hidden md:flex space-x-6 ml-8">
              <Link 
                href="/" 
                className={`text-sm transition-colors ${
                  isActive('/') 
                    ? 'text-blue-500 font-medium' 
                    : 'hover:text-blue-400'
                }`}
              >
                Works
              </Link>
              <Link 
                href="/hobbies/drawings" 
                className={`text-sm transition-colors ${
                  isActive('/hobbies/drawings') 
                    ? 'text-blue-500 font-medium' 
                    : 'hover:text-blue-400'
                }`}
              >
                Hobbies
              </Link>
              <Link 
                href="/blog" 
                className={`text-sm transition-colors ${
                  isActive('/blog') 
                    ? 'text-blue-500 font-medium' 
                    : 'hover:text-blue-400'
                }`}
              >
                Blog
              </Link>
              <Link 
                href="/cv" 
                className={`text-sm transition-colors ${
                  isActive('/cv') 
                    ? 'text-blue-500 font-medium' 
                    : 'hover:text-blue-400'
                }`}
              >
                CV
              </Link>
              <Link 
                href="/aboutsite" 
                className={`text-sm transition-colors ${
                  isActive('/aboutsite') 
                    ? 'text-blue-500 font-medium' 
                    : 'hover:text-blue-400'
                }`}
              >
                What&apos;s This?
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 pr-1 md:pr-4 rounded-md transition-colors ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="hidden md:flex">
              <button
                onClick={() => setShowSearch(true)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors ${
                  darkMode 
                    ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' 
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <Search size={16} />
                <span className="text-sm">Search</span>
                <div className="hidden sm:flex items-center space-x-1">
                  <kbd className={`px-1 py-0.5 text-xs rounded ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>⌘</kbd>
                  <kbd className={`px-1 py-0.5 text-xs rounded ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>K</kbd>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 