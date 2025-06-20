"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
import Link from 'next/link';
import SidebarLayout from './SidebarLayout';
import Header from '../components/Header';
import newsItems from '../data/newsItems';
import projectsData from '../data/projects.json';
import publicationsData from '../data/publications.json';
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
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSection, setActiveSection] = useState('about');
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openProjectIndex, setOpenProjectIndex] = useState(null);

  const navigationItems = [
    { id: 'about', label: 'Works', icon: Users },
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

  const filterTags = ['All', 'System Building', 'Deep Learning', 'Data Analysis', 'AI/ML', 'Others'];

  const filteredProjects = activeFilter === 'All' 
    ? projectsData.projects 
    : projectsData.projects.filter(project => project.tags.includes(activeFilter));

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

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
      const sections = ['about', 'majors', 'projects', 'publications', 'research', 'blog', 'cv'];
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

      <SidebarLayout navItems={aboutNavItems} sidebarTitle="Works" darkMode={darkMode} newsItems={newsItems} activeSection={activeSection}>
        {/* Main Content (About, News, Projects, Publications 섹션만) */}
        {/* About Section */}
        <section id="top" className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Hello, I&apos;m Sana!</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className={`w-55 mt-0 rounded-lg overflow-hidden border-4 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex items-center justify-center`}>
                <Image
                  src="/my_photo.png"
                  alt="Profile Photo"
                  width={220}
                  height={220}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Info + 소개문단 */}
            <div className="flex-1 flex flex-col justify-center h-full min-w-0">
            <div className="prose max-w-none text-center md:text-left" style={{ color: darkMode ? '#cbd5e1' : '#374151' }}>
  <p className="text-lg leading-relaxed mb-4">
    I am a second-year Master&apos;s student in Management Engineering at{' '}
    <span className="tossface mr-1">🇰🇷</span>
    <a className="text-blue-600 font-semibold" href="https://www.kaist.ac.kr/en" target="_blank" rel="noopener noreferrer">
      KAIST
    </a>, specializing in Information Systems. 
    I am currently a Short-term Scholar at{' '}
    <span className="tossface mr-1">🇺🇸</span>
    <a className="text-red-400 font-semibold" href="https://www.cmu.edu/" target="_blank" rel="noopener noreferrer">
      Carnegie Mellon University
    </a> (until July 2025).
    I work at the intersection of AI/ML, marketing, and information systems, bridging real-world problems with academic research. 
  </p>


  <p className="text-lg leading-relaxed mb-4">
  Outside of research, I have a few hobbies.  
  Feel free to check them out in the <a href="/hobbies/drawings" className="text-gray-600 font-semibold">Hobbies</a> tab above.  
  I enjoy <span className="tossface mr-1">🎨</span>drawing inspired by music,  
  and also work on small side projects, like <span className="tossface mr-1">🎮</span> 
  <a 
    className="text-gray-600 font-semibold" 
    href="https://wordchain.sanakang.xyz" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    a vocabulary game
  </a> I built during GRE prep.
</p>

