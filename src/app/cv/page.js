"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, X, Download } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CV = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Header 컴포넌트에서 테마 상태를 가져옴
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // Header의 테마 상태 변경을 감지
  useEffect(() => {
    const handleStorageChange = () => {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        setDarkMode(JSON.parse(savedMode));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        setShowSearch={setShowSearch}
      />
      
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 md:px-4">
        {/* CV Content */}
        <div className={`w-full max-w-7xl rounded-lg shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center gap-4">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Curriculum Vitae</h3>
              <span className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last updated: 25.08.30</span>
            </div>
          </div>
          
          {/* Desktop PDF Viewer */}
          <div className="hidden md:block w-full h-[calc(100vh-200px)] overflow-hidden">
            <iframe
              src="/CV/CV_SanaKang_0830.pdf"
              className="w-full h-full border-0"
              title="CV PDF Viewer"
              allowFullScreen
            />
          </div>

          {/* Mobile Download Section */}
          <div className="md:hidden p-8 text-center">
            
            
            <a
              href="/CV/CV_SanaKang_0830.pdf"
              download="CV_SanaKang.pdf"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-gray-200 shadow-gray-900/20 hover:shadow-gray-900/30' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700 shadow-gray-200/50 hover:shadow-gray-300/60'
              }`}
            >
              <Download size={20} />
              Download CV
            </a>
          </div>

          {/* Mobile Notice */}
          <div className="md:hidden p-4 border-t text-center">
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              PDF preview is only available on desktop
            </p>
          </div>
        </div>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default CV; 