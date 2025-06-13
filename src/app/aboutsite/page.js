"use client"
import React from 'react';
import Link from 'next/link';
import AppLayout from '../AppLayout';

const AboutSite = () => {
  const aboutNavItems = [];

  return (
    <AppLayout navItems={aboutNavItems} sidebarTitle="ABOUT">
      <main className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-3xl font-bold mb-4">What&apos;s This Site?</h2>
        <p className="text-lg text-gray-400 max-w-xl text-center">
          This website is a personal portfolio and digital playground for Sana Kang. Here you can find my academic journey, research, projects, creative hobbies, and more. I built this site to share my story, connect with others, and document my growth as a researcher and creator.
        </p>
      </main>
    </AppLayout>
  );
};

export default AboutSite; 