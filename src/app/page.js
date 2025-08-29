"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import publicationsData from '../data/publications.json';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink, 
  FileText,
  Award,
  Calendar,
  Users,
  Code,
  BookOpen,
  GraduationCap,
  Building,
  Star,
  Download,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Coffee,
  Gamepad2,
  Music,
  Palette,
  MessageCircle,
  ArrowUp,
  FlaskConical
} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogleScholar } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import SidebarLayout from './SidebarLayout';
import Header from '../components/Header';
import newsItems from '../data/newsItems';
import projectsData from '../data/projects.json';
import CollaborationRatioBar from '../components/CollaborationRatioBar';
import ReactMarkdown from 'react-markdown';
import researchExperience from '../data/research_experience.json';

// Search functionality - moved outside component to prevent recreation on every render
const createSearchableContent = (publicationsData, projectsData, researchExperience, blogPosts, newsItems) => [
  ...publicationsData.publications.map(pub => ({ ...pub, type: 'publication' })),
  ...projectsData.projects.map(proj => ({ ...proj, type: 'project' })),
  ...researchExperience.map(research => ({ ...research, type: 'research' })),
  ...blogPosts.map(post => ({ ...post, type: 'blog' })),
  ...newsItems.map(news => ({ ...news, type: 'news' }))
];

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openProjectIndex, setOpenProjectIndex] = useState(null);

  const navigationItems = [
    { id: 'about', label: 'Work', icon: Users },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'publications', label: 'Research Publications', icon: FileText },
    { id: 'research', label: 'Research Experience', icon: FlaskConical },
    { id: 'blog', label: 'Blog', icon: MessageCircle },
    { id: 'drawings', label: 'Drawings', icon: Palette },
    { id: 'cv', label: 'CV', icon: Download }
  ];

  const recentSearches = [
    'machine learning projects',
    'CMU research',
    'blockchain development',
    'personal interests'
  ];

  const blogPosts = [
    {
      date: '2025-01-15',
      title: 'Thoughts on AI Research Ethics',
      category: 'Research Notes',
      excerpt: 'Reflecting on the ethical implications of AI research and how we can build more responsible systems...',
      tags: ['AI', 'Ethics', 'Research'],
      readTime: '5 min read'
    },
    {
      date: '2025-01-10',
      title: 'My Gaming Setup for Research Breaks',
      category: 'Personal',
      excerpt: 'How I balance intense research with gaming sessions. Currently obsessed with puzzle games that help with logical thinking...',
      tags: ['Gaming', 'Works-Life Balance', 'Personal'],
      readTime: '3 min read'
    },
    {
      date: '2025-01-05',
      title: 'From Seoul to Pittsburgh: Cultural Observations',
      category: 'Travel',
      excerpt: 'Interesting cultural differences I\'ve noticed while doing research at CMU. Food, Works culture, and academic life...',
      tags: ['Culture', 'Travel', 'Academia'],
      readTime: '7 min read'
    },
    {
      date: '2024-12-20',
      title: 'Building DEATH&apos;s WORD CHAIN: A Developer&apos;s Journey',
      category: 'Development',
      excerpt: 'The story behind my vocabulary game project. How procrastinating GRE prep led to an unexpected coding adventure...',
      tags: ['Game Development', 'JavaScript', 'Personal Project'],
      readTime: '8 min read'
    },
    {
      date: '2024-12-15',
      title: 'Music & Code: My Creative Process',
      category: 'Creative',
      excerpt: 'How I use music to enhance my coding sessions and research thinking. Plus, my latest digital art experiments...',
      tags: ['Music', 'Art', 'Creativity', 'Productivity'],
      readTime: '4 min read'
    }
  ];




  // Search functionality
  const searchableContent = useMemo(() => createSearchableContent(publicationsData, projectsData, researchExperience, blogPosts, newsItems), [publicationsData, projectsData, researchExperience, blogPosts, newsItems]);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = searchableContent.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);



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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'news', 'majors', 'projects', 'publications', 'research', 'blog', 'cv'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aboutNavItems = [
    { id: 'top', label: 'Introduction', icon: Users },
    { id: 'news', label: 'News', icon: MessageCircle },
    { id: 'majors', label: 'Education', icon: GraduationCap },
    { id: 'publications', label: 'Publications', icon: FileText },
    { id: 'research', label: 'Research Experience', icon: FlaskConical },
    { id: 'projects', label: 'Projects', icon: Code },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} setShowSearch={setShowSearch} />

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-2xl rounded-lg shadow-2xl border ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Search size={20} className="text-blue-500" />
                  <input
                    type="text"
                    placeholder="Search projects, publications, blog posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`flex-1 bg-transparent text-lg outline-none ${
                      darkMode ? 'placeholder-gray-400' : 'placeholder-gray-500'
                    }`}
                    autoFocus
                  />
                </div>
                
                {searchQuery === '' && (
                  <div>
                    <p className="text-sm text-gray-500 mb-3">Recent searches</p>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchQuery(search)}
                          className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.length > 0 && (
                  <div className="space-y-2">
                    {searchResults.slice(0, 8).map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-md cursor-pointer transition-colors ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{result.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            result.type === 'publication' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' :
                            result.type === 'project' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                            result.type === 'research' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' :
                            result.type === 'blog' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200' :
                            'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {result.description || result.excerpt}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {searchQuery && searchResults.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No results found</p>
                  </div>
                )}
              </div>
              
              <div className={`px-4 py-3 border-t text-xs text-gray-500 ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <kbd className={`px-1 py-0.5 rounded ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {typeof window !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? '⌘' : 'Ctrl'}
                      </kbd>
                      <kbd className={`px-1 py-0.5 rounded ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>K</kbd>
                      <span>to search</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ArrowUp size={12} />
                      <span>to select</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>↑↓</span>
                      <span>to navigate</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>esc</span>
                      <span>to close</span>
                    </span>
                  </div>
                  <span className="text-blue-500">Search by Sana</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl mx-auto px-6 w-full pt-6">
          {/* Main Content (About, News, Projects, Publications 섹션만) */}
          {/* About Section */}
          <section id="top" className="mb-16">
            <h2 className="text-4xl font-semibold mb-4 mt-2 text-center md:text-left"> Sana Kang </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Info + 소개문단 - 왼쪽으로 이동 */}
              <div className="flex-1 flex flex-col justify-center h-full min-w-0">
              <div className="prose max-w-3xl text-center md:text-left" style={{ color: darkMode ? '#cbd5e1' : '#374151' }}>
    
    <p className="text-md leading-normal mb-4">
      I am a second-year Master’s student in Management Engineering at <a className="text-blue-700" href="https://www.kaist.ac.kr/en" target="_blank" rel="noopener noreferrer"> KAIST </a> in Professor Sunghyuk Park’s Lab, concentrating in Information Systems. My research spans two main areas: <strong>(1) causal inference and economics</strong> and <strong>(2) natural language processing</strong> with a particular focus on low-resource languages.
      I completed my undergraduate studies at <a className="text-blue-700" href="https://www.kaist.ac.kr/en" target="_blank" rel="noopener noreferrer"> KAIST </a>, where I double-majored in Computer Science and Business Technology Management. During that time, I actively participated in projects related to data analytics, web development, and blockchain applications.
    </p>

    <p className="text-md leading-normal mb-4">
      In Spring and Summer 2025, I joined the School of Computer Science at <a className="text-blue-700" href="https://www.cmu.edu/" target="_blank" rel="noopener noreferrer"> Carnegie Mellon University </a>  as a Visiting Scholar in the S3D (Science, Software, and Societal Systems) program, where I had the opportunity to further expand my research experience and international collaborations.
    </p>

    <p className="text-md leading-normal mb-4">
      I will be applying to PhD programs in the U.S. this fall, with plans to begin my studies in 2026.
    </p>

  {/* Social Links */}
  <div className="flex items-center space-x-6 mt-6">
    <a 
      href="https://github.com/sanakang0615" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      <Github size={24} />
    </a>
    
    <a 
      href="https://www.linkedin.com/in/sana-kang-20a94528a" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      <Linkedin size={24} />
    </a>
    
    <a 
      href="https://scholar.google.com/citations?user=YOUR_GOOGLE_SCHOLAR_ID" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      <FontAwesomeIcon icon={faGoogleScholar} size="lg" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" />
    </a>
    
    <a 
      href="https://x.com/sanakang0615" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>
  </div>

  </div>

              </div>
              {/* Profile Image - 오른쪽으로 이동 */}
              <div className="flex-shrink-0">
                <div className={`w-40 mt-0 rounded-lg overflow-hidden border-2 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex items-center justify-center`}>
                  <Image
                    src="/my_photo/my_photo.png"
                    alt="Profile Photo"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* News Section */}
          <section id="news" className="mb-16">
            <h2 className="text-2xl font-bold mb-4">Latest News</h2>
            <div className="space-y-1">
              {newsItems.map((news, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3 py-1"
                >
                  <span className="tossface text-lg flex-shrink-0">{news.icon.props.children}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm font-bold ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {news.date}
                      </span>
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {news.title}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Majors Section */}

        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t py-2 ${
        darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            © 2025 Sana Kang. The website was designed by Sana Kang and built with React.js. Design inspiration from <a href="https://github.com/alshedivat/al-folio" target="_blank" rel="noopener noreferrer">al-folio</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;