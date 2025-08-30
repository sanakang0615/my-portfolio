"use client"
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/Header';
import projectsData from '../../data/projects.json';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { FileText, Github, ExternalLink, Award } from 'lucide-react';

const Projects = () => {
    
  const [activeFilter, setActiveFilter] = useState('All');
  const [openProjectIndex, setOpenProjectIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  // Dynamically generate filter tags from actual project data
  const filterTags = useMemo(() => {
    const allTags = new Set();
    projectsData.projects.forEach(project => {
      project.tags.forEach(tag => allTags.add(tag));
    });
    return ['All', ...Array.from(allTags).sort()];
  }, [projectsData.projects]);
  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);
  const filteredProjects = useMemo(() => {
    // First sort all projects by period in descending order (newest first)
    const sortedProjects = [...projectsData.projects].sort((a, b) => {
      const yearA = parseInt(a.period);
      const yearB = parseInt(b.period);
      return yearB - yearA; // Descending order (newest first)
    });
    
    // Then apply the filter
    return activeFilter === 'All' 
      ? sortedProjects 
      : sortedProjects.filter(project => project.tags.includes(activeFilter));
  }, [projectsData.projects, activeFilter]);

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
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl mx-auto px-6 w-full pt-18">
          {/* Projects Section */}
          <section id="projects" className="mb-16">
            <h2 className="text-3xl font-bold mb-2">Projects</h2>
            <p className="text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2">

            I have hands-on experience in web and mobile development, along with full-stack engineering. 
            My work spans AI/ML modeling, data analytics, and blockchain applications, and I have also led app design and project planning.
            </p>

            <p className="text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6">
                <strong>Tech Stack</strong>
            <li className="pl-1.5">
                Advanced: ReactJS, NextJS, Streamlit, Python, MongoDB, Express, FastAPI, HuggingFace, TensorFlow, PyTorch, Pandas, OpenAI
            </li>
            <li className="pl-1.5">
                Moderate: MySQL, C, Java, Android Studio, Hardhat, Alchemy, SpringBoot, Solidity
            </li>
            <li className="pl-1.5">
                Beginner: Scala, Flutter, AutoCAD, Dart
            </li>
            </p>

          {/* Filter Tags */}
          {/* <div className="hidden sm:flex flex-wrap gap-2 mb-8">
            {filterTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === tag
                    ? darkMode 
                      ? 'bg-blue-900 text-blue-200 border border-blue-700'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div> */}

          {/* Projects List */}
          <div className="space-y-0">
            {(() => {
              // Group projects by year
              const groupedProjects = {};
              filteredProjects.forEach(project => {
                const year = project.period || '2025';
                if (!groupedProjects[year]) {
                  groupedProjects[year] = [];
                }
                groupedProjects[year].push(project);
              });

              // Sort years in descending order
              const sortedYears = Object.keys(groupedProjects).sort((a, b) => parseInt(b) - parseInt(a));

              return sortedYears.map((year, yearIndex) => (
                <div key={year}>
                  {/* Year Header for Mobile */}
                  <div className="md:hidden mb-4">
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                      {year}
                    </h3>
                    <div className={`h-px mt-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  </div>
                  
                  {/* Projects for this year */}
                  {groupedProjects[year].map((project, projectIndex) => {
                    const globalIndex = filteredProjects.findIndex(p => p.title === project.title);
                    const isOpen = openProjectIndex === globalIndex;
                    
                    return (
                      <motion.div
                        key={`${year}-${projectIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: projectIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="relative"
                      >
                        <div className="flex flex-row gap-6 items-start py-6">
                          {/* Category Tag - 모바일에서 숨김 */}
                          <div className="hidden md:flex flex-shrink-0">
                            <span className={`px-3 py-0.5 text-xs font-medium uppercase tracking-wide rounded-xs ${
                              darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                            }`}>
                              {project.type}
                            </span>
                          </div>

                          {/* Project Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col">
                              {/* Title */}
                              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                                <button
                                  className="text-left focus:outline-none"
                                  onClick={() => setOpenProjectIndex(isOpen ? null : globalIndex)}
                                  aria-expanded={isOpen}
                                >
                                  <div className="flex items-center gap-2">
                                    <span dangerouslySetInnerHTML={{ __html: project.title }} />
                                    <ChevronDown
                                      size={16}
                                      className={`transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
                                    />
                                  </div>
                                </button>
                              </h3>
                              
                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-3">
                                {project.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className={`px-2 py-0.5 text-xs rounded-md ${
                                      darkMode ? 'bg-gray-700/50 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-600 border border-gray-200'
                                    }`}
                                  >
                                    #{tag.toLowerCase().replace(/\s+/g, '-')}
                                  </span>
                                ))}
                              </div>

                              {/* Stack */}
                              {project.stack && project.stack.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {project.stack.map((stackItem, stackIdx) => (
                                    <span
                                      key={stackIdx}
                                      className={`px-2 py-0.5 text-xs rounded-md font-semibold border ${
                                        darkMode ? 'bg-blue-900/10 text-blue-200 border-blue-900/20' : 'bg-blue-50 text-blue-400 border-blue-100'
                                      }`}
                                    >
                                      {stackItem}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Expanded Content */}
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pt-4">
                                      {/* Project Images */}
                                      {project.images && project.images.length > 0 && (
                                        <div className="mb-6 flex justify-center">
                                          {project.images.length === 1 ? (
                                            // Single image: fixed height, auto width to maintain aspect ratio
                                            <div className={`inline-block rounded-lg overflow-hidden border-2 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                                              <img
                                                src={project.images[0]}
                                                alt={`${project.title} - Image`}
                                                className="h-64 w-auto block"
                                              />
                                            </div>
                                          ) : (
                                            // Multiple images: grid layout
                                            <div className="flex gap-4">
                                              {project.images.map((image, idx) => (
                                                <div key={idx} className={`w-64 h-64 rounded-lg overflow-hidden border-2 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                                                  <img
                                                    src={image}
                                                    alt={`${project.title} - Image ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                  />
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      {/* Project Description */}
                                      <div className="prose dark:prose-invert mb-4">
                                        <ReactMarkdown
                                          components={{
                                            p: ({node, ...props}) => <p className="!text-xs !leading-tight !mb-1" {...props} />,
                                            strong: ({node, ...props}) => <strong className="!text-xs" {...props} />,
                                            em: ({node, ...props}) => <em className="!text-xs" {...props} />,
                                            h1: ({node, ...props}) => <h1 className="!text-lg !font-bold !mt-4 !mb-2" {...props} />,
                                            h2: ({node, ...props}) => <h2 className="!text-base !font-bold !mt-3 !mb-2" {...props} />,
                                            h3: ({node, ...props}) => <h3 className="!text-sm !font-semibold !mt-2 !mb-1" {...props} />,
                                            h4: ({node, ...props}) => <h4 className="!text-xs !font-semibold !mt-2 !mb-1" {...props} />,
                                            h5: ({node, ...props}) => <h5 className="!text-xs !font-semibold !mt-1 !mb-1" {...props} />,
                                            h6: ({node, ...props}) => <h6 className="!text-xs !font-semibold !mt-1 !mb-1" {...props} />,
                                            li: ({node, ...props}) => <li className="!text-xs !my-0" {...props} />,
                                            ul: ({node, ...props}) => <ul className="!list-disc !pl-3 !my-1" {...props} />,
                                            ol: ({node, ...props}) => <ol className="!text-xs !list-decimal !pl-3 !my-1" {...props} />,
                                            a: ({node, ...props}) => <a className="!text-xs" {...props} />,
                                            blockquote: ({node, ...props}) => <blockquote className="!text-xs !my-1" {...props} />,
                                            code: ({node, ...props}) => <code className="!text-xs" {...props} />,
                                            pre: ({node, ...props}) => <pre className="!text-xs !my-1" {...props} />,
                                          }}
                                        >
                                          {project.description}
                                        </ReactMarkdown>
                                      </div>
                                      
                                      {/* Project Links */}
                                      <div className="flex items-center gap-4">
                                        {project.links.github && (
                                          <a 
                                            href={project.links.github} 
                                            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                                          >
                                            <Github size={16} />
                                            Code
                                          </a>
                                        )}
                                        {project.links.paper && (
                                          <a 
                                            href={project.links.paper} 
                                            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                                          >
                                            <FileText size={16} />
                                            Paper
                                          </a>
                                        )}
                                        {project.links.demo && (
                                          <a 
                                            href={project.links.demo} 
                                            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                                          >
                                            <ExternalLink size={16} />
                                            Demo
                                          </a>
                                        )}
                                        {project.links.play && (
                                          <a 
                                            href={project.links.play} 
                                            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                                          >
                                            <ExternalLink size={16} />
                                            Play
                                          </a>
                                        )}
                                        {project.links.patent && (
                                          <a 
                                            href={project.links.patent} 
                                            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                                          >
                                            <Award size={16} />
                                            Patent
                                          </a>
                                        )}
                                        {project.links.report && (
                                          <a 
                                            href={project.links.report} 
                                            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors"
                                          >
                                            <FileText size={16} />
                                            Report
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                                                  {/* Large Faint Year (Right Aligned) - Only show for first project of each year on desktop */}
                        {projectIndex === 0 && (
                          <div className="hidden md:flex flex-shrink-0">
                            <span className={`text-6xl font-light ${darkMode ? 'text-gray-300 opacity-20' : 'text-gray-300 opacity-40'}`}>
                              {year}
                            </span>
                          </div>
                        )}
                        </div>

                        {/* Separator Line between year groups - Desktop only */}
                        {yearIndex < sortedYears.length - 1 && projectIndex === groupedProjects[year].length - 1 && (
                          <div className={`hidden md:block h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ));
            })()}
          </div>
        </section>
        </div>
      </main>
    </div>
  );
};

export default Projects;
