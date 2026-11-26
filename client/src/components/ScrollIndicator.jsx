import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'hero-video', label: 'Video' },
  { id: 'terrace-classic', label: 'Carousel' },
  { id: 'collection', label: 'Products' },
  { id: 'craftsmanship', label: 'Details' },
  { id: 'story', label: 'About Us' },
];

export default function ScrollIndicator({ isVisible = true }) {
  const [activeId, setActiveId] = useState('hero-video');

  useEffect(() => {
    const handleScroll = () => {
      // Offset by 40% of viewport height to capture active section at scroller's vertical center
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top - 40) {
            setActiveId(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero video (#hero-video) and Footer (#story) are dark backgrounds;
  // Carousel, Products, and Details are light linen/ecru backgrounds.
  const isDarkSection = activeId === 'hero-video' || activeId === 'story';

  return (
    <aside 
      aria-label="Section navigation"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end select-none pointer-events-auto"
    >
      {/* 100% Transparent Container (No background box/capsule) */}
      <div className="bg-transparent flex flex-col items-end gap-4 p-1">
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;

          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="group flex items-center justify-end gap-2.5 cursor-pointer py-1 text-right focus:outline-none transition-all"
              title={`Scroll to ${section.label}`}
            >
              {/* Section Label: Adapts dynamically so it is always 100% visible on dark or light background */}
              <span
                className={`text-[10px] font-sans uppercase tracking-[0.16em] transition-all duration-300 ${
                  isActive
                    ? isDarkSection
                      ? 'text-yellow-400 font-bold opacity-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] translate-x-0'
                      : 'text-neutral-950 font-bold opacity-100 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] translate-x-0'
                    : isDarkSection
                      ? 'text-stone-300 font-medium opacity-60 group-hover:opacity-100 group-hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] translate-x-0.5'
                      : 'text-stone-500 font-medium opacity-70 group-hover:opacity-100 group-hover:text-neutral-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] translate-x-0.5'
                }`}
              >
                {section.label}
              </span>

              {/* Indicator Dash: Adapts dynamically with high-contrast colors & shadows */}
              <span
                className={`block rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? isDarkSection
                      ? 'w-8 h-[2.5px] bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.9)]'
                      : 'w-8 h-[2.5px] bg-neutral-950 shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
                    : isDarkSection
                      ? 'w-3 h-[2px] bg-white/40 shadow-[0_1px_2px_rgba(0,0,0,0.8)] group-hover:w-6 group-hover:bg-white'
                      : 'w-3 h-[2px] bg-stone-400/80 shadow-[0_1px_1px_rgba(255,255,255,0.8)] group-hover:w-6 group-hover:bg-neutral-900'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
