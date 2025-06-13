"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const SidebarLayout = ({ navItems, children, sidebarTitle = "NAVIGATION" }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <div className={`sticky top-20 h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} bg-gray-800 border-r border-gray-700 overflow-y-auto`}>
        <div className="p-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-4 p-2 rounded-md hover:bg-gray-700"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <span>&#8250;</span> // '>'
            ) : (
              <span>&#8249;</span> // '<'
            )}
          </button>
          {!collapsed && (
            <>
              <h3 className="text-sm font-semibold mb-3 text-gray-400">{sidebarTitle}</h3>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  item.href ? (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {item.icon && <item.icon size={16} />}
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {item.icon && <item.icon size={16} />}
                      <span>{item.label}</span>
                    </a>
                  )
                ))}
              </nav>
            </>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 max-w-none px-8 py-8">{children}</div>
    </div>
  );
};

export default SidebarLayout; 