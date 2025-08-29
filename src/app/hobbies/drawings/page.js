"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Palette, ExternalLink, Music, Play, Youtube, Apple, Gamepad2, Map } from 'lucide-react';
import Header from '../../../components/Header';
import { Users, Calendar, Code, FileText } from 'lucide-react';
import { Sun, Moon } from 'lucide-react';

const Hobbies = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  if (!mounted) return null;

  const drawings = [
    {
      id: 1,
      image: "/drawings/drawing-3.jpg",
      title: "Jigsaw Falling Into Place (2025)",
      artist: "Radiohead",
      album: "In Rainbows (2007)",
      how: "iPad Drawing",
      description: <>I drew this on a bed in <a href="https://en.wikipedia.org/wiki/Pittsburgh" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Pittsburgh</a>.</>,
      spotifyLink: "https://open.spotify.com/track/0YJ9FWWHn9EfnN0lHwbzvV",
      appleMusicLink: "https://music.apple.com/us/album/jigsaw-falling-into-place/1109714933?i=1109715469"
    },
    {
      id: 2,
      image: "/drawings/drawing-7.png",
      title: "February (2022)",
      artist: "Thornapple",
      album: "Enlightenment (2019)",
      how: "Pen Sketch",
      description: <>I drew this at the <a href="https://www.royalgrandpalace.th/en/home" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Bangkok Grand Palace</a>.
      Inspired by the <a href="https://www.renown-travel.com/daytripsbangkok/grandpalacemurals.html" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Ramakien Murals</a> there.</>,
      spotifyLink: "https://open.spotify.com/track/5jjhXS0mIHHxyclG71WN8y",
      appleMusicLink: "https://music.apple.com/us/album/february/1470906820?i=1470906823"
    },
    {
      id: 3,
      image: "/drawings/drawing-4.jpg",
      title: "Powder Blue (2023)",
      artist: "The Black Skirts",
      album: "Teen Troubles (2022)",
      how: "Pen Sketch",
      description: <>I drew this at the <a href="https://etk.srail.kr/main.do" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>train</a> 
      {' '} back to <a href="https://en.wikipedia.org/wiki/Busan" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Busan, South Korea.</a></>,
      spotifyLink: "https://open.spotify.com/track/3tF7QjqwiaHpdSfZcnbnbV",
      appleMusicLink: "https://music.apple.com/us/album/powder-blue/1644821406?i=1644821660"
    },
    {
      id: 4,
      image: "/drawings/drawing-1.jpg",
      title: "Chlorine (2022)",
      artist: "Twenty One Pilots",
      album: "Trench (2018)",
      how: "iPad Drawing",
      description: <>I drew this on my desk in my room when I returned to my hometown in <a href="https://en.wikipedia.org/wiki/Busan" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Busan</a>  during winter break.</>,
      spotifyLink: "https://open.spotify.com/track/23OXdR7YuUBVWh5hSnYJau",
      appleMusicLink: "https://music.apple.com/us/album/chlorine/1422828208?i=1422828214"
    },
    {
      id: 5,
      image: "/drawings/drawing-5.jpg",
      title: "Supermassive Black Hole (2022)",
      artist: "Muse",
      album: "Black Holes and Revelations (2006)",
      how: "iPad Drawing",
      description: <>I also drew this on my desk in my room when I returned to my hometown in <a href="https://en.wikipedia.org/wiki/Busan" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Busan</a> during winter break.</>,
      spotifyLink: "https://open.spotify.com/track/3lPr8ghNDBLc2uZovNyLs9",
      appleMusicLink: "https://music.apple.com/us/album/supermassive-black-hole/992221994?i=992221997"
    },
    {
      id: 6,
      image: "/drawings/drawing-6.jpg",
      title: "The Less I Know the Better (2023)",
      artist: "Tame Impala",
      album: "Currents (2015)",
      how: "iPad Drawing",
      description: <>I drew this while studying in an empty classroom during a break at <a href="https://en.wikipedia.org/wiki/KAIST" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>KAIST</a> in <a href="https://en.wikipedia.org/wiki/Daejeon" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Daejeon</a>.</>,
      spotifyLink: "https://open.spotify.com/track/6K4t31amVTZDgR3sKmwUJJ",
      appleMusicLink: "https://music.apple.com/us/album/the-less-i-know-the-better/1440838039?i=1440838488"
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        showSearch={false} 
        setShowSearch={() => {}} 
        searchQuery="" 
        setSearchQuery={() => {}} 
      />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-5xl mx-auto px-6 w-full pt-18">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Music to Drawings</h2>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I love listening to a single piece of music on repeat and translating the emotions into paintings. Here are a few of my works. If you&apos;d like to see more, please visit my{' '}
              <a
                href="https://musicdrawnby.sanakang.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold hover:underline inline-flex items-center gap-1 ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                portfolio website
                <ExternalLink className="w-4 h-4" />
              </a>
              .
            </p>
          </div>

          {/* Drawings Gallery - 그리드 간소화 */}
          <section id="drawings" className="mt-10 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {drawings.map((drawing) => (
                <div key={drawing.id} className="group">
                  {/* 이미지 */}
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <Image 
                      src={drawing.image} 
                      alt={drawing.title} 
                      width={400}
                      height={288}
                      className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* 호버 시 스포티파이 버튼 */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:`opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center gap-4 ">
                        <a
                          href={drawing.spotifyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-green-500 text-white rounded-full hover:`bg-green-600 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#fff"/>
                          </svg>
                        </a>
                        
                        {drawing.appleMusicLink && (
                          <a
                            href={drawing.appleMusicLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Apple Music"
                          >
                            <Image src="/apple_music_logo.png" alt="Apple Music" width={12} height={12} style={{ borderRadius: '3px' }} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* 텍스트 내용 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className={`text-lg font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {drawing.title}
                      </h3>
                      <div className="flex items-center gap-2 pb-1 flex-shrink-0">
                        {drawing.spotifyLink && (
                          <a
                            href={drawing.spotifyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Spotify"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#22c55e"/>
                            </svg>
                          </a>
                        )}
                        {drawing.appleMusicLink && (
                          <a
                            href={drawing.appleMusicLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Apple Music"
                          >
                            <Image src="/apple_music_logo.png" alt="Apple Music" width={12} height={12} style={{ borderRadius: '3px' }} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className={`text-xs mb-3 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {drawing.artist} • {drawing.album} • {drawing.how}
                    </div>
                    
                    <p className={`text-xs leading-relaxed mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {drawing.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Hobbies;