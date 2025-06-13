"use client"
import React from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';
import AppLayout from '../AppLayout';

const CV = () => {
  const cvNavItems = [];

  return (
    <AppLayout navItems={cvNavItems} sidebarTitle="CV">
      <main className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-3xl font-bold mb-4">Curriculum Vitae</h2>
        <p className="text-lg text-gray-400 mb-6">Download my CV for a complete overview of my academic and professional background.</p>
        <a href="/SanaKang_CV.pdf" download className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          <Download size={20} className="mr-2" />
          Download CV (PDF)
        </a>
      </main>
    </AppLayout>
  );
};

export default CV; 