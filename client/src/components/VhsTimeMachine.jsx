import React, { useState } from 'react';

export default function VhsTimeMachine() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={`px-3 py-1.5 rounded-full font-mono text-[10px] tracking-widest uppercase transition-all duration-300 backdrop-blur-md flex items-center gap-2 cursor-pointer ${
            isActive
              ? 'bg-neutral-950/90 text-stone-200 border border-stone-600/50 shadow-md'
              : 'bg-neutral-950/40 hover:bg-neutral-950/80 text-stone-400 hover:text-stone-200 border border-white/10'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-stone-500'}`} />
          <span>1990</span>
        </button>
      </div>

      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden animate-fade-in">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 1px, transparent 1px, transparent 2px)',
              backgroundSize: '100% 2px',
            }}
          />

          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.4)]" />
          <div className="absolute inset-0 bg-[#fde047]/[0.02] mix-blend-color" />

          <div className="absolute top-6 left-6 font-mono text-[10px] text-white/60 tracking-[0.2em] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/90 animate-pulse" />
            <span>REC</span>
            <span className="opacity-30">•</span>
            <span>1990</span>
          </div>
        </div>
      )}
    </>
  );
}
