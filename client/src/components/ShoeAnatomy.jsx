import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function ShoeAnatomy() {
  const [activeHotspot, setActiveHotspot] = useState(0);
  const [selectedColorway, setSelectedColorway] = useState('maroon');

  const colorwayImages = {
    maroon: '/assets/shoes_png/sole-bharat-maroon.png',
    blue: '/assets/shoes_png/sole-bharat-blue.png',
    green: '/assets/shoes_png/sole-bharat-green.png',
    brown: '/assets/shoes_png/sole-bharat-brown.png',
  };

  const hotspots = [
    {
      id: 0,
      title: 'Debossed Suede Heel Counter',
      tag: 'HOT-STAMPED BRANDING',
      desc: 'Heat-pressed "SOLE BHARAT" branding debossed onto premium rough-out suede with contrast cross-stitched heel reinforcements.',
      pos: 'top-[52%] left-[18%]',
    },
    {
      id: 1,
      title: 'Hand-Embroidered Morse Stitches',
      tag: 'TRIBAL MORSE DETAILING',
      desc: 'Heavyweight waxed thread hand-sewn along the lower quarter in signature Morse-code rhythm, celebrating indigenous craftsmanship.',
      pos: 'top-[65%] left-[45%]',
    },
    {
      id: 2,
      title: 'Retro Wave Leather Stripe',
      tag: 'COLORED LEATHER PANEL',
      desc: 'Cut from premium dyed hide with subtle gold "S" crest emblem, providing structural midfoot arch lockdown.',
      pos: 'top-[50%] left-[42%]',
    },
    {
      id: 3,
      title: 'Detachable Brass "SB" Charm',
      tag: 'METALLIC CHARM JEWELRY',
      desc: 'Solid brass ball-chain carrying the custom die-cast "SB" monogram charm, hanging effortlessly through antique brass eyelets.',
      pos: 'top-[44%] left-[60%]',
    },
    {
      id: 4,
      title: 'Perforated Tumbled Leather Toe',
      tag: 'CLIMATE VENTILATION',
      desc: 'Full-grain tumbled ecru cowhide with radial punch-hole perforations engineered to release heat in hot Indian climates.',
      pos: 'top-[52%] left-[78%]',
    },
    {
      id: 5,
      title: 'Translucent Amber Gum Sole',
      tag: 'TERRACE TRACTION',
      desc: 'Vulcanized natural gum cupsole featuring micro-groove siping for zero slip on Indian stone, asphalt, and marble tiles.',
      pos: 'top-[78%] left-[50%]',
    },
  ];

  return (
    <section id="craftsmanship" className="py-20 sm:py-28 bg-[#faf8f5] border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500 block mb-2">
              Artisan Craftsmanship
            </span>
            <h2 
              className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-neutral-900"
            >
              Crafted To Be Passed Down
            </h2>
            <p className="font-sans text-sm text-stone-600 mt-3 leading-relaxed">
              No synthetic shortcuts. Every curve, stitch, and brass rivet is engineered to age gracefully with every wear.
            </p>
          </div>
        </ScrollReveal>

        {/* Minimalist Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Visual Display */}
          <div className="lg:col-span-7 relative">
            <ScrollReveal animation="fade-right" duration={800} delay={100}>
              <div className="relative rounded-3xl bg-[#f4f0eb] p-6 sm:p-10 border border-stone-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden">
                
                {/* Color Switcher Bar */}
                <div className="flex items-center justify-between pb-4 mb-2 border-b border-stone-300/50">
                  <span className="font-sans text-xs font-medium uppercase text-stone-600 tracking-wider">
                    Select Detail
                  </span>
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'maroon', hex: '#5b1b29', name: 'Maroon' },
                      { id: 'blue', hex: '#3b7b9e', name: 'Blue' },
                      { id: 'green', hex: '#435e49', name: 'Green' },
                      { id: 'brown', hex: '#4a3326', name: 'Brown' },
                    ].map((col) => (
                      <button
                        key={col.id}
                        onClick={() => setSelectedColorway(col.id)}
                        className={`w-4 h-4 rounded-full transition-all cursor-pointer ${
                          selectedColorway === col.id
                            ? 'scale-125 ring-2 ring-neutral-900'
                            : 'opacity-70 hover:opacity-100 hover:scale-110'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={`View ${col.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* The Shoe Image */}
                <div className="relative aspect-[16/10] w-full flex items-center justify-center p-4">
                  <img 
                    src={colorwayImages[selectedColorway] || colorwayImages.maroon} 
                    alt="Sole Bharat Anatomy" 
                    className="w-full h-full object-contain drop-shadow-lg transition-all duration-300"
                  />

                  {/* Interactive Hotspot Pins */}
                  {hotspots.map((spot, idx) => (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(idx)}
                      className={`absolute ${spot.pos} transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full font-sans text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                        activeHotspot === idx
                          ? 'bg-neutral-900 text-white scale-125 shadow-md ring-4 ring-neutral-900/15 z-20'
                          : 'bg-white/90 text-neutral-800 border border-stone-300 hover:scale-110 shadow-sm z-10'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Active Inspection Card */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal animation="fade-left" duration={800} delay={200}>
              <div className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                
                <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
                  <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                    Feature 0{activeHotspot + 1} of 06
                  </span>
                  <span className="text-xs font-sans text-amber-800 font-medium">
                    Archival Build
                  </span>
                </div>

                <h3 
                  className="text-2xl sm:text-3xl font-serif font-medium text-neutral-900 mt-4 leading-snug"
                >
                  {hotspots[activeHotspot].title}
                </h3>

                <p className="font-sans text-sm text-stone-600 mt-3 leading-relaxed font-normal">
                  {hotspots[activeHotspot].desc}
                </p>

                {/* Hotspot Quick Jump Bar */}
                <div className="mt-8 pt-5 border-t border-stone-100">
                  <span className="font-sans text-xs text-stone-500 uppercase tracking-wider block mb-2.5 font-medium">
                    Inspect components:
                  </span>
                  <div className="grid grid-cols-6 gap-2">
                    {hotspots.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveHotspot(i)}
                        className={`py-2 rounded-xl font-sans text-xs font-medium border transition-all cursor-pointer ${
                          activeHotspot === i
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        0{i + 1}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Minimal Indian Craftsmanship Guarantee */}
              <div className="p-4 rounded-2xl bg-[#f4f0eb] border border-stone-200/70 flex items-center justify-between">
                <span className="font-sans text-xs text-stone-700 font-medium">
                  Handcrafted in Bharat • 100% Genuine Full-Grain Hide
                </span>
                <span className="text-xs font-serif font-semibold text-neutral-900">
                  Est. 1990
                </span>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
