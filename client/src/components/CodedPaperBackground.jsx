import React from 'react';

/**
 * Procedural Crumpled Parchment Paper generated entirely in SVG & CSS
 * No external photos/images used!
 * Recreates the exact folds, creases, lighting, and fiber texture from Image 2.
 */
export default function CodedPaperBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none bg-[#e8deca]">
      
      {/* Base Paper Tone Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 45% 40%, #f7f1df 0%, #ede2c7 45%, #e1d3b2 85%, #d4c29d 100%)',
        }}
      />

      {/* SVG Procedural Creases, Folds & Tactile Fiber Lighting */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-85" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <defs>
          {/* Paper Micro-Texture & Wrinkle Lighting Filter */}
          <filter id="paper-wrinkle-filter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.015 0.02" 
              numOctaves="5" 
              seed="42" 
              result="noise" 
            />
            {/* Diffuse Lighting to create genuine 3D paper wrinkles */}
            <feDiffuseLighting 
              in="noise" 
              lightingColor="#ffffff" 
              surfaceScale="4.5" 
              diffuseConstant="1.2" 
              result="light"
            >
              <feDistantLight azimuth="55" elevation="45" />
            </feDiffuseLighting>
            <feBlend mode="multiply" in="SourceGraphic" in2="light" result="paperWithWrinkles" />
          </filter>

          {/* Micro Paper Grain Filter */}
          <filter id="paper-fiber-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="grain" />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.07 0" />
          </filter>

          {/* Crease Gradients for sharp folds */}
          <linearGradient id="crease-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7a623f" stopOpacity="0.32" />
            <stop offset="48%" stopColor="#8c734e" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#4d381c" stopOpacity="0.45" />
            <stop offset="52%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8c734e" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="crease-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5f4625" stopOpacity="0.35" />
            <stop offset="49%" stopColor="#3d2a13" stopOpacity="0.4" />
            <stop offset="51%" stopColor="#fff8e8" stopOpacity="0.6" />
            <stop offset="65%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#947a54" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="crease-grad-3" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#664d2d" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#856b46" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Paper Surface with Procedural Wrinkles */}
        <rect 
          width="100%" 
          height="100%" 
          fill="#ede3cb" 
          filter="url(#paper-wrinkle-filter)" 
        />

        {/* Major Diagonal Fold Line (matching Image 2 prominent diagonal crease) */}
        <path 
          d="M -50,180 Q 280,310 520,290 T 1000,430 L 1250,560 L 1250,600 L -50,220 Z" 
          fill="url(#crease-grad-1)" 
          style={{ mixBlendMode: 'multiply' }}
        />

        {/* Highlight Ridge along the main diagonal fold */}
        <path 
          d="M -50,178 Q 280,308 520,288 T 1000,428 L 1250,558" 
          stroke="#fffaf0" 
          strokeWidth="3.5" 
          strokeLinecap="round"
          filter="blur(1px)"
          opacity="0.75"
        />

        {/* Secondary Cross Creases */}
        <path 
          d="M 450,-30 L 580,350 L 710,830 L 670,830 L 540,350 L 410,-30 Z" 
          fill="url(#crease-grad-2)" 
          style={{ mixBlendMode: 'multiply' }}
        />

        <path 
          d="M 580,348 L 710,828" 
          stroke="#ffffff" 
          strokeWidth="2.5" 
          opacity="0.6"
          filter="blur(1px)"
        />

        {/* Crinkle Facets & Fold Shadows */}
        <polygon 
          points="150,100 480,290 280,480 80,310" 
          fill="#94774e" 
          opacity="0.12" 
          style={{ mixBlendMode: 'multiply' }} 
        />
        <polygon 
          points="520,290 850,210 1020,440 680,460" 
          fill="#ffffff" 
          opacity="0.18" 
          style={{ mixBlendMode: 'screen' }} 
        />
        <polygon 
          points="480,290 680,460 520,720 280,480" 
          fill="#785c34" 
          opacity="0.14" 
          style={{ mixBlendMode: 'multiply' }} 
        />

        {/* Organic Crumple Crease Veins */}
        <path 
          d="M 80,310 Q 180,420 280,480 T 420,670" 
          stroke="#422f17" 
          strokeWidth="1.8" 
          fill="none" 
          opacity="0.3" 
          style={{ mixBlendMode: 'multiply' }}
        />
        <path 
          d="M 82,312 Q 182,422 282,482 T 422,672" 
          stroke="#ffffff" 
          strokeWidth="1.2" 
          fill="none" 
          opacity="0.45"
        />

        <path 
          d="M 850,210 Q 760,330 680,460 T 520,720" 
          stroke="#4d371d" 
          strokeWidth="2" 
          fill="none" 
          opacity="0.32" 
          style={{ mixBlendMode: 'multiply' }}
        />
        <path 
          d="M 852,208 Q 762,328 682,458 T 522,718" 
          stroke="#ffffff" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.5"
        />

        {/* Fine Paper Fiber Grain overlay */}
        <rect width="100%" height="100%" filter="url(#paper-fiber-grain)" />
      </svg>

      {/* Layer of realistic CSS Fold Gradients */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(125deg, transparent 40%, rgba(95, 70, 35, 0.22) 48%, rgba(255,255,255,0.35) 50%, transparent 56%),
            linear-gradient(55deg, transparent 42%, rgba(80, 55, 25, 0.18) 49%, rgba(255,255,255,0.25) 51%, transparent 58%),
            linear-gradient(190deg, transparent 35%, rgba(100, 75, 40, 0.15) 45%, transparent 60%)
          `,
        }}
      />

      {/* Realistic Antique Paper Edge Burn & Vignette */}
      <div 
        className="absolute inset-0" 
        style={{
          boxShadow: 'inset 0 0 120px rgba(90, 60, 25, 0.35), inset 0 0 250px rgba(60, 40, 15, 0.25)',
        }}
      />
    </div>
  );
}

