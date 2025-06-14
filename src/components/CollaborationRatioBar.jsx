import React, { useState } from 'react';

const CollaborationRatioBar = ({ darkMode = false }) => {
  
  const [hoveredSection, setHoveredSection] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const collaborationData = [
    { institution: 'KAIST', institution_full: 'KAIST', count: 4, color: 'from-sky-400 to-indigo-400', lightColor: 'bg-sky-100', darkColor: 'bg-indigo-600 text-white' },
    { institution: 'CMU', institution_full: 'Carnegie Mellon University', count: 3, color: 'from-rose-400 to-orange-400', lightColor: 'bg-rose-100', darkColor: 'bg-orange-600 text-white' },
    { institution: 'UMass Amherst', institution_full: 'University of Massachusetts Amherst', count: 2, color: 'from-emerald-400 to-teal-400', lightColor: 'bg-emerald-100', darkColor: 'bg-teal-600 text-white' },
    { institution: 'WashU', institution_full: 'Washington University in St. Louis', count: 1, color: 'from-pink-400 to-fuchsia-400', lightColor: 'bg-pink-100', darkColor: 'bg-fuchsia-600 text-white' },
    { institution: 'HBS', institution_full: 'Harvard Business School', count: 1, color: 'from-yellow-400 to-amber-400', lightColor: 'bg-yellow-100', darkColor: 'bg-amber-600 text-gray-900' },
    { institution: 'BC', institution_full: 'Boston College', count: 1, color: 'from-violet-400 to-purple-400', lightColor: 'bg-violet-100', darkColor: 'bg-purple-600 text-white' },
  ];

  const totalCount = collaborationData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="relative">
      {/* Main Progress Bar */}
      <div className="relative mt-2.5 mb-8">
        <div className={`mx-0.5 h-6 rounded-lg overflow-hidden shadow-lg border ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-100'} flex relative`}>
          {collaborationData.map((item, index) => {
            const percentage = (item.count / totalCount) * 100;
            return (
              <div
                key={item.institution}
                className={`h-full bg-gradient-to-r ${item.color} cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-105 flex items-center justify-center relative group`}
                style={{ width: `${percentage}%` }}
                onMouseEnter={(e) => {
                    setHoveredSection(item);
                    const rect = e.currentTarget.getBoundingClientRect();
                    const containerRect = e.currentTarget.offsetParent.getBoundingClientRect();
                    setTooltipPosition({
                      x: rect.right - containerRect.left - (rect.width / 2),
                      y: rect.top - containerRect.top, // container 기준 상대 좌표로 조정
                    });
                  }}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {percentage > 8 && (
                  <span className="text-white font-semibold text-xs drop-shadow-sm">{item.institution}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute -top-5.5 right-0 flex gap-3 mr-3.5">
          <div className="flex items-center space-x-1 cursor-pointer transition-all duration-200 relative">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-400 shadow-sm mb-0.5"></div>
            <span style={{ fontSize: '12px' }} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Affiliations of Collaborators</span>
          </div>
        </div>
           {/* <div className="absolute -top-5 right-0 flex gap-3">
          {collaborationData.map((item, index) => (
            <div
              key={item.institution}
              className={`flex items-center space-x-1 cursor-pointer transition-all duration-200 relative`}
            >
              <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${item.color} shadow-sm`}></div>
              <span style={{ fontSize: '10px' }} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.institution}</span>
            </div>
          ))}
        </div> */}
        
        
      </div>

      {/* Tooltip (only one) */}
      
      {hoveredSection && (
        <div
          className="absolute z-50 pointer-events-none transform -translate-x-1/2"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 75}px`,
          }}
        >
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 px-4.5 py-2 whitespace-nowrap relative text-center">
            <span className="text-sm font-semibold text-gray-800 font-pretendards">{hoveredSection.institution_full}</span>
            <br/>
            <span className="text-xs text-gray-600 mt-0.5 font-pretendards">
              {hoveredSection.count} collaborators
              ({((hoveredSection.count / totalCount) * 100).toFixed(1)}%)
            </span>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default CollaborationRatioBar;
