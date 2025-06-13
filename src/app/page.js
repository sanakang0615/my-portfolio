"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Coffee,
  Gamepad2,
  Music,
  Palette,
  MessageCircle,
  ArrowUp
} from 'lucide-react';
import Link from 'next/link';
import SidebarLayout from './SidebarLayout';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSection, setActiveSection] = useState('about');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : true;
    }
    return true;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigationItems = [
    { id: 'about', label: 'About Me', icon: Users },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'publications', label: 'Publications', icon: FileText },
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
      tags: ['Gaming', 'Work-Life Balance', 'Personal'],
      readTime: '3 min read'
    },
    {
      date: '2025-01-05',
      title: 'From Seoul to Pittsburgh: Cultural Observations',
      category: 'Travel',
      excerpt: 'Interesting cultural differences I\'ve noticed while doing research at CMU. Food, work culture, and academic life...',
      tags: ['Culture', 'Travel', 'Academia'],
      readTime: '7 min read'
    },
    {
      date: '2024-12-20',
      title: 'Building DEATH\'s WORD CHAIN: A Developer\'s Journey',
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

  const newsItems = [
    {
      date: '2025.04',
      icon: <span className="tossface">🎓</span>,
      title: "Starting PhD at Princeton University",
      description: "Excited to begin my PhD journey in Computer Science at Princeton University in Fall 2025!"
    },
    {
      date: '2025.01',
      icon: <span className="tossface">📄</span>,
      title: "EMNLP 2025 Paper Submitted",
      description: "First-authored paper on LLM-based Brand-Influencer Evaluation Framework submitted to EMNLP 2025."
    },
    {
      date: '2024.12',
      icon: <span className="tossface">🏆</span>,
      title: "ICIS 2025 Paper Accepted",
      description: "Our paper on Information Systems research has been accepted to ICIS 2025 as 2nd author."
    },
    {
      date: '2024.11',
      icon: <span className="tossface">📚</span>,
      title: "Book Chapter Accepted",
      description: "Collaborative research with Harvard Business School, Boston College, and UMich accepted for publication."
    },
    {
      date: '2024.08',
      icon: <span className="tossface">🇺🇸</span>,
      title: "Started at CMU as Short-term Scholar",
      description: "Beginning research collaboration at Carnegie Mellon University Tepper School of Business."
    }
  ];

  const publications = [
    {
      title: "LLM-based Brand-Influencer Evaluation Framework",
      authors: "Sana Kang, Prof. A, Prof. B, Dr. C",
      venue: "EMNLP 2025",
      status: "Under Review",
      type: "Conference",
      tags: ["AI/ML", "NLP", "Marketing"],
      links: { arxiv: "#", code: "#" },
      description: "Novel evaluation methods for brand-influencer selection using large language models with applications in digital marketing."
    },
    {
      title: "Healthcare Predictive Models: A Comprehensive Survey",
      authors: "Sana Kang, Sung-Hyuk Park, Firenze Inc. Team",
      venue: "Healthcare Analytics Journal",
      status: "In Preparation",
      type: "Survey",
      tags: ["Healthcare", "ML", "Survey"],
      links: { paper: "#" },
      description: "Comprehensive survey of cardiovascular disease prediction models with industry application focus."
    },
    {
      title: "Causal Inference in Information Systems",
      authors: "Prof. X, Sana Kang, Prof. Y",
      venue: "ICIS 2025",
      status: "Under Review",
      type: "Conference",
      tags: ["IS", "Causal Inference"],
      links: { paper: "#" },
      description: "Exploring causal relationships in information systems and business analytics applications."
    },
    {
      title: "Strategic Business Analysis in Digital Era",
      authors: "Harvard Team, Boston College Team, UMich Team, Sana Kang",
      venue: "Strategic Management Book Chapter",
      status: "Accepted",
      type: "Book Chapter",
      tags: ["Strategy", "Business"],
      links: { publisher: "#" },
      description: "Collaborative research on business strategy with leading academic institutions."
    }
  ];

  const projects = [
    {
      title: "ExploreSelf: AI-driven Personal Reflection System",
      description: "Led development of adaptive guidance system using Large Language Models for fostering user-driven exploration and reflection on personal challenges.",
      role: "Project Lead & Full-stack Developer",
      tags: ["System Building", "AI/ML", "HCI"],
      period: "2024 - Present",
      links: { github: "#", demo: "#", paper: "#" },
      image: "🤖",
      status: "CHI 2025 Submission"
    },
    {
      title: "Location-Based Sales Prediction Model",
      description: "Developed GraphSAGE-based model for FnB franchise sales prediction, reducing RMSE by 10.6% compared to manual expert predictions.",
      role: "ML Team Lead",
      tags: ["Deep Learning", "Data Analysis"],
      period: "2023 - 2024",
      links: { github: "#", report: "#" },
      image: "📊",
      status: "Industry Collaboration"
    },
    {
      title: "VENETA Multi-Issuer Blockchain System",
      description: "Designed and developed MVP for blockchain-based P2P trading system. Selected for government-sponsored Financial Regulatory Sandbox.",
      role: "Blockchain Developer",
      tags: ["System Building", "Blockchain"],
      period: "2022",
      links: { github: "#", patent: "#" },
      image: "⛓️",
      status: "Patent Filed"
    },
    {
      title: "DEATH's WORD CHAIN Game",
      description: "Interactive vocabulary learning game developed while studying GRE words. Combines educational content with engaging gameplay mechanics.",
      role: "Game Developer",
      tags: ["Others", "Game Development"],
      period: "2024",
      links: { github: "#", play: "#" },
      image: "🎮",
      status: "Personal Project"
    }
  ];

  const filterTags = ['All', 'System Building', 'Deep Learning', 'Data Analysis', 'AI/ML', 'Others'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  // Search functionality
  const searchableContent = [
    ...publications.map(pub => ({ ...pub, type: 'publication' })),
    ...projects.map(proj => ({ ...proj, type: 'project' })),
    ...blogPosts.map(post => ({ ...post, type: 'blog' })),
    ...newsItems.map(news => ({ ...news, type: 'news' }))
  ];

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
      const headerOffset = 80; // 실제 헤더 높이(px)로 맞춰주세요
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'publications', 'blog', 'cv'];
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
    { id: 'about', label: 'About Me', icon: Users },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'publications', label: 'Publications', icon: FileText },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="w-full px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-semibold tossface">⛰️ Sana Kang</h1>
              </div>
              
              <nav className="hidden md:flex space-x-6 ml-8">
                <Link href="/" className="text-sm hover:text-blue-400 transition-colors">About Me</Link>
                <Link href="/hobbies" className="text-sm hover:text-blue-400 transition-colors">Hobbies</Link>
                <Link href="/blog" className="text-sm hover:text-blue-400 transition-colors">Blog</Link>
                <Link href="/cv" className="text-sm hover:text-blue-400 transition-colors">CV</Link>
                <Link href="/aboutsite" className="text-sm hover:text-blue-400 transition-colors">What&apos;s This?</Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <Linkedin size={20} />
                </a>
              </div>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-md transition-colors ${
                  darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors ${
                  darkMode 
                    ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' 
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
              >
                <Search size={16} />
                <span className="text-sm">Search</span>
                <div className="hidden sm:flex items-center space-x-1">
                  <kbd className={`px-1 py-0.5 text-xs rounded ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>⌘</kbd>
                  <kbd className={`px-1 py-0.5 text-xs rounded ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>K</kbd>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

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
                            result.type === 'blog' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' :
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

      <SidebarLayout navItems={aboutNavItems} sidebarTitle="NAVIGATION" darkMode={darkMode} newsItems={newsItems} activeSection={activeSection}>
        {/* Main Content (About, News, Projects, Publications 섹션만) */}
        {/* About Section */}
        <section id="about" className="mb-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className={`w-55 mt-0 rounded-lg overflow-hidden border-4 ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex items-center justify-center`}>
                <img
                  src="/my_photo_2.jpeg"
                  alt="Profile Photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Info + 소개문단 */}
            <div className="flex-1 flex flex-col justify-center h-full min-w-0">
              <div className="prose max-w-none" style={{color: darkMode ? '#cbd5e1' : '#374151'}}>
                <p className="text-lg leading-relaxed mb-4">
                  I am a second-year Master&apos;s student in Management Engineering at{' '}
                  <span className="tossface mr-1">🇰🇷</span><span className="text-blue-600 font-semibold">KAIST</span>, specializing in Information Systems. 
                  I am currently a Short-term Scholar at{' '}
                  <span className="tossface mr-1">🇺🇸</span><span className="text-red-400 font-semibold">Carnegie Mellon University</span> (until July 2025).

                  My research interests lie at the intersection of AI/ML applications, 
                  quantitative marketing, and information systems. 
                  I am passionate about leveraging advanced analytics and machine learning techniques 
                  to solve real-world business problems.
                  </p>
                  <p className="text-lg leading-relaxed mb-4">
                  Beyond academia, I&apos;m a <span className="tossface mr-1">🎮</span>console gamer (currently obsessed with story-rich games), 
                  a <span className="tossface mr-1">🎨</span>digital artist who loves creating while listening to music, and someone who turned 
                  <span className="tossface mr-1">📚</span>GRE vocabulary study into a fun word game project. I believe the best ideas come from 
                  the intersection of different interests and experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Majors Section */}
        <section id="majors" className="mb-16">
          <div className="mb-8">  
            <h2 className="text-2xl font-bold mb-4">Academic Journey</h2>
            {/* <p className="text-gray-600 dark:text-gray-400 mb-6">
              A selection of previous projects that I have either led or co-led, for research, coursework, and of course, for fun!
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
                  rounded-xl p-3 shadow-md font-['Pretendard']`}>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl tossface">🎓</span>
                      <span className="px-2 pt-1 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full font-['Pretendard']">
                        Graduate
                      </span>
                    </div>
                    <span className="text-xs opacity-60">2024.04 - Current</span>
                  </div>
                  
                  <h3 className="text-base mb-1 text-blue-600 dark:text-blue-400 font-['Pretendard']">
                    Information Systems @ <a href="https://business.kaist.ac.kr" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 decoration-2 font-['Pretendard'] font-semibold">KAIST Business School</a>
                  </h3>
                  <p className="text-xs opacity-70 font-['Pretendard']">
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
                  rounded-xl p-3 shadow-md font-['Pretendard']`}>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl tossface">🏛️</span>
                      <span className="px-2 pt-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full font-['Pretendard']">
                        Visiting Scholar
                      </span>
                    </div>
                    <span className="text-xs opacity-60">2025.01 - 2025.07</span>
                  </div>
                  

                  <h3 className="text-base mb-1 text-purple-600 dark:text-purple-400 font-['Pretendard']">
                    Computer Science @ {' '}
                    <a href="https://www.kaist.ac.kr" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 decoration-2 font-['Pretendard'] font-semibold">
                      Carnegie Mellon University
                    </a>
                  </h3>
                  <p className="text-xs opacity-70 font-['Pretendard']">
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
                  rounded-xl p-3 shadow-md font-['Pretendard']`}>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl tossface">💻</span>
                      <span className="px-2 pt-1 text-xs bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold rounded-full font-['Pretendard']">
                        Undergraduate
                      </span>
                    </div>
                    <span className="text-xs opacity-60">2019.03 - 2025.02</span>
                  </div>
                  
                    <h3 className="text-base mb-1 text-purple-600 dark:text-purple-400 font-['Pretendard']">
                    Computer Science and Business Technology & Management @ {' '}
                    <a href="https://www.kaist.ac.kr" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 decoration-2 font-['Pretendard'] font-semibold">
                      KAIST
                    </a>
                  </h3>
                  <p className="text-xs opacity-70 font-['Pretendard']">
                    Double major combining technical computer science with business management
                  </p>
                </div>
              </div>
            </div>

            {/* Fun Facts Card */}
            <div className={`mt-4 relative overflow-hidden
              ${darkMode 
                ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-purple-500/30' 
                : 'bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm border border-purple-200/50'}
              rounded-xl p-3 shadow-md font-['Pretendard']`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-14 h-14 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full translate-y-6 -translate-x-6"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl tossface">🔬</span>
                  <h3 className="text-base font-bold text-purple-600 dark:text-purple-400 font-['Pretendard']">Fun Facts</h3>
                </div>
                <p className="text-sm leading-snug text-purple-700 dark:text-purple-400 font-['Pretendard']">
                  I was deeply involved in <span className="font-semibold">Physics</span> from middle school (
                  <a href="https://www.isabelle.ac.kr" target="_blank" rel="noopener noreferrer"
                    className="font-semibold decoration-2 hover:text-purple-800 dark:hover:text-purple-200 transition-colors font-['Pretendard']">
                    ISabelle
                  </a>
                  ) through high school (
                  <a href="https://www.kmla.hs.kr" target="_blank" rel="noopener noreferrer"
                    className="font-semibold decoration-2 hover:text-purple-800 dark:hover:text-purple-200 transition-colors font-['Pretendard']">
                    KMLA
                  </a>
                  ). My ideal type was Richard Feynman!
                </p>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A selection of previous projects that I have either led or co-led, for research, coursework, and of course, for fun!
            </p>
            
            <div className="flex flex-wrap gap-2">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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

          <div className="grid gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-6 rounded-lg border transition-colors ${
                    darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{project.image}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                        
                        <div className="mb-3">
                          <span className="text-sm text-blue-500 font-medium">Role: </span>
                          <span className="text-sm">{project.role}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, tagIndex) => (
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

                        <div className="flex items-center space-x-4">
                          {project.links.github && (
                            <a href={project.links.github} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm">
                              <Github size={16} className="mr-1" />
                              code
                            </a>
                          )}
                          {project.links.paper && (
                            <a href={project.links.paper} className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm">
                              <FileText size={16} className="mr-1" />
                              paper
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Publications</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Please see my CV for more details.</p>
          
          <div className="space-y-6">
            {publications.map((pub, index) => (
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
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold flex-1 mr-4">{pub.title}</h3>
                  <div className="flex flex-col items-end gap-2">
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
                
                <p className="text-gray-700 dark:text-gray-300 mb-2">{pub.authors}</p>
                <p className="text-blue-500 font-medium mb-3">{pub.venue}</p>
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </SidebarLayout>

      {/* Footer */}
      <footer className={`border-t py-8 ${
        darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 Sana Kang. Built with curiosity and caffeine ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;