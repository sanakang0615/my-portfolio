"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, X } from 'lucide-react';
import Header from '../../components/Header';

const CV = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        showSearch={showSearch} 
        setShowSearch={setShowSearch} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        {/* PDF Content - Now displayed directly on the page */}
        <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Curriculum Vitae</h3>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Last updated: 25.06.18</span>
            </div>
          </div>
          
          {/* PDF Content */}
          <div className="w-full h-[calc(100vh-200px)] overflow-hidden">
            <iframe
              src="/CV/CV_SanaKang_0830.pdf"
              className="w-full h-full border-0"
              title="CV PDF Viewer"
              allowFullScreen
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CV; 