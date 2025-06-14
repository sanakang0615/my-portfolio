"use client"
import React from 'react';
import Link from 'next/link';
import { Palette, ExternalLink, Music, Play, Youtube, Apple, Gamepad2, Map } from 'lucide-react';
import AppLayout from '../AppLayout';
import { Users, Calendar, Code, FileText } from 'lucide-react';

const Hobbies = () => {
  const hobbiesNavItems = [
    { id: 'drawings', label: 'Drawings', icon: Palette },
    { id: 'travel', label: 'Travel', icon: Map },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'games', label: 'Games', icon: Gamepad2 },
  ];

  const aboutNavItems = [
    { id: 'about', label: 'About Me', icon: Users },
    { id: 'news', label: 'News', icon: Calendar },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'publications', label: 'Publications', icon: FileText },
  ];

  return (
    <AppLayout navItems={hobbiesNavItems} sidebarTitle="HOBBIES">
      {({ darkMode }) => {
        const drawings = [
          {
            id: 1,
            image: "/drawing-3.jpg",
            title: "Jigsaw Falling Into Place (2025)",
            artist: "Radiohead",
            album: "In Rainbows (2007)",
            how: "iPad Drawing",
            description: <>I drew this on a bed in <a href="https://en.wikipedia.org/wiki/Pittsburgh" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Pittsburgh</a>.</>,
            spotifyLink: "https://open.spotify.com/track/0YJ9FWWHn9EfnN0lHwbzvV",
            youtubeLink: "https://www.youtube.com/watch?v=GoLJJRIWCLU&ab_channel=Radiohead",
            appleMusicLink: "https://music.apple.com/us/album/jigsaw-falling-into-place/1109714933?i=1109715469"
          },
          {
            id: 2,
            image: "/drawing-7.png",
            title: "February (2022)",
            artist: "Thornapple",
            album: "Enlightenment (2019)",
            how: "Pen Sketch",
            description: <>I drew this at the <a href="https://www.royalgrandpalace.th/en/home" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Bangkok Grand Palace</a>.
            Inspired by the <a href="https://www.renown-travel.com/daytripsbangkok/grandpalacemurals.html" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Ramakien Murals</a> there.</>,
            spotifyLink: "https://open.spotify.com/track/5jjhXS0mIHHxyclG71WN8y",
            youtubeLink: "https://www.youtube.com/watch?v=z5L5qsVMBAw&ab_channel=Thornapple-Topic",
            appleMusicLink: "https://music.apple.com/us/album/february/1470906820?i=1470906823"
          },
          {
            id: 3,
            image: "/drawing-4.jpg",
            title: "Powder Blue (2023)",
            artist: "The Black Skirts",
            album: "Teen Troubles (2022)",
            how: "Pen Sketch",
            description: <>I drew this at the <a href="https://etk.srail.kr/main.do" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>train</a> 
            {' '} back to <a href="https://en.wikipedia.org/wiki/Busan" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Busan, South Korea.</a></>,
            spotifyLink: "https://open.spotify.com/track/3tF7QjqwiaHpdSfZcnbnbV",
            youtubeLink: "https://www.youtube.com/watch?v=k6Ys3M5xNWQ&ab_channel=TheBlackSkirts-Topic",
            appleMusicLink: "https://music.apple.com/us/album/powder-blue/1644821406?i=1644821660"
          },
          {
            id: 4,
            image: "/drawing-1.jpg",
            title: "Chlorine (2022)",
            artist: "Twenty One Pilots",
            album: "Trench (2018)",
            how: "iPad Drawing",
            description: <>I drew this on my desk in my room when I returned to my hometown in <a href="https://en.wikipedia.org/wiki/Busan" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Busan</a>  during winter break.</>,
            spotifyLink: "https://open.spotify.com/track/23OXdR7YuUBVWh5hSnYJau",
            youtubeLink: "https://www.youtube.com/watch?v=eJnQBXmZ7Ek&ab_channel=twentyonepilots",
            appleMusicLink: "https://music.apple.com/us/album/chlorine/1422828208?i=1422828214"
          },
          {
            id: 5,
            image: "/drawing-5.jpg",
            title: "Supermassive Black Hole (2022)",
            artist: "Muse",
            album: "Black Holes and Revelations (2006)",
            how: "iPad Drawing",
            description: <>I also drew this on my desk in my room when I returned to my hometown in <a href="https://en.wikipedia.org/wiki/Busan" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Busan</a> during winter break.</>,
            spotifyLink: "https://open.spotify.com/track/3lPr8ghNDBLc2uZovNyLs9",
            youtubeLink: "https://www.youtube.com/watch?v=Xsp3_a-PMTw&ab_channel=Muse",
            appleMusicLink: "https://music.apple.com/us/album/supermassive-black-hole/992221994?i=992221997"
          },
          {
            id: 6,
            image: "/drawing-6.jpg",
            title: "The Less I Know the Better (2023)",
            artist: "Tame Impala",
            album: "Currents (2015)",
            how: "iPad Drawing",
            description: <>I drew this while studying in an empty classroom during a break at <a href="https://en.wikipedia.org/wiki/KAIST" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>KAIST</a> in <a href="https://en.wikipedia.org/wiki/Daejeon" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-semibold`}>Daejeon</a>.</>,
            spotifyLink: "https://open.spotify.com/track/6K4t31amVTZDgR3sKmwUJJ",
            youtubeLink: "https://www.youtube.com/watch?v=2SUwOgmvzK4&ab_channel=tameimpalaVEVO",
            appleMusicLink: "https://music.apple.com/us/album/the-less-i-know-the-better/1440838039?i=1440838488"
          }
        ];

        return (
          <>
            {/* Hero Section - 심플하고 모던하게 */}
            <div className={`relative rounded-2xl mb-16 p-6 md:p-12 max-w-5xl mx-auto ${
              darkMode 
                ? 'bg-gray-900/50 border border-gray-800' 
                : 'bg-gray-50/80 border border-gray-100'
            }`}>
              <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 justify-center">
                <div className="max-w-lg">
                  <h1 className={`text-5xl font-light mb-8 tracking-tight ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Music to be<br/>
                    <span className="font-medium">Drawn by</span>
                  </h1>
                  
                  <div className={`space-y-3 text-base leading-normal mb-8 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <p className="font-pretendard">
                      This is a collection of drawings inspired by music. The project is called 
                      <span className="font-medium"> "Music to be drawn by"</span>, a small reference 
                      to Alfred Hitchcock's <span className="font-medium">"Music to be murdered by"</span>.
                    </p>
                    <p className="font-pretendard">
                      I started drawing during the COVID-19 pandemic. I've never learned it professionally, 
                      but it became something I really enjoyed. I usually draw while listening to one song on repeat. 
                      The drawing shows how that song makes me feel that day.
                    </p>
                    <p className="font-pretendard">
                      One of the best things about this hobby is that it helped me appreciate all kinds of emotions — 
                      not just joy or excitement, but also calmness and even sadness. Whatever I'm feeling that day 
                      becomes a valuable ingredient for capturing the mood in my drawing.
                    </p>
                  </div>

                  <a
                    href="https://musicdrawnby.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 px-3 py-1.5 pt-2 font-pretendard rounded-xl font-sm transition-all duration-200 ${
                      darkMode 
                        ? 'bg-white text-gray-900 hover:`bg-gray-100' 
                        : 'bg-gray-900 text-white hover:`bg-gray-800'
                    }`}
                  >
                    <span className="font-pretendard">Visit the website</span>
                    <ExternalLink className="w-4 h-4 mb-1.5 pr-0.5" />
                  </a>
                </div>
                
                <div className="flex-shrink-0 hidden lg:block">
                  <div className={`p-1 rounded-2xl mt-30 ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <img 
                      src="/my_photo_7.png" 
                      alt="Sana Kang" 
                      className="w-72 h-96 object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Drawings Gallery - 그리드 간소화 */}
            <section id="drawings" className="mt-8 mb-16">
              <h2 className={`text-3xl font-light mb-12 font-pretendard text-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Some of my drawings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-10">
                {drawings.map((drawing) => (
                  <div key={drawing.id} className="group">
                    {/* 이미지 */}
                    <div className="relative mb-4 overflow-hidden rounded-xl">
                      <img 
                        src={drawing.image} 
                        alt={drawing.title} 
                        className="w-full h-72 object-cover transition-transform duration-300 group-hover:`scale-105"
                      />
                      
                      {/* 호버 시 스포티파이 버튼 */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:`opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex items-center gap-4 ">
                          <a
                            href={drawing.spotifyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-green-500 text-white rounded-full hover:`bg-green-600 transition-colors"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                              <img src="/apple_music_logo.png" alt="Apple Music" width="20" height="20" style={{ borderRadius: '5px' }} />
                            </a>
                          )}
                          {drawing.youtubeLink && (
                            <a
                              href={drawing.youtubeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-red-500 text-white rounded-full hover:`bg-red-600 transition-colors"
                            >
                              <Youtube className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* 텍스트 내용 */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className={`text-xl font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {drawing.title}
                        </h3>
                        <div className="flex items-center gap-2 pb-1">
                          {drawing.spotifyLink && (
                            <a
                              href={drawing.spotifyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Spotify"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#22c55e"/>
                              </svg>
                            </a>
                          )}
                          {drawing.youtubeLink && (
                            <a
                              href={drawing.youtubeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="YouTube"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.36 0 12 0 12s0 3.64.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.772 20.5 12 20.5 12 20.5s7.228 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.64 24 12 24 12s0-3.64-.502-5.814z" fill="#ff0000"/>
                                <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff"/>
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
                              <img src="/apple_music_logo.png" alt="Apple Music" width="16" height="16" style={{ borderRadius: '3px' }} />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <div className={`text-sm mb-3 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {drawing.artist} • {drawing.album} • {drawing.how}
                      </div>
                      
                      <p className={`text-sm leading-relaxed mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {drawing.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>


          </>
        );
      }}
    </AppLayout>
  );
};

export default Hobbies;