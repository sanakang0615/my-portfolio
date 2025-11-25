import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Github, 
  Linkedin, 
  Moon,
  Sun,
  Menu,
  X,
} from 'lucide-react';

const Header = ({ darkMode, setDarkMode, setShowSearch }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navigationItems = [
    { href: '/', label: 'About' },
    { href: '/research', label: 'Publications' },
    { href: '/projects', label: 'Projects' },
    { href: '/hobbies/drawings', label: 'I Draw' },
    { href: '/cv', label: 'CV' },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
      darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
    }`}>
      <div className="w-full px-3 md:px-6 py-2">
        <div className="flex items-center">
          {/* Left side - Sana Kang name (hidden on About page and mobile) */}
          <div className="hidden md:flex items-center flex-1">
            {pathname !== '/' && (
              <Link href="/" className="flex items-center">
                <h1 className="text-lg md:text-xl font-semibold">Sana Kang</h1>
              </Link>
            )}
          </div>

          {/* Desktop Navigation - Right aligned */}
          <nav className="hidden lg:flex space-x-4 mr-4">
            {navigationItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`text-sm transition-colors ${
                  isActive(item.href) 
                    ? 'text-blue-500 font-medium' 
                    : 'hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation - Right aligned */}
          <nav className="lg:hidden flex space-x-2 mr-4">
            {navigationItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  isActive(item.href) 
                    ? 'text-blue-500 font-medium bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-1.5 md:p-2 rounded-md transition-colors ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
          >
            {darkMode ? <Sun size={18} className="md:w-5 md:h-5" /> : <Moon size={18} className="md:w-5 md:h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 