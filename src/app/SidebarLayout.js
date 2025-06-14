"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const SidebarLayout = ({ navItems, children, sidebarTitle = "NAVIGATION", darkMode, newsItems, activeSection }) => {
  const [collapsed, setCollapsed] = useState(false);
  // 현재 활성화된 탭 이름 찾기
  const activeNav = navItems.find(item => item.id === activeSection);
  const displayTitle = sidebarTitle;
  return (
    <div className="flex">
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        /* 사이드바 전체 스크롤바 */
        .sidebar-main-scroll {
          scrollbar-width: thin;
          scrollbar-color: ${darkMode ? '#4B5563 #374151' : '#D1D5DB #F9FAFB'};
          overflow-y: auto;
        }
        
        .sidebar-main-scroll::-webkit-scrollbar {
          width: 8px;
          display: none;
        }
        
        .sidebar-main-scroll:hover::-webkit-scrollbar {
          display: block;
        }
        
        .sidebar-main-scroll::-webkit-scrollbar-track {
          background: ${darkMode ? '#374151' : '#F9FAFB'};
          border-radius: 4px;
        }
        
        .sidebar-main-scroll::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#6B7280' : '#D1D5DB'};
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        
        .sidebar-main-scroll::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#9CA3AF' : '#9CA3AF'};
        }

        /* 뉴스 섹션 스크롤바 */
        .sidebar-news-scroll {
          scrollbar-width: thin;
          scrollbar-color: ${darkMode ? '#6B7280 #4B5563' : '#9CA3AF #F3F4F6'};
          height: 60vh;
          overflow-y: auto;
        }
        
        .sidebar-news-scroll::-webkit-scrollbar {
          width: 6px;
        }
        
        .sidebar-news-scroll::-webkit-scrollbar-track {
          background: ${darkMode ? '#4B5563' : '#F3F4F6'};
          border-radius: 3px;
          margin: 4px 0;
        }
        
        .sidebar-news-scroll::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#9CA3AF' : '#6B7280'};
          border-radius: 3px;
          transition: all 0.2s ease;
        }
        
        .sidebar-news-scroll::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#D1D5DB' : '#4B5563'};
          transform: scale(1.1);
        }

        /* 스크롤바가 호버될 때 부드러운 애니메이션 */
        .sidebar-news-scroll::-webkit-scrollbar-thumb:active {
          background: ${darkMode ? '#F3F4F6' : '#374151'};
        }
      `}</style>

      {/* Sidebar Navigation - hidden on mobile */}
      <div className={`relative sticky top-20 h-screen transition-all duration-300 hidden md:block ${collapsed ? 'w-16' : 'w-63'} \
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r overflow-y-auto sidebar-main-scroll flex flex-col`}>
        <div className="p-4 flex flex-col h-full flex-1">
          {/* Collapse Button - absolute top right */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full shadow transition-colors border \
              ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'}`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <span className="text-xl">&#8250;</span> // '>'
            ) : (
              <span className="text-xl">&#8249;</span> // '<'
            )}
          </button>
          <div className={collapsed ? 'mt-16' : ''}>
            {!collapsed && (
              <>
                <h3 className={`text-md font-semibold mt-2.5 mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{displayTitle}</h3>
                <nav className="space-y-1 mb-6">
                  {navItems.map((item) => (
                    item.href ? (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm \
                          ${darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'}`}
                      >
                        {item.icon && <item.icon size={16} />}
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm \
                          ${darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'}`}
                        onClick={e => {
                          e.preventDefault();
                          const el = document.getElementById(item.id);
                          if (el) {
                            const headerOffset = 80;
                            const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                            const offsetPosition = elementPosition - headerOffset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                          }
                        }}
                      >
                        {item.icon && <item.icon size={16} />}
                        <span>{item.label}</span>
                      </a>
                    )
                  ))}
                </nav>
                {/* News Section in Sidebar */}
                {newsItems && newsItems.length > 0 && (
                  <div className="mt-8">
                    <h3 className={`text-md font-semibold mt-5 mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>News</h3>
                    <div className="sidebar-news-scroll flex flex-col h-[50vh]">
                      <div className="flex-1 overflow-y-auto">
                        {newsItems.map((news, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded-md mb-2 ${
                              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              <span className={`font-bold pt-0.5 text-[10px] min-w-[36px] text-left ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>{news.date}</span>
                              <span className="tossface text-base text-[12px] text-left">{news.icon.props.children}</span>
                              <span className={`text-[14.5px] flex-1 text-left ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>{news.title}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {/* <div className="text-sm text-gray-400 dark:text-gray-600 text-center select-none font-pretendard mt-10 mb-4">Thanks for visiting, by the way!</div> */}
        </div>
      </div>
      {/* Main Content - adjusted padding for mobile */}
      <div className="flex-1 max-w-none px-4 md:px-8 py-8">{children}</div>
    </div>
  );
};

export default SidebarLayout;