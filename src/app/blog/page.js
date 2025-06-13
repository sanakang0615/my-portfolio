"use client"
import React from 'react';
import Link from 'next/link';
import AppLayout from '../AppLayout';

const Blog = () => {
  const blogNavItems = [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}

      <AppLayout navItems={blogNavItems} sidebarTitle="BLOG">
        <main className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-3xl font-bold mb-4">Blog</h2>
          <p className="text-lg text-gray-400">Blog Coming Soon!</p>
        </main>
      </AppLayout>
    </div>
  );
};

export default Blog; 