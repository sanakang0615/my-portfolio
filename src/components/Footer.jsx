"use client"
import React from 'react';

const Footer = ({ darkMode = false }) => {
  return (
    <footer className={`border-t py-2 ${
      darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
    }`}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          © 2025 Sana Kang. The website was designed by Sana Kang and built with React.js. Design inspiration from <a href="https://github.com/alshedivat/al-folio" target="_blank" rel="noopener noreferrer" className="hover:underline">al-folio</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


