"use client"
import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Search, Sun, Moon } from 'lucide-react';

const Header = ({ darkMode, setDarkMode, showSearch, setShowSearch, searchQuery, setSearchQuery }) => (
  <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 font-['Pretendard'] ${
    darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
  }`}>
    <div className="w-full px-6 py-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold font-['Pretendard']">SK</span>
            </div>
            <h1 className="text-xl font-semibold font-['Pretendard']">Sana Kang</h1>
          </div>
          <nav className="hidden md:flex space-x-6 ml-8">
            <Link href="/" className="text-sm hover:text-blue-400 transition-colors font-['Pretendard']">Works</Link>
            <Link href="/hobbies/drawings" className="text-sm hover:text-blue-400 transition-colors font-['Pretendard']">I Draw</Link>
            <Link href="/blog" className="text-sm hover:text-blue-400 transition-colors font-['Pretendard']">Blog</Link>
            <Link href="/cv" className="text-sm hover:text-blue-400 transition-colors font-['Pretendard']">CV</Link>
            <Link href="/aboutsite" className="text-sm hover:text-blue-400 transition-colors font-['Pretendard']">What&apos;s This?</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Linkedin size={20} href="https://www.linkedin.com/in/sana-kang-20a94528a/" />
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
              onClick={() => setShowSearch(!showSearch)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors font-['Pretendard'] ${
                darkMode 
                  ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <Search size={16} />
              <span className="text-sm">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
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
              className={`flex-1 bg-transparent text-lg outline-none font-['Pretendard'] ${darkMode ? 'placeholder-gray-400' : 'placeholder-gray-500'}`}
              autoFocus
            />
          </div>
          <div className="px-4 pb-4 text-gray-400 text-sm font-['Pretendard']">(Search functionality coming soon)</div>
        </div>
      </div>
    )}
  </header>
);

export default Header; 