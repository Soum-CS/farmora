import React from 'react';

const MascotSVG = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="100" cy="100" r="90" fill="#E0F2FE" />
      <circle cx="150" cy="120" r="40" fill="#3B82F6" fillOpacity="0.2" />
      
      {/* Body / Hoodie */}
      <path 
        d="M40 180C40 150 60 120 100 120C140 120 160 150 160 180V200H40V180Z" 
        fill="#EF4444" 
      />
      <path 
        d="M100 120C80 120 65 135 65 155C65 175 80 190 100 190C120 190 135 175 135 155C135 135 120 120 100 120Z" 
        fill="#DC2626" 
      />
      
      {/* Head */}
      <rect x="75" y="60" width="50" height="60" rx="25" fill="#FFB086" />
      <path d="M75 85C75 71.1929 86.1929 60 100 60C113.807 60 125 71.1929 125 85V95H75V85Z" fill="#334155" />
      
      {/* Face */}
      <rect x="85" y="85" width="4" height="6" rx="2" fill="#334155" />
      <rect x="111" y="85" width="4" height="6" rx="2" fill="#334155" />
      <path d="M90 105C90 105 95 110 100 110C105 110 110 105 110 105" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      
      {/* Headphones */}
      <rect x="70" y="80" width="8" height="20" rx="4" fill="white" />
      <rect x="122" y="80" width="8" height="20" rx="4" fill="white" />
      <path d="M74 80C74 65.6406 85.6406 54 100 54C114.359 54 126 65.6406 126 80" stroke="white" strokeWidth="4" fill="none" />

      {/* Verified Badge */}
      <rect x="50" y="110" width="40" height="15" rx="4" fill="white" shadow="0 2px 4px rgba(0,0,0,0.1)" />
      <text x="62" y="121" fill="#1E40AF" style={{ fontSize: '6px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>Verified</text>
      <path d="M55 115L57 117L60 114" stroke="#3B82F6" strokeWidth="1" />
    </svg>
  );
};

export default MascotSVG;
