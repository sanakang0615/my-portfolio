"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';
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
        <div className="text-center max-w-md">
          <h2 className="text-4xl font-bold mb-4 font-['Pretendard']">Curriculum Vitae</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 font-['Pretendard']">Download my CV for a complete overview of my academic background and experiences.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-8 font-['Pretendard']">Last updated: 25.06.18</p>
          <a 
            href="/CV/CV_Sana_Kang_0618.pdf" 
            download 
            className="inline-flex items-center bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-8 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 font-['Pretendard']"
          >
            <Download size={20} className="mr-3" />
            Download CV (PDF)
          </a>
        </div>
      </main>
    </div>
  );
};

export default CV; 