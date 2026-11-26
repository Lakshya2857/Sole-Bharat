import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="story" className="bg-neutral-950 text-stone-400 py-12 sm:py-14 border-t border-stone-800/80 selection:bg-yellow-300 selection:text-black font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up" duration={600}>
          
          {/* Minimal Top Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-800/80">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-6 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
                  <img 
                    src="/assets/shoes_png/sole-bharat-maroon.png" 
                    alt="Sole Bharat Side View Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <span className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-tight">
                  Sole Bharat
                </span>
                <span className="text-[11px] font-sans text-stone-500 uppercase tracking-widest">
                  1990
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1.5 font-sans">
                Founded by <span className="text-stone-200 font-medium">Lakshya</span> • Bhiwani, Haryana. Authentic 1990 Indian terrace footwear.
              </p>
            </div>

            {/* Clean Horizontal Navigation */}
            <nav className="flex flex-wrap items-center gap-6 text-xs text-stone-400 font-medium uppercase tracking-wider">
              <button 
                onClick={() => scrollTo('hero-video')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Top
              </button>
              <button 
                onClick={() => scrollTo('collection')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Collection
              </button>
              <button 
                onClick={() => scrollTo('terrace-classic')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                3D Archive
              </button>
              <button 
                onClick={() => scrollTo('craftsmanship')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Craftsmanship
              </button>
              <button 
                onClick={() => scrollTo('story')}
                className="text-stone-200 hover:text-white transition-colors cursor-pointer"
              >
                About Us
              </button>
            </nav>
          </div>

          {/* Minimal Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3">
            <p>
              © 1990–{new Date().getFullYear()} Sole Bharat Footwear Co. Founded by Lakshya (Bhiwani, Haryana).
            </p>
            <p className="text-stone-400 uppercase tracking-widest text-[10px]">
              100% Genuine Full-Grain Leather // Finished in Bharat
            </p>
          </div>

        </ScrollReveal>
      </div>
    </footer>
  );
}
