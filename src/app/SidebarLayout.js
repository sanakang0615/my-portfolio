"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const SidebarLayout = ({ navItems, children, sidebarTitle = "NAVIGATION", darkMode, newsItems, activeSection }) => {
  const [collapsed, setCollapsed] = useState(false);
  // 현재 활성화된 탭 이름 찾기
  const activeNav = navItems.find(item => item.id === activeSection);
  const displayTitle = activeNav ? activeNav.label : sidebarTitle;
  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <div className={`relative sticky top-20 h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-58'} \
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r overflow-y-auto`}>
        <div className="p-4 flex flex-col h-full">
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
                <h3 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>{displayTitle}</h3>
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
                      >
                        {item.icon && <item.icon size={16} />}
                        <span>{item.label}</span>
                      </a>
                    )
                  ))}
                </nav>
                {/* News Section in Sidebar */}
                {newsItems && newsItems.length > 0 && (
                  <div className="mt-6">
                    <h4 className={`text-base font-bold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>News</h4>
                    <ul className="space-y-3">
                      {newsItems.slice(0, 6).map((news, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={`font-bold pt-0.5 text-[10px] min-w-[36px] text-left ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>{news.date}</span>
                          <span className="tossface text-base text-[12px] text-left">{news.icon.props.children}</span>
                          <span className={`text-[14.5px] flex-1 text-left ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>{news.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex-1" />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 max-w-none px-8 py-8">{children}</div>
    </div>
  );
};

export default SidebarLayout; 