"use client"
import React, { useState } from 'react';
import SidebarLayout from './SidebarLayout';
import Link from 'next/link';
import { Github, Linkedin, Search, Sun, Moon } from 'lucide-react';
import Header from './Header';

const AppLayout = ({ navItems, sidebarTitle = "NAVIGATION", children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
          </div>
        </div>
      )}
      {/* Sidebar + Main Content */}
      <SidebarLayout navItems={navItems} sidebarTitle={sidebarTitle} darkMode={darkMode}>
        {children}
      </SidebarLayout>
    </div>
  );
};

export default AppLayout; 