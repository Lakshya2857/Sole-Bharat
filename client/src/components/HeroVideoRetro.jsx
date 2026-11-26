import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight, RotateCw, Eye } from 'lucide-react';
import { SHOES_DATA } from '../data/shoes';
import CircularCarousel, { SOLE_BHARAT_CAROUSEL_ITEMS } from './CircularCarousel';
import ShoeViewer from './ShoeViewer';
import ScrollReveal from './ScrollReveal';

const SHOE_FRAMES = Array.from({ length: 20 }, (_, i) => `/shoe/${i + 1}.webp`);
const SOLE_FRAMES = Array.from({ length: 24 }, (_, i) => `/sole/${i + 1}.webp`);

export default function HeroVideoRetro({ onSelectShoe, onShopAll }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [selectedColorway, setSelectedColorway] = useState(SHOES_DATA[1]); // Default: Retro Azure (All-Blue Shoe)
  const [carouselPreset, setCarouselPreset] = useState('turn'); // 'turn' | 'cylinder' | 'orbit'
  const [frameType, setFrameType] = useState('upper'); // 'upper' | 'sole'
  const [targetIndex, setTargetIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    // Video loops continuously full screen
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;

    // Audio loops continuously in background
    audio.loop = true;
    audio.muted = false;

    // Start video & audio
    video.play().catch((err) => console.log('Video play:', err));
    audio.play().then(() => setIsAudioMuted(false)).catch(() => setIsAudioMuted(true));

    // Ensure audio unmutes on first user interaction if browser delayed unmuted sound
    const handleFirstGesture = () => {
      if (audio) {
        audio.muted = false;
        audio.play().then(() => setIsAudioMuted(false)).catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const toggleAudio = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (audio) {
      const nextMute = !isAudioMuted;
      audio.muted = nextMute;
      if (!nextMute && audio.paused) {
        audio.play().catch(() => {});
      }
      setIsAudioMuted(nextMute);
    }
  };

  const handleScrollToExplore = () => {
    const el = document.getElementById('terrace-classic');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectColorway = (shoe) => {
    setSelectedColorway(shoe);
    const idx = SOLE_BHARAT_CAROUSEL_ITEMS.findIndex((item) => item.colorwayId === shoe.id);
    if (idx !== -1) {
      setTargetIndex(idx);
    }
  };

  const handleCarouselItemClick = (item) => {
    if (item?.colorwayId) {
      const match = SHOES_DATA.find((s) => s.id === item.colorwayId);
      if (match) setSelectedColorway(match);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#faf8f5] border-b border-stone-200">
      
      {/* Background Audio Player: Loops permanently in background */}
      <audio
        ref={audioRef}
        src="/assets/video/sole_bharat.mp4?v=audio4"
        loop
        preload="auto"
      />

      {/* FULL-SCREEN HERO VIDEO (Loops Continuously • Immersive First View: True 100vh) */}
      <div id="hero-video" className="relative w-full h-screen min-h-[600px] bg-black overflow-hidden flex items-center justify-center border-b border-stone-200">
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          loop
          preload="auto"
          className="w-full h-full object-cover object-center select-none"
        >
          <source src="/assets/video/sole_bharat.mp4?v=video4" type="video/mp4" />
        </video>

        {/* Minimal Floating Glass Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white border border-white/20 transition-all font-sans text-xs shadow-lg active:scale-95 cursor-pointer"
          title={isAudioMuted ? 'Click to Unmute Audio' : 'Click to Mute Audio'}
        >
          {!isAudioMuted ? (
            <>
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-yellow-400 animate-pulse" />
                <span className="w-0.5 h-2 bg-yellow-400 animate-pulse" />
                <span className="w-0.5 h-2.5 bg-yellow-400 animate-pulse" />
              </span>
              <span className="text-xs font-semibold font-sans">Sound ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-xs font-semibold font-sans text-stone-300">Sound Muted</span>
            </>
          )}
        </button>

        {/* Minimal Scroll Down Cue */}
        <button
          onClick={handleScrollToExplore}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-all cursor-pointer animate-bounce group"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-medium drop-shadow group-hover:text-amber-200 transition-colors">
            Scroll to Explore
          </span>
          <svg className="w-4 h-4 text-stone-200 drop-shadow group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* SECTION BELOW VIDEO: Revealed smoothly on scroll */}
      <div id="terrace-classic" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-18 pb-8 sm:pb-12 relative z-10 scroll-mt-6">
        
        {/* Clean Headline & 3D Interactive Circular Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-14">
          
          {/* Left Column: Minimal Archival Typography */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-right" duration={800}>
              <span className="inline-block text-xs uppercase tracking-[0.2em] font-medium text-stone-500 mb-3">
                1990 Terrace Sneaker
              </span>
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-neutral-900 leading-[1.08]"
              >
                The Classic Terrace
              </h2>
              <p className="mt-5 text-sm sm:text-base font-sans text-stone-600 leading-relaxed font-normal max-w-md">
                Raw suede mudguards. Translucent amber gum rubber. Hand-stitched morse accents. 
                Engineered in Bharat with authentic 90s subculture heritage.
              </p>
              
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectShoe(selectedColorway)}
                  className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs uppercase tracking-wider font-semibold shadow-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
                </button>
                <button
                  onClick={onShopAll}
                  className="px-6 py-3 rounded-full bg-white hover:bg-stone-50 text-neutral-900 border border-stone-300 font-sans text-xs uppercase tracking-wider font-semibold shadow-sm hover:border-neutral-900 transition-all cursor-pointer"
                >
                  View All 4 Pairs
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3D Interactive Turntable / Carousel */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="scale-up" duration={850} delay={150}>
              <div className="rounded-3xl border border-stone-200/90 bg-[#f4f0eb] p-5 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col">
                
                <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
                  <span className="text-[11px] font-sans font-medium tracking-wider uppercase text-stone-600">
                    360° Turntable
                  </span>

                  <div className="flex items-center bg-white rounded-full p-0.5 border border-stone-200 text-[11px]">
                    <button
                      onClick={() => setCarouselPreset('turn')}
                      className={`px-2.5 py-0.5 font-sans font-medium rounded-full transition-all ${
                        carouselPreset === 'turn'
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'text-stone-500 hover:text-black'
                      }`}
                    >
                      360° Turn
                    </button>
                    <button
                      onClick={() => setCarouselPreset('cylinder')}
                      className={`px-2.5 py-0.5 font-sans font-medium rounded-full transition-all ${
                        carouselPreset === 'cylinder'
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'text-stone-500 hover:text-black'
                      }`}
                    >
                      Cylinder
                    </button>
                    <button
                      onClick={() => setCarouselPreset('orbit')}
                      className={`px-2.5 py-0.5 font-sans font-medium rounded-full transition-all ${
                        carouselPreset === 'orbit'
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'text-stone-500 hover:text-black'
                      }`}
                    >
                      Orbit
                    </button>
                  </div>
                </div>

                {carouselPreset === 'turn' ? (
                  /* Authentic 360° Rotating ShoeViewer with 20 / 24 frames */
                  <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[540px] rounded-2xl border border-stone-200/80 bg-gradient-to-b from-[#ffffff] via-[#f7f5f0] to-[#ece8e1] overflow-hidden my-3 shadow-inner flex flex-col items-center justify-center p-2 sm:p-4">
                    {/* Upper vs Gum Sole toggle */}
                    <div className="absolute top-3 right-3 z-30 flex items-center bg-white/90 backdrop-blur-md rounded-full p-0.5 border border-stone-200 text-[10px] shadow-xs">
                      <button
                        onClick={() => setFrameType('upper')}
                        className={`px-2.5 py-0.5 font-sans font-medium rounded-full transition-all ${
                          frameType === 'upper'
                            ? 'bg-neutral-900 text-white shadow-xs'
                            : 'text-stone-500 hover:text-black'
                        }`}
                      >
                        Upper (20f)
                      </button>
                      <button
                        onClick={() => setFrameType('sole')}
                        className={`px-2.5 py-0.5 font-sans font-medium rounded-full transition-all ${
                          frameType === 'sole'
                            ? 'bg-neutral-900 text-white shadow-xs'
                            : 'text-stone-500 hover:text-black'
                        }`}
                      >
                        Gum Sole (24f)
                      </button>
                    </div>

                    <ShoeViewer
                      frames={frameType === 'upper' ? SHOE_FRAMES : SOLE_FRAMES}
                      shadow={true}
                      aspectRatio="816 / 507"
                      autoPlay={false}
                      showControls={true}
                      className="w-full h-full max-h-[480px]"
                    />
                  </div>
                ) : (
                  /* 3D Circular Carousel Engine (Cylinder & Orbit) */
                  <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[540px] rounded-2xl border border-stone-300/40 bg-gradient-to-b from-[#18191f] via-[#101115] to-[#0a0a0d] overflow-hidden my-3 shadow-inner">
                    <div className="absolute top-3 left-3 z-20 pointer-events-none px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-sans font-medium text-stone-300">
                      Drag 360°
                    </div>

                    <CircularCarousel
                      items={SOLE_BHARAT_CAROUSEL_ITEMS}
                      preset={carouselPreset}
                      targetIndex={targetIndex}
                      cardWidth={275}
                      aspectRatio={1.22}
                      gap={20}
                      captions={true}
                      draggable={true}
                      autoplay="drift"
                      speed={12}
                      innerShade={0.5}
                      depthFade={0.65}
                      cornerRadius={16}
                      onItemClick={handleCarouselItemClick}
                      onChange={(idx) => {
                        const item = SOLE_BHARAT_CAROUSEL_ITEMS[idx];
                        if (item?.colorwayId) {
                          const match = SHOES_DATA.find((s) => s.id === item.colorwayId);
                          if (match && match.id !== selectedColorway.id) {
                            setSelectedColorway(match);
                          }
                        }
                      }}
                    />
                  </div>
                )}

                {/* Bottom Colorway Spec & Inspection Button */}
                <div className="pt-3 border-t border-stone-300/60 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-600 uppercase block font-medium font-sans tracking-wide">
                      {selectedColorway.shortName || selectedColorway.name}
                    </span>
                    <span className="text-2xl font-serif font-bold text-neutral-900">
                      ₹{selectedColorway.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectShoe(selectedColorway)}
                    className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs font-medium tracking-wide flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>View Shoe</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
                  </button>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* 4 Colorways Swatches Row (Staggered Scroll Reveal) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {SHOES_DATA.map((shoe, index) => {
            const isSelected = shoe.id === selectedColorway.id;
            return (
              <ScrollReveal 
                key={shoe.id} 
                animation="fade-up" 
                delay={index * 100} 
                duration={650}
              >
                <div
                  onClick={() => handleSelectColorway(shoe)}
                  className={`group cursor-pointer rounded-2xl bg-white p-4 border transition-all ${
                    isSelected
                      ? 'border-neutral-900 shadow-md ring-1 ring-neutral-900 -translate-y-1'
                      : 'border-stone-200/80 hover:border-stone-400 shadow-sm hover:-translate-y-0.5'
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-xl bg-[#f4f0eb] p-2 flex items-center justify-center overflow-hidden mb-3">
                    <img 
                      src={shoe.image} 
                      alt={shoe.name} 
                      className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-neutral-900 font-sans truncate">
                      {shoe.shortName}
                    </span>
                    <span className="text-xs font-sans text-stone-600 font-medium">
                      ₹{shoe.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
