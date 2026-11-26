import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete, autoExit = true, speed = 1 }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDone(true);
          return 100;
        }
        const jump = Math.max(1, Math.floor(Math.random() * 4 * speed + 1));
        const next = Math.min(100, prev + jump);
        if (next === 100) {
          setIsDone(true);
        }
        return next;
      });
    }, 35 / speed);

    return () => clearInterval(interval);
  }, [speed]);

  useEffect(() => {
    if (isDone && autoExit) {
      setIsExiting(true);
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [isDone, autoExit, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center select-none bg-[#f5f0e6] text-[#1a1918] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
      isExiting ? '-translate-y-full' : 'translate-y-0'
    }`}>
      
      {/* Clean Vintage Top Header */}
      <div className="absolute top-8 left-8 sm:left-12 flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-widest text-black/80">
        <span className="bg-black text-[#f5f0e6] px-3 py-1 rounded-md">AUTUMN / WINTER 1990</span>
        <span className="hidden sm:inline text-gray-500 font-medium">Terrace Edition</span>
      </div>

      {/* Main Centered Content Container matching 90s Vintage Typography */}
      <div className="relative z-10 flex flex-col items-start max-w-xl w-full px-8 sm:px-12">
        
        {/* Brand Name "Sole Bharat" */}
        <h1 
          className="font-black tracking-tight text-6xl sm:text-7xl md:text-8xl mb-3 text-black select-none uppercase leading-none font-display"
        >
          Sole Bharat
        </h1>

        {/* Loading Progress: Solid Rule Line + Percentage Counter */}
        <div className="w-full flex items-center justify-between gap-5 mt-1">
          
          {/* Guide Track */}
          <div className="relative flex-1 h-[6px] sm:h-[8px] bg-black/10 rounded-full overflow-hidden border border-black/20">
            <div 
              className="h-full rounded-full transition-all ease-out duration-75 bg-black"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Dynamic Percentage Text */}
          <div 
            className="text-black font-black text-3xl sm:text-4xl md:text-5xl tracking-normal min-w-[110px] text-right font-display"
          >
            {progress}%
          </div>
        </div>

        {/* Vintage Status Subtitle */}
        <div className="mt-5 flex items-center gap-2 font-sans text-xs text-gray-600 uppercase tracking-wider font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Opening 1990 Terrace Sneaker Archive</span>
        </div>

      </div>

      {/* Bottom Footer on Loading Screen */}
      <div className="absolute bottom-8 left-8 sm:left-12 right-8 sm:right-12 flex items-center justify-between font-sans text-xs text-gray-500 border-t border-black/15 pt-3">
        <span>Handcrafted In Bharat</span>
        <span>100% Full-Grain Tumbled Cowhide</span>
      </div>

    </div>
  );
}