</div>

            </div>
          </div>
        </section>

        {/* Majors Section */}
        <section id="majors" className="mb-16">
          <div className="mb-8">  
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            {/* <p className="text-gray-600 dark:text-gray-400 mb-6">
              A selection of previous projects that I have either led or co-led, for research, courseWorks, and of course, for fun!
            </p> */}
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
            
            <div className="space-y-4">
              {/* Graduate - KAIST Business School */}
              <div className="relative pl-16">
                <div className={`absolute left-6 top-4 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ring-4 shadow-lg 
                  ${darkMode ? 'ring-gray-900' : 'ring-gray-100'}`}></div>
                <div className={`group hover:scale-[1.02] transition-all duration-300 cursor-default
                  ${darkMode 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50' 
                    : 'bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50'}
                  rounded-xl p-3 shadow-md font-pretendard`}>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl tossface">🎓</span>
                      <span className="px-2 pt-1 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full font-pretendard">
                        Graduate
                      </span>
                    </div>
                    <span className="text-xs opacity-60">2024.04 - Current</span>
                  </div>
                  
                  <h3 className="font-semibold text-base mb-1 text-blue-600 dark:text-blue-400 font-pretendard">
                    Information Systems @ <a href="https://business.kaist.ac.kr" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 decoration-2 font-pretendard">KAIST Business School</a>
                  </h3>
                  <p className="text-xs opacity-70 font-pretendard">
                    AI/ML applications, quantitative marketing, and information systems
                  </p>
                </div>
              </div>
              
              {/* Undergraduate - KAIST */}
              <div className="relative pl-16">
                <div className={`absolute left-6 top-4 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full ring-4 shadow-lg 
                  ${darkMode ? 'ring-gray-900' : 'ring-gray-100'}`}></div>
                <div className={`group hover:scale-[1.02] transition-all duration-300 cursor-default
                  ${darkMode 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50' 
                    : 'bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50'}
                  rounded-xl p-3 shadow-md font-pretendard`}>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl tossface">🏛️</span>
                      <span className="px-2 pt-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full font-pretendard">
                        Visiting Scholar
                      </span>
                    </div>
                    <span className="text-xs opacity-60">2025.01 - 2025.07</span>
                  </div>
                  

                  <h3 className="font-semibold text-base mb-1 text-purple-600 dark:text-purple-400 font-pretendard">
                    Computer Science @ {' '}
                    <a href="https://www.kaist.ac.kr" target="_blank" rel="noopener noreferrer" className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 decoration-2 font-pretendard">
                      Carnegie Mellon University
                    </a>
                  </h3>
                  <p className="text-xs opacity-70 font-pretendard">
                    Software and Societal Systems Department under School of Computer Science
                  </p>
                </div>
              </div>
              
              {/* CMU Affiliation */}
              <div className="relative pl-16">
                <div className={`absolute left-6 top-4 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full ring-4 shadow-lg 
                  ${darkMode ? 'ring-gray-900' : 'ring-gray-100'}`}></div>
                <div className={`group hover:scale-[1.02] transition-all duration-300 cursor-default
                  ${darkMode 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50' 
                    : 'bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-gray-200/50'}
                  rounded-xl p-3 shadow-md font-pretendard`}>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl tossface">💻</span>
                      <span className="px-2 pt-1 text-xs bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold rounded-full font-pretendard">
                        Undergraduate
                      </span>
                    </div>
                    <span className="text-xs opacity-60">2019.03 - 2025.02</span>
                  </div>
                  
                    <h3 className="font-semibold text-base mb-1 text-purple-600 dark:text-purple-400 font-pretendard">
                    Computer Science and Business Technology Management @ {' '}
                    <a href="https://www.kaist.ac.kr" target="_blank" rel="noopener noreferrer" className="font-bold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 decoration-2 font-pretendard">
                      KAIST
                    </a>
                  </h3>
                  <p className="text-xs opacity-70 font-pretendard">
                    Double major in CS and BTM (Business Technology & Management)
                  </p>
                </div>
              </div>
              </div>
              
            {/* Fun Facts Card */}
            <div className={`mt-4 relative overflow-hidden
              ${darkMode 
                ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-purple-500/30' 
                : 'bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm border border-purple-200/50'}
              rounded-xl p-3 shadow-md font-pretendard`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-14 h-14 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full translate-y-6 -translate-x-6"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl tossface">🔬</span>
                  <h3 className="text-base font-bold text-purple-600 dark:text-purple-400 font-pretendard">Fun Facts</h3>
                </div>
                <p className="text-sm leading-snug text-purple-700 dark:text-purple-400 font-pretendard">
                  I was deeply involved in <span className="font-semibold">Physics</span> from {' '}
                  <a href="https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%82%AC%EB%B2%A8%EC%A4%91%ED%95%99%EA%B5%90" target="_blank" rel="noopener noreferrer"
                    className="font-semibold decoration-2 hover:text-purple-800 dark:hover:text-purple-200 transition-colors font-pretendard">
                    Isabelle Junior High School
                  </a>  (2012.03-2015.02) through {' '}
                  <a href="http://english.minjok.hs.kr/contents/main.php" target="_blank" rel="noopener noreferrer"
                    className="font-semibold decoration-2 hover:text-purple-800 dark:hover:text-purple-200 transition-colors font-pretendard">
                    Korean Minjok Leadership Academy
                  </a> (2015.03-2018.02). My ideal type was Richard Feynman!
                </p>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Research Publications</h2>
          {/* <p className="text-gray-600 dark:text-gray-400 mb-6">Please see my CV for more details.</p> */}
          
          <CollaborationRatioBar darkMode={darkMode} />

          <div className="space-y-6">
            {publicationsData.publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-lg border transition-colors ${
                  darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                {pub.image ? (
                  <div className="flex flex-row gap-6 items-start">
                    <Image
                      src={pub.image}
                      alt={pub.title + ' image'}
                      width={220}
                      height={220}
                      className="mt-1 w-55 h-55 object-cover rounded-lg flex-shrink-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold flex-1 mr-4">{pub.title}</h3>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 text-xs rounded-full ${
                              darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {pub.type}
                            </span>
                            <span className={`px-3 py-1 text-xs rounded-full ${
                              pub.status === 'Accepted' 
                                ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'
                                : pub.status === 'Under Review'
                                ? darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-700'
                                : darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {pub.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: pub.authors }}></p>
                      <p className="text-blue-500 font-medium mb-3" dangerouslySetInnerHTML={{ __html: pub.venue }}></p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{pub.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {pub.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={`px-2 py-1 text-xs rounded ${
                                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              #{tag.toLowerCase().replace(/\s+/g, '-')}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-3">
                          {pub.links.paper && (
                            <a href={pub.links.paper} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm">
                              <FileText size={14} className="mr-1 mb-0.5" />
                              PDF
                            </a>
                          )}
                          {pub.links.code && (
                            <a href={pub.links.code} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm">
                              <Github size={14} className="mr-1 mb-0.5" />
                              Code
                            </a>
                          )}
                          {pub.links.ssrn && (
                            <a href={pub.links.ssrn} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm">
                              <FileText size={14} className="mr-1 mb-0.5" />
                              SSRN
                            </a>
                          )}
                          {!pub.links.paper && !pub.links.code && !pub.links.ssrn && (
                            <span className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm tossface"> </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold flex-1 mr-4">{pub.title}</h3>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {pub.type}
                          </span>
                          <span className={`px-3 py-1 text-xs rounded-full ${
                            pub.status === 'Accepted' 
                              ? darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'
                              : pub.status === 'Under Review'
                              ? darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-700'
                              : darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {pub.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2" dangerouslySetInnerHTML={{ __html: pub.authors }}></p>
                    <p className="text-blue-500 font-medium mb-3" dangerouslySetInnerHTML={{ __html: pub.venue }}></p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{pub.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {pub.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-2 py-1 text-xs rounded ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            #{tag.toLowerCase().replace(/\s+/g, '-')}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-3">
                        {pub.links.paper && (
                          <a href={pub.links.paper} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm">
                            <FileText size={14} className="mr-1" />
                            PDF
                          </a>
                        )}
                        {pub.links.code && (
                          <a href={pub.links.code} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm">
                            <Github size={14} className="mr-1" />
                            Code
                          </a>
                        )}
                        {pub.links.ssrn && (
                          <a href={pub.links.ssrn} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm">
                            <FileText size={14} className="mr-1" />
                            SSRN
                          </a>
                        )}
                        {!pub.links.paper && !pub.links.code && !pub.links.ssrn && (
                          <span className="text-gray-500">Coming Soon!</span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Research Experience Section */}
        <section id="research" className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Research Experience</h2>
          <div className="space-y-4">
            <AnimatePresence>
              {researchExperience.map((research, index) => {
                const isOpen = openProjectIndex === `research-${index}`;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`group rounded-xl border transition-all duration-200 ${
                      darkMode 
                        ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80 hover:border-gray-600' 
                        : 'bg-white/70 border-gray-200/60 hover:bg-white hover:border-gray-300'
                    } backdrop-blur-sm shadow-sm hover:shadow-md`}
                  >
                    {/* Research Header - Always Visible */}
                    <button
                      className="w-full p-6 focus:outline-none text-left"
                      onClick={() => setOpenProjectIndex(isOpen ? null : `research-${index}`)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-4">
                        {/* Emoji */}
                        {/* <div className="flex-shrink-0">
                          {research.emoji && (
                            <span className="tossface text-3xl" dangerouslySetInnerHTML={{ __html: research.emoji }} />
                          )}
                        </div> */}
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className={`text-base font-bold transition-colors ${
                                darkMode 
                                  ? 'text-gray-300 group-hover:text-blue-400' 
                                  : 'text-gray-700 group-hover:text-blue-600'
                              }`}
                              dangerouslySetInnerHTML={{ __html: research.title }}
                            >
                            </h3>
                            <div className="flex items-center gap-2 ml-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                  {research.type}
                                </span>
                                {research.period && (
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    • {research.period}
                                  </span>
                                )}
                              </div>
                              <ChevronDown
                                size={20}
                                className={`transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between w-full">
                            <div className="flex flex-wrap gap-2">
                              {research.tags && research.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className={`px-2 py-1 text-xs rounded-md ${
                                    darkMode ? 'bg-gray-700/50 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-600 border border-gray-200'
                                  }`}
                                >
                                  #{tag.toLowerCase().replace(/\s+/g, '-')}
                                </span>
                              ))}
                            </div>
                            {research.stack && research.stack.length > 0 && (
                              <div className="flex flex-wrap gap-2 ml-auto">
                                {research.stack.map((stackItem, stackIdx) => (
                                  <span
                                    key={stackIdx}
                                    className={`px-2 py-0.5 text-xs rounded-md font-semibold border ${
                                      darkMode ? 'bg-blue-900/10 text-blue-300 border-blue-900/20' : 'bg-blue-50 text-blue-500 border-blue-100'
                                    }`}
                                  >
                                    {stackItem}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                    {/* Expanded Content */}
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {isOpen && (
                        <div className={`px-6 pb-6 border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                          <div className="pt-4">
                            <div className="prose dark:prose-invert max-w-none">
                              <p className="font-pretendard text-gray-600 dark:text-gray-400 text-sm mb-4">{research.description}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            
            <div className="flex flex-wrap gap-2">
              {filterTags.map((tag) => (
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
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                const isOpen = openProjectIndex === index;
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`group rounded-xl border transition-all duration-200 ${
                      darkMode 
                        ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/80 hover:border-gray-600' 
                        : 'bg-white/70 border-gray-200/60 hover:bg-white hover:border-gray-300'
                    } backdrop-blur-sm shadow-sm hover:shadow-md`}
                  >
                    {/* Project Header - Always Visible */}
                    <button
                      className="w-full p-6 focus:outline-none text-left"
                      onClick={() => setOpenProjectIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-4">
                        {/* Project Emoji */}
                        {/* <div className="flex-shrink-0">
                          <span 
                            className="tossface text-3xl"
                            dangerouslySetInnerHTML={{ __html: project.emoji }}
                          />
                        </div> */}
                        
                        {/* Project Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className={`text-base font-bold transition-colors ${
                                darkMode 
                                  ? 'text-gray-300 group-hover:text-blue-400' 
                                  : 'text-gray-700 group-hover:text-blue-600'
                              }`}
                              dangerouslySetInnerHTML={{ __html: project.title }}
                            >
                            </h3>
                            <div className="flex items-center gap-2 ml-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                  {project.role}
                                </span>
                                {project.period && (
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    • {project.period}
                                  </span>
                                )}
                              </div>
                              <ChevronDown
                                size={20}
                                className={`transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
                              />
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-between w-full">
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className={`px-2 py-1 text-xs rounded-md ${
                                    darkMode ? 'bg-gray-700/50 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-600 border border-gray-200'
                                  }`}
                                >
                                  #{tag.toLowerCase().replace(/\s+/g, '-')}
                                </span>
                              ))}
                            </div>
                            {project.stack && project.stack.length > 0 && (
                              <div className="flex flex-wrap gap-2 ml-auto">
                                {project.stack.map((stackItem, stackIdx) => (
                                  <span
                                    key={stackIdx}
                                    className={`px-2 py-0.5 text-xs rounded-md font-semibold border ${
                                      darkMode ? 'bg-blue-900/10 text-blue-300 border-blue-900/20' : 'bg-blue-50 text-blue-500 border-blue-100'
                                    }`}
                                  >
                                    {stackItem}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {isOpen && (
                        <div className={`px-6 pb-6 border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                          <div className="pt-4">
                            {/* Project Images */}
                            {project.images && project.images.length > 0 && (
                              <div className="mb-6 flex justify-center">
                                <div className="flex gap-4">
                                  {project.images.map((image, idx) => (
                                    <img
                                      key={idx}
                                      src={image}
                                      alt={`${project.title} - Image ${idx + 1}`}
                                      className="w-48 h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Project Details */}
                            <div className={`${project.images && project.images.length === 1 ? 'flex-1 min-w-0' : ''}`}>
                              <div className="prose dark:prose-invert">
                                <ReactMarkdown
                                  components={{
                                    p: ({node, ...props}) => <p className="font-pretendard !text-xs !leading-tight !mb-1" {...props} />,
                                    strong: ({node, ...props}) => <strong className="font-pretendard !text-xs" {...props} />,
                                    em: ({node, ...props}) => <em className="font-pretendard !text-xs" {...props} />,
                                    h1: ({node, ...props}) => <h1 className="font-pretendard !text-lg !font-bold !mt-4 !mb-2" {...props} />,
                                    h2: ({node, ...props}) => <h2 className="font-pretendard !text-base !font-bold !mt-3 !mb-2" {...props} />,
                                    h3: ({node, ...props}) => <h3 className="font-pretendard !text-sm !font-semibold !mt-2 !mb-1" {...props} />,
                                    h4: ({node, ...props}) => <h4 className="font-pretendard !text-xs !font-semibold !mt-2 !mb-1" {...props} />,
                                    h5: ({node, ...props}) => <h5 className="font-pretendard !text-xs !font-semibold !mt-1 !mb-1" {...props} />,
                                    h6: ({node, ...props}) => <h6 className="font-pretendard !text-xs !font-semibold !mt-1 !mb-1" {...props} />,
                                    li: ({node, ...props}) => <li className="font-pretendard !text-xs !my-0" {...props} />,
                                    ul: ({node, ...props}) => <ul className="font-pretendard !list-disc !pl-3 !my-1" {...props} />,
                                    ol: ({node, ...props}) => <ol className="font-pretendard !list-decimal !pl-3 !my-1" {...props} />,
                                    a: ({node, ...props}) => <a className="font-pretendard !text-xs" {...props} />,
                                    blockquote: ({node, ...props}) => <blockquote className="font-pretendard !text-xs !my-1" {...props} />,
                                    code: ({node, ...props}) => <code className="font-pretendard !text-xs" {...props} />,
                                    pre: ({node, ...props}) => <pre className="font-pretendard !text-xs !my-1" {...props} />,
                                  }}
                                >
                                  {project.description}
                                </ReactMarkdown>
                              </div>
                              
                              <div className="flex items-center gap-4 mt-4">
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
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      </SidebarLayout>

      {/* Footer */}
      <footer className={`border-t py-8 ${
        darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 font-pretendard">
            © 2025 Sana Kang. Built with curiosity and caffeine <span className="tossface">☕</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;