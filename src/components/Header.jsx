import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Github, 
  Linkedin, 
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

  // Initialize dark mode from localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, [setDarkMode]);

  // Save dark mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
      darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
    }`}>
      <div className="w-full px-6 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 px-12">
            {/* Left side - Sana Kang name (hidden on About page) */}
            {pathname !== '/' && (
              <div className="flex items-center space-x-3 ml-12">
                <h1 className="text-xl font-semibold">Sana Kang</h1>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Navigation tabs - right aligned */}
            <nav className="hidden md:flex space-x-4">
              <Link 
                href="/" 
                className={`text-sm transition-colors ${
                  isActive('/') 
                    ? 'text-blue-500 font-medium' 
                    : 'hover:text-blue-400'
                }`}
              >
                About
              </Link>
              <Link 
                href="/research" 
                className={`text-sm transition-colors ${
                  isActive('/research') 
                    ? 'text-blue-500 font-medium' 
                    : 'hover:text-blue-400'
                }`}
              >
                Publications
              </Link>
              <Link 
                href="/projects" 
                className={`text-sm transition-colors ${
                  isActive('/projects') 
                    ? 'text-blue-500 font-medium' 
                    : 'hover:text-blue-400'
                }`}
              >
                Projects
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
                href="/cv" 
                className={`text-sm transition-colors ${
                  isActive('/cv') 
                    ? 'text-blue-500 font-medium' 
                    : 'hover:text-blue-400'
                }`}
              >
                CV
              </Link>
            </nav>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 pr-1 md:pr-4 rounded-md transition-colors ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 