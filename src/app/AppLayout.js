"use client"
import React, { useState, useEffect } from 'react';
import SidebarLayout from './SidebarLayout';
import Link from 'next/link';
import { Github, Linkedin, Search, Sun, Moon } from 'lucide-react';
import Header from '../components/Header';

const AppLayout = ({ navItems, sidebarTitle = "NAVIGATION", children }) => {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }
  }, [darkMode, mounted]);

  // Keyboard shortcut for search (Cmd+K on Mac, Ctrl+K on Windows/Linux)
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Cmd (Mac) or Ctrl (Windows/Linux) + K is pressed
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault(); // Prevent default browser behavior
        setShowSearch(true);
      }
      
      // Close search with Escape key
      if (event.key === 'Escape' && showSearch) {
        setShowSearch(false);
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSearch]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {/* Search Modal (간단 버전) */}
      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40" onClick={() => setShowSearch(false)}>
          <div className={`w-full max-w-2xl rounded-lg shadow-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} onClick={e => e.stopPropagation()}>
            <div className="p-4 flex items-center space-x-3 mb-4">
              <Search size={20} className="text-blue-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`flex-1 bg-transparent text-lg outline-none ${darkMode ? 'placeholder-gray-400' : 'placeholder-gray-500'}`}
                autoFocus
              />
            </div>
            <div className="px-4 pb-4 text-gray-400 text-sm">(Search functionality coming soon)</div>
            <div className={`px-4 py-3 border-t text-xs text-gray-500 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <kbd className={`px-1 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                      {typeof window !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? '⌘' : 'Ctrl'}
                    </kbd>
                    <kbd className={`px-1 py-0.5 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>K</kbd>
                    <span>to search</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>esc</span>
                    <span>to close</span>
                  </span>
                </div>
                <span className="text-blue-500">Search by Sana</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Sidebar + Main Content */}
      <SidebarLayout navItems={navItems} sidebarTitle={sidebarTitle} darkMode={darkMode}>
        {typeof children === 'function' ? children({ darkMode }) : children}
      </SidebarLayout>
    </div>
  );
};

export default AppLayout; 