"use client"
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import publicationsData from '../../data/publications.json';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FileText, Github } from 'lucide-react';

const Research = () => {
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

  if (!mounted) return null;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        showSearch={showSearch} 
        setShowSearch={setShowSearch} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 w-full pt-18">
          <section id="publications" className="mb-16">
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Publications</h2>
            {/* <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Information Systems | Causal Inference | NLP | Low-resource Language </p>
             */}
                        <div className="space-y-0">
            {(() => {
              // Group publications by year
              const groupedPublications = {};
              publicationsData.publications.forEach(pub => {
                const year = pub.year || '2025';
                if (!groupedPublications[year]) {
                  groupedPublications[year] = [];
                }
                groupedPublications[year].push(pub);
              });

              // Sort years in descending order
              const sortedYears = Object.keys(groupedPublications).sort((a, b) => parseInt(b) - parseInt(a));

              return sortedYears.map((year, yearIndex) => (
                <div key={year}>
                  {/* Year Header for Mobile */}
                  <div className="md:hidden mb-4">
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                      {year}
                    </h3>
                    <div className={`h-px mt-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  </div>
                  
                  {/* Publications for this year */}
                  {groupedPublications[year].map((pub, pubIndex) => (
                    <motion.div
                      key={`${year}-${pubIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: pubIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="flex flex-row gap-6 items-start py-6">
                        {/* Category Tag - 모바일에서 숨김 */}
                        <div className="hidden md:flex flex-shrink-0">
                          <span className={`px-3 py-0.5 mt-1 text-xs font-medium uppercase tracking-wide rounded-xs ${
                            darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                          }`}>
                            {pub.type === 'Conference' ? 'Conf' : 
                             pub.type === 'Book Chapter' ? 'Book' : 
                             pub.type === 'Survey Paper' ? 'Survey' : pub.type}
                          </span>
                        </div>

                        {/* Publication Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col">
                            {/* Title */}
                            <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                              {pub.title}
                            </h3>
                            
                            {/* Authors */}
                            <p className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-black'}`} 
                               dangerouslySetInnerHTML={{ __html: pub.authors }}>
                            </p>
                            
                            {/* Venue/Status */}
                            <p className={`text-sm mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} 
                               dangerouslySetInnerHTML={{ __html: pub.venue }}>
                            </p>
                            
                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3 mb-4">
                              {pub.links.paper && (
                                <a href={pub.links.paper} target="_blank" rel="noopener noreferrer" className={`px-3 py-1 text-xs border rounded transition-colors ${
                                  darkMode 
                                    ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
                                    : 'border-black bg-white text-black hover:bg-gray-50'
                                }`}>
                                  PDF
                                </a>
                              )}
                              {pub.links.code && (
                                <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className={`px-3 py-1 text-xs border rounded transition-colors ${
                                  darkMode 
                                    ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
                                    : 'border-black bg-white text-black hover:bg-gray-50'
                                }`}>
                                  Code
                                </a>
                              )}
                              {pub.links.ssrn && (
                                <a href={pub.links.ssrn} target="_blank" rel="noopener noreferrer" className={`px-3 py-1 text-xs border rounded transition-colors ${
                                  darkMode 
                                    ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
                                    : 'border-black bg-white text-black hover:bg-gray-50'
                                }`}>
                                  SSRN
                                </a>
                              )}
                              {pub.links.arxiv && (
                                <a href={pub.links.arxiv} target="_blank" rel="noopener noreferrer" className={`px-3 py-1 text-xs border rounded transition-colors ${
                                  darkMode 
                                    ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
                                    : 'border-black bg-white text-black hover:bg-gray-50'
                                }`}>
                                  arXiv
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Large Faint Year (Right Aligned) - Only show for first publication of each year on desktop */}
                        {pubIndex === 0 && (
                          <div className="hidden md:flex flex-shrink-0">
                            <span className={`text-6xl font-light ${darkMode ? 'text-gray-300 opacity-20' : 'text-gray-300 opacity-40'}`}>
                              {year}
                            </span>
                          </div>
                        )}
                      </div>


                    </motion.div>
                  ))}

                  {/* Separator Line between year groups - Desktop only */}
                  {yearIndex < sortedYears.length - 1 && (
                    <div className={`hidden md:block h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ));
            })()}
            </div>
          </section>
        </div>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Research;
