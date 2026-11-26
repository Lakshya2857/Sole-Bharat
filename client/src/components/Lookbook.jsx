import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Lookbook({ onSelectShoe }) {
  const lookbookItems = [
    {
      id: 'look-1',
      title: 'Terrace Afternoon // New Delhi',
      shoe: 'Heritage Maroon',
      img: '/assets/shoes_png/sole-bharat-maroon.png',
      quote: '"The maroon wave stripe cuts through neutral denim like a sharp 90s record sleeve."',
    },
    {
      id: 'look-2',
      title: 'Monsoon Chai Run // Mumbai',
      shoe: 'Retro Azure',
      img: '/assets/shoes_png/sole-bharat-blue.png',
      quote: '"The sky blue charm rattles against the eyelets with every step on the promenade."',
    },
    {
      id: 'look-3',
      title: 'Archival Library // Bengaluru',
      shoe: 'Vintage Olive',
      img: '/assets/shoes_png/sole-bharat-green.png',
      quote: '"Earthy sage green tones that feel equally right on college lawns or cafe corners."',
    },
    {
      id: 'look-4',
      title: 'Night Ride // Jaipur Old City',
      shoe: 'Mocha Gum',
      img: '/assets/shoes_png/sole-bharat-brown.png',
      quote: '"The deep cocoa collar and gum sole glow under tungsten streetlamps."',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#faf8f5] border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header: Clean & Minimal */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="border-b border-stone-200/80 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 block mb-2">
                Editorial Lookbook
              </span>
              <h2
                className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-neutral-900"
              >
                How Bharat Wears The '90
              </h2>
            </div>
            <p className="font-sans text-sm text-stone-600 max-w-md leading-relaxed">
              From Delhi alleyways to Mumbai promenades, documented on analog 35mm film rolls.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Lookbook Cards (Clean & Minimal with Staggered Scroll Reveal) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lookbookItems.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              animation="fade-up"
              delay={idx * 100}
              duration={700}
              className="h-full"
            >
              <div
                className="group rounded-2xl bg-white p-5 border border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all flex flex-col justify-between h-full"
              >
                <div>
                  {/* Clean Frame */}
                  <div className="relative aspect-[4/3] rounded-xl bg-[#f4f0eb] p-3 border border-stone-200/50 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="mt-4">
                    <span className="text-xs font-sans font-medium text-stone-500 uppercase tracking-widest block">
                      {item.shoe}
                    </span>
                    <h4 className="text-xl font-serif font-medium text-neutral-900 mt-1">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-editorial italic text-stone-700 mt-3 bg-[#faf8f5] p-3.5 rounded-xl border border-stone-200/60 leading-relaxed">
                      {item.quote}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
