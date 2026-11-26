'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { RotateCw, Play, Pause, Compass, Layers } from 'lucide-react';

/**
 * ShoeViewer: High-performance 360° interactive shoe turntable.
 * Supports touch/mouse dragging with inertial damping, image memory preloading,
 * radial ground shadow, degree HUD, and auto-spin controls.
 */
export default function ShoeViewer({
  frames = Array.from({ length: 20 }, (_, i) => `/shoe/${i + 1}.webp`),
  shadow = true,
  aspectRatio = '816 / 507',
  autoPlay = false,
  autoPlaySpeed = 80,
  dragSensitivity = 12,
  className = '',
  style = {},
  showControls = true,
  interactive = true,
  onFrameChange,
}) {
  const containerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Drag tracking refs
  const dragRef = useRef({
    startX: 0,
    startFrame: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
    animId: null,
  });

  const totalFrames = frames.length || 20;

  // Preload all frames into browser memory for zero-flicker dragging
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount += 1;
        setLoadProgress(Math.round((loadedCount / frames.length) * 100));
        if (loadedCount >= frames.length) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount += 1;
        if (loadedCount >= frames.length) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    });

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [frames]);

  // Set frame index safely with wrap-around
  const setFrameSafe = useCallback(
    (index) => {
      const normalized = ((Math.round(index) % totalFrames) + totalFrames) % totalFrames;
      setCurrentFrame(normalized);
      onFrameChange?.(normalized);
    },
    [totalFrames, onFrameChange]
  );

  // Auto-play loop
  useEffect(() => {
    if (!isPlaying || isDragging) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, autoPlaySpeed);

    return () => clearInterval(interval);
  }, [isPlaying, isDragging, totalFrames, autoPlaySpeed]);

  // Pointer drag interactions (Touch & Mouse unified)
  const handlePointerDown = (e) => {
    if (!interactive) return;
    // Only primary button
    if (e.button !== undefined && e.button !== 0) return;

    if (dragRef.current.animId) {
      cancelAnimationFrame(dragRef.current.animId);
    }

    setIsDragging(true);
    dragRef.current.startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragRef.current.startFrame = currentFrame;
    dragRef.current.lastX = dragRef.current.startX;
    dragRef.current.lastTime = performance.now();
    dragRef.current.velocity = 0;

    if (containerRef.current) {
      containerRef.current.setPointerCapture?.(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !interactive) return;

    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - dragRef.current.startX;
    const now = performance.now();
    const dt = Math.max(now - dragRef.current.lastTime, 1);
    const stepDelta = clientX - dragRef.current.lastX;

    // Calculate instantaneous velocity for inertia
    dragRef.current.velocity = (stepDelta / dt) * 0.45 + dragRef.current.velocity * 0.55;
    dragRef.current.lastX = clientX;
    dragRef.current.lastTime = now;

    // Map pixel drag to frame rotation
    const frameDelta = -Math.round(deltaX / dragSensitivity);
    setFrameSafe(dragRef.current.startFrame + frameDelta);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (containerRef.current && e?.pointerId) {
      try {
        containerRef.current.releasePointerCapture?.(e.pointerId);
      } catch (err) {}
    }

    // Apply smooth inertial deceleration
    let v = dragRef.current.velocity;
    if (Math.abs(v) > 0.15) {
      let accumulated = currentFrame;
      const decelerate = () => {
        v *= 0.92;
        accumulated -= v * 0.4;
        setFrameSafe(accumulated);

        if (Math.abs(v) > 0.04) {
          dragRef.current.animId = requestAnimationFrame(decelerate);
        }
      };
      dragRef.current.animId = requestAnimationFrame(decelerate);
    }
  };

  // Keyboard arrow step controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement === containerRef.current) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setFrameSafe(currentFrame - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setFrameSafe(currentFrame + 1);
        } else if (e.key === ' ') {
          e.preventDefault();
          setIsPlaying((p) => !p);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFrame, setFrameSafe]);

  const currentDegree = Math.round((currentFrame / totalFrames) * 360);
  const currentSrc = frames[currentFrame] || frames[0];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="360 degree interactive shoe viewer"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{
        aspectRatio,
        touchAction: 'none',
        ...style,
      }}
      className={`relative w-full select-none overflow-hidden rounded-2xl flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none transition-shadow ${
        isDragging ? 'shadow-2xl' : ''
      } ${className}`}
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-radial from-stone-100/60 via-stone-200/20 to-transparent pointer-events-none" />

      {/* Realistic Radial Ground Contact Shadow */}
      {shadow && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none transition-transform duration-300"
          style={{
            width: '74%',
            height: '24px',
            background:
              'radial-gradient(ellipse at center, rgba(30, 20, 15, 0.32) 0%, rgba(30, 20, 15, 0.12) 42%, rgba(0, 0, 0, 0) 72%)',
            transform: `translateX(-50%) scaleX(${0.96 + Math.sin((currentDegree * Math.PI) / 180) * 0.08})`,
            filter: 'blur(4px)',
          }}
        />
      )}

      {/* Active Shoe Frame (Crisp WebP rendered with high visual fidelity) */}
      <img
        src={currentSrc}
        alt={`360 Degree View Frame ${currentFrame + 1}`}
        draggable={false}
        className="w-full h-full object-contain pointer-events-none z-10 transition-transform duration-75"
        style={{
          transform: isDragging ? 'scale(1.015)' : 'scale(1)',
        }}
      />

      {/* Loading Progress Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#faf8f5]/85 backdrop-blur-xs transition-opacity duration-300">
          <div className="w-28 h-1 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-neutral-900 transition-all duration-150 rounded-full"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="font-sans text-[10px] text-stone-500 mt-2 font-medium tracking-widest uppercase">
            Loading 360° {loadProgress}%
          </span>
        </div>
      )}

      {/* Floating Minimalist HUD Controls */}
      {showControls && (
        <>
          {/* Top-Left: Archival Angle Readout */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-xs text-neutral-800 font-sans text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-stone-500" />
              <span>{currentDegree}°</span>
              <span className="text-[10px] font-normal text-stone-400">
                ({currentFrame + 1}/{totalFrames})
              </span>
            </div>
          </div>

          {/* Top-Right: Minimal Drag Hint */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-stone-200 font-sans text-[11px] font-medium border border-white/10 shadow-xs">
            <RotateCw className="w-3 h-3 text-yellow-400 animate-spin-slow" />
            <span>Drag to rotate</span>
          </div>

          {/* Bottom-Center: Minimal Clean Play / Pause / Reset Bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-md">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying((p) => !p);
              }}
              className="p-1.5 rounded-full hover:bg-stone-100 text-neutral-800 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause auto-spin' : 'Auto-spin 360°'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFrameSafe(0);
                setIsPlaying(false);
              }}
              className="px-2.5 py-1 rounded-full hover:bg-stone-100 text-neutral-700 text-[11px] font-sans font-medium transition-colors cursor-pointer"
              title="Reset to 0°"
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
}
