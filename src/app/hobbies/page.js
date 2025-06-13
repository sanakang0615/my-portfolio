"use client"
import React from 'react';
import Link from 'next/link';
import { Palette } from 'lucide-react';
import AppLayout from '../AppLayout';
import { Users, Calendar, Code, FileText } from 'lucide-react';

const Hobbies = () => {
  const hobbiesNavItems = [
    { id: 'drawings', label: 'Drawings', icon: Palette },
    // 추후 Cooking 등 추가 가능
  ];

  const aboutNavItems = [
    { id: 'about', label: 'About Me', icon: Users },
    { id: 'news', label: 'News', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'publications', label: 'Publications', icon: FileText },
  ];

  return (
    <AppLayout navItems={hobbiesNavItems} sidebarTitle="HOBBIES">
      {({ darkMode }) => (
        <>
          {/* Drawings Section */}
          <section id="drawings" className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Drawings</h2>
            <div className={`p-6 rounded-lg border mb-8 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <p className={`mb-4 text-base leading-relaxed ${
                darkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                This is a collection of drawings inspired by music. I have never learned drawing professionally, but started this hobby during the COVID-19 pandemic.
                I have loved rock bands since I was a child, and the name of this project was inspired by Alfred Hitchcock&apos;s <span className="font-semibold">Music to be murdered by</span>.
                If you want to enjoy the drawings with music, please visit
                <a
                  href="https://musicdrawnby.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block font-semibold text-blue-500 hover:text-blue-700 transition-colors duration-200 underline underline-offset-4 decoration-2 decoration-blue-400 hover:decoration-blue-700 ${
                    darkMode ? 'hover:bg-blue-900' : 'hover:bg-blue-50'
                  } px-2 py-1 rounded-lg`}
                >
                  musicdrawnby.vercel.app
                </a>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <img src="/musicdrawnby1.png" alt="musicdrawnby example 1" className="rounded-lg shadow-md mb-2 w-full h-56 object-cover" />
                  <div className={`text-sm text-center mt-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Example Drawing 1<br/><span className="text-gray-400">(Inspired by: [Music Title/Description])</span></div>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/musicdrawnby2.png" alt="musicdrawnby example 2" className="rounded-lg shadow-md mb-2 w-full h-56 object-cover" />
                  <div className={`text-sm text-center mt-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Example Drawing 2<br/><span className="text-gray-400">(Inspired by: [Music Title/Description])</span></div>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/musicdrawnby3.png" alt="musicdrawnby example 3" className="rounded-lg shadow-md mb-2 w-full h-56 object-cover" />
                  <div className={`text-sm text-center mt-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Example Drawing 3<br/><span className="text-gray-400">(Inspired by: [Music Title/Description])</span></div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </AppLayout>
  );
};

export default Hobbies; 