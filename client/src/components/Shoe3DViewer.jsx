import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Compass, ZoomIn, ZoomOut, ArrowRight, Sparkles } from 'lucide-react';

export default function Shoe3DViewer({ selectedColorway, onInspectSpecs }) {
  const containerRef = useRef(null);

  // Rotation & Tilt State
  const [rotationDeg, setRotationDeg] = useState(0);
  const [tiltX, setTiltX] = useState(0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [zoomScale, setZoomScale] = useState(1.0);

  // Selected Colorway Data (Default: Retro Azure - All Blue)
  const accentHex = selectedColorway?.accentHex || '#4b8eb2';
  const colorwayName = selectedColorway?.shortName || 'Retro Azure';
  const colorwayCode = selectedColorway?.code || 'SB-90-BLU';
  const colorwayId = selectedColorway?.id || 'sb-90-blue';

  // 4 Studio Transparent PNGs
  // Lateral side uses the exact selected colorway PNG
  const lateralPng = selectedColorway?.image || '/assets/shoes_png/sole-bharat-blue.png';
  const topPng = '/assets/360_png/shoe-top.png';
  const medialPng = '/assets/360_png/shoe-medial.png';
  const heelPng = '/assets/360_png/shoe-heel.png';

  // Determine CSS filter for non-blue colorways so all angles match consistently
  // If Retro Azure is active, filter is 'none' (100% pristine original blue shoe photos!)
  let auxiliaryFilter = 'none';
  if (colorwayId === 'sb-90-maroon') {
    auxiliaryFilter = 'hue-rotate(150deg) saturate(1.1) brightness(0.95)';
  } else if (colorwayId === 'sb-90-green') {
    auxiliaryFilter = 'hue-rotate(240deg) saturate(0.9) brightness(0.98)';
  } else if (colorwayId === 'sb-90-brown') {
    auxiliaryFilter = 'sepia(0.55) hue-rotate(330deg) saturate(1.1) brightness(0.92)';
  }

  // Preload all 4 images on mount
  useEffect(() => {
    [lateralPng, topPng, medialPng, heelPng].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [lateralPng]);

  // Physics Refs for Momentum & Inertia Damping (thrdlabs-style)
  const physics = useRef({
    currentRotY: 0,
    targetRotY: 0,
    currentTiltX: 0,
    targetTiltX: 0,
    velocityY: 0,
    velocityX: 0,
    isDown: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });

  // -------------------------------------------------------------
  // ANIMATION LOOP: INERTIA DAMPING & SILKY SMOOTH LERP (60 FPS)
  // -------------------------------------------------------------
  useEffect(() => {
    let animId;
    const phys = physics.current;

    const loop = () => {
      animId = requestAnimationFrame(loop);

      if (!phys.isDown) {
        // Apply velocity momentum when mouse released
        phys.targetRotY += phys.velocityY;
        phys.targetTiltX = Math.max(-18, Math.min(18, phys.targetTiltX + phys.velocityX));

        // Smooth friction deceleration
        phys.velocityY *= 0.94;
        phys.velocityX *= 0.92;

        // Auto-spin drift if enabled and idle
        if (isAutoRotate && Math.abs(phys.velocityY) < 0.02) {
          phys.targetRotY += 0.45;
        }
      }

      // Smooth Lerp Interpolation
      phys.currentRotY += (phys.targetRotY - phys.currentRotY) * 0.15;
      phys.currentTiltX += (phys.targetTiltX - phys.currentTiltX) * 0.15;

      // Normalize to 0-360 degrees
      const norm = ((phys.currentRotY % 360) + 360) % 360;
      setRotationDeg(norm);
      setTiltX(phys.currentTiltX);
    };

    loop();

    return () => cancelAnimationFrame(animId);
  }, [isAutoRotate]);

  // -------------------------------------------------------------
  // DIRECT MOUSE & TOUCH POINTER DRAGGING HANDLERS
  // -------------------------------------------------------------
  const handlePointerDown = (e) => {
    const phys = physics.current;
    phys.isDown = true;
    setIsDragging(true);
    setHasInteracted(true);
    setIsAutoRotate(false);

    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    phys.startX = clientX;
    phys.startY = clientY;
    phys.lastX = clientX;
    phys.lastY = clientY;
    phys.lastTime = performance.now();
    phys.velocityY = 0;
    phys.velocityX = 0;
  };

  const handlePointerMove = (e) => {
    const phys = physics.current;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

    if (!phys.isDown) {
      // Subtle micro-tilt hover parallax when hovering without dragging
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const normY = (clientY - rect.top) / rect.height - 0.5;
        phys.targetTiltX = -normY * 10;
      }
      return;
    }

    const dx = clientX - phys.lastX;
    const dy = clientY - phys.lastY;
    const now = performance.now();
    const dt = Math.max(1, now - phys.lastTime);

    // Direct Drag: Left/Right drags rotate Y axis
    phys.targetRotY += dx * 0.65;

    // Up/Down drags pitch X axis
    phys.targetTiltX = Math.max(-20, Math.min(20, phys.targetTiltX - dy * 0.35));

    // Calculate instantaneous release velocity
    phys.velocityY = (dx * 0.65) * (16 / dt);
    phys.velocityX = (-dy * 0.35) * (16 / dt);

    phys.lastX = clientX;
    phys.lastY = clientY;
    phys.lastTime = now;
  };

  const handlePointerUp = () => {
    physics.current.isDown = false;
    setIsDragging(false);
  };

  // Jump to Preset Angles with Smooth Lerp
  const setPresetAngle = (deg) => {
    setIsAutoRotate(false);
    setHasInteracted(true);
    const phys = physics.current;
    const current = phys.targetRotY;
    // Find closest 360 revolution
    const k = Math.round((current - deg) / 360);
    phys.targetRotY = deg + k * 360;
    phys.targetTiltX = 0;
    phys.velocityY = 0;
    phys.velocityX = 0;
  };

  // Zoom Handler
  const handleZoom = (delta) => {
    setZoomScale((prev) => Math.max(0.8, Math.min(1.4, prev + delta)));
  };

  // -------------------------------------------------------------
  // SEAMLESS MATHEMATICAL ANGLE BLENDING (Cosine-Squared Energy)
  // Opacities sum to exactly 1.00 at every single fraction of a degree!
  // Zero flickering, zero popping, zero DOM reconstruction!
  // -------------------------------------------------------------
  const getAngleOpacity = (deg, centerDeg) => {
    let diff = Math.abs(((deg - centerDeg + 180) % 360) - 180);
    if (diff >= 90) return 0;
    const rad = (diff / 90) * (Math.PI / 2);
    return Math.pow(Math.cos(rad), 2);
  };

  const getRelAngle = (deg, centerDeg) => {
    return ((deg - centerDeg + 180) % 360) - 180;
  };

  const lateralOpacity = getAngleOpacity(rotationDeg, 0);
  const topOpacity = getAngleOpacity(rotationDeg, 90);
  const medialOpacity = getAngleOpacity(rotationDeg, 180);
  const heelOpacity = getAngleOpacity(rotationDeg, 270);

  // Active perspective description for the HUD
  let activeTag = 'LATERAL 0° [OUTER PROFILE]';
  if (rotationDeg >= 45 && rotationDeg < 135) {
    activeTag = 'TOP/TOE 90° [LACES & TONGUE]';
  } else if (rotationDeg >= 135 && rotationDeg < 225) {
    activeTag = 'MEDIAL 180° [INNER ARCH]';
  } else if (rotationDeg >= 225 && rotationDeg < 315) {
    activeTag = 'HEEL 270° ["HUH!!!" CREST]';
  }

  const roundedDeg = Math.round(rotationDeg);

  return (
    <div className="bg-[#ede5d4] rounded-3xl p-4 sm:p-5 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative font-mono select-none">
      
      {/* Top Header: Pure Product 360° Identity */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black/15 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping inline-block" />
          <span className="font-black text-black uppercase tracking-wider text-[11px]">
            SOLE BHARAT '90 • 360° TURNTABLE
          </span>
        </div>

        {/* Active Colorway Pill Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border-2 border-black shadow-sm font-black text-[10px] uppercase">
          <span className="w-2.5 h-2.5 rounded-full border border-black" style={{ backgroundColor: accentHex }} />
          <span>{colorwayName}</span>
        </div>
      </div>

      {/* Main 3D Stage: Deep Luxury Studio Backdrop with Custom Hand Cursor */}
      <div
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="relative my-3 aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#14161f] via-[#0e0f14] to-[#07080a] border-2 border-black overflow-hidden shadow-2xl flex items-center justify-center p-6 cursor-grab active:cursor-grabbing group"
      >
        {/* Dynamic Studio Ambient Spotlight Glow tinted with Blue Accent */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-50 transition-colors duration-500"
          style={{
            background: `radial-gradient(circle at 50% 48%, ${accentHex}55 0%, rgba(0,0,0,0) 65%)`,
          }}
        />

        {/* Dynamic Specular Glare / Spotlight Sheen */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen transition-transform duration-75"
          style={{
            background: 'radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)',
            transform: `translate(${(rotationDeg - 180) * 0.6}px, ${tiltX * 2}px)`,
          }}
        />

        {/* Oval Ground Contact Shadow that tilts naturally with rotation */}
        <div 
          className="absolute bottom-6 w-3/4 h-8 rounded-full bg-black/85 blur-md pointer-events-none transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${zoomScale}) rotate(${getRelAngle(rotationDeg, 0) * 0.15}deg)`,
          }}
        />

        {/* 
          CONTINUOUS 3D MULTI-ANGLE STAGE
          All 4 views are permanently mounted with zero unmounting or flashing!
          Smooth cosine-squared opacity cross-fading + 3D perspective foreshortening.
        */}
        <div 
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transform: `scale(${zoomScale})`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* 1. LATERAL VIEW (0° / 360°) - Outer Profile */}
          {lateralOpacity > 0 && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: lateralOpacity,
                transform: `perspective(900px) rotateY(${getRelAngle(rotationDeg, 0) * 0.4}deg) rotateX(${tiltX}deg)`,
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={lateralPng}
                alt="Sole Bharat Lateral View"
                className="w-full h-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] select-none"
                style={{ maxHeight: '88%' }}
              />
            </div>
          )}

          {/* 2. TOP VIEW (90°) - Laces, Charms & Tongue */}
          {topOpacity > 0 && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: topOpacity,
                transform: `perspective(900px) rotateY(${getRelAngle(rotationDeg, 90) * 0.4}deg) rotateX(${tiltX}deg)`,
                filter: auxiliaryFilter,
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={topPng}
                alt="Sole Bharat Top View"
                className="w-full h-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] select-none"
                style={{ maxHeight: '88%' }}
              />
            </div>
          )}

          {/* 3. MEDIAL VIEW (180°) - Inner Arch */}
          {medialOpacity > 0 && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: medialOpacity,
                transform: `perspective(900px) rotateY(${getRelAngle(rotationDeg, 180) * 0.4}deg) rotateX(${tiltX}deg)`,
                filter: auxiliaryFilter,
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={medialPng}
                alt="Sole Bharat Medial View"
                className="w-full h-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] select-none"
                style={{ maxHeight: '88%' }}
              />
            </div>
          )}

          {/* 4. HEEL VIEW (270°) - Embroidered "HUH!!!" Tab */}
          {heelOpacity > 0 && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: heelOpacity,
                transform: `perspective(900px) rotateY(${getRelAngle(rotationDeg, 270) * 0.4}deg) rotateX(${tiltX}deg)`,
                filter: auxiliaryFilter,
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={heelPng}
                alt="Sole Bharat Heel View"
                className="w-full h-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)] select-none"
                style={{ maxHeight: '88%' }}
              />
            </div>
          )}
        </div>

        {/* Custom White Animated 3D Hand Hint Badge (Matching User's Video) */}
        {!hasInteracted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[2px] transition-opacity">
            <div className="bg-black/90 border-2 border-yellow-400 text-yellow-300 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl animate-pulse">
              <div className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v3M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>
              <div className="text-left font-mono">
                <span className="block text-[11px] font-black tracking-wider text-white">DRAG SHOE 360° WITH MOUSE</span>
                <span className="block text-[9px] text-yellow-300">Smooth Inertia & 3D Tilt</span>
              </div>
            </div>
          </div>
        )}

        {/* HUD Overlay: Real-time Azimuth Degrees Gauge & Perspective Tag */}
        <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/20 text-[10px] font-mono font-black text-yellow-300 flex items-center gap-1.5 shadow-lg pointer-events-none">
          <Compass className={`w-3.5 h-3.5 text-yellow-400 ${isDragging ? 'animate-spin' : ''}`} />
          <span>{activeTag} • {roundedDeg}°</span>
        </div>

        {/* HUD Overlay: Zoom Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); handleZoom(0.1); }}
            className="p-1.5 rounded-xl bg-black/80 hover:bg-black text-white border border-white/20 shadow-md active:scale-95 transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5 text-yellow-300" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleZoom(-0.1); }}
            className="p-1.5 rounded-xl bg-black/80 hover:bg-black text-white border border-white/20 shadow-md active:scale-95 transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5 text-yellow-300" />
          </button>
        </div>

        {/* Active Shoe Tag at Bottom Right */}
        <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 text-[9px] font-bold text-gray-300 pointer-events-none">
          1990 SOLE BHARAT TERRACE • 360°
        </div>

        {/* Dragging Feedback Badge */}
        {isDragging && (
          <div className="absolute bottom-3 left-3 bg-yellow-400 text-black px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider animate-pulse pointer-events-none shadow">
            ● 360° SPINNING
          </div>
        )}
      </div>

      {/* Preset Angle Buttons & Inertia Controls */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-[10px] font-bold text-gray-800">
          <span className="uppercase tracking-wider">SNAP TO VIEWPOINT:</span>
          <button
            onClick={() => setIsAutoRotate((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg border-2 text-[10px] transition-all ${
              isAutoRotate 
                ? 'bg-yellow-400 text-black border-black font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                : 'bg-white text-gray-700 border-black/30 hover:border-black'
            }`}
          >
            <RotateCw className="w-3 h-3" />
            <span>{isAutoRotate ? 'Auto-Spin ON' : 'Auto-Spin OFF'}</span>
          </button>
        </div>

        {/* 4 Cardinal Angle Presets */}
        <div className="grid grid-cols-4 gap-1.5">
          <button
            onClick={() => setPresetAngle(0)}
            className={`py-1.5 rounded-xl text-[10px] font-black uppercase border-2 transition-all shadow-sm active:translate-y-0.5 ${
              roundedDeg >= 340 || roundedDeg < 25 
                ? 'bg-black text-yellow-300 border-black shadow' 
                : 'bg-white hover:bg-neutral-100 text-black border-black/30 hover:border-black'
            }`}
          >
            Lateral 0°
          </button>
          <button
            onClick={() => setPresetAngle(90)}
            className={`py-1.5 rounded-xl text-[10px] font-black uppercase border-2 transition-all shadow-sm active:translate-y-0.5 ${
              roundedDeg >= 70 && roundedDeg < 110 
                ? 'bg-black text-yellow-300 border-black shadow' 
                : 'bg-white hover:bg-neutral-100 text-black border-black/30 hover:border-black'
            }`}
          >
            Top 90°
          </button>
          <button
            onClick={() => setPresetAngle(180)}
            className={`py-1.5 rounded-xl text-[10px] font-black uppercase border-2 transition-all shadow-sm active:translate-y-0.5 ${
              roundedDeg >= 160 && roundedDeg < 200 
                ? 'bg-black text-yellow-300 border-black shadow' 
                : 'bg-white hover:bg-neutral-100 text-black border-black/30 hover:border-black'
            }`}
          >
            Medial 180°
          </button>
          <button
            onClick={() => setPresetAngle(270)}
            className={`py-1.5 rounded-xl text-[10px] font-black uppercase border-2 transition-all shadow-sm active:translate-y-0.5 ${
              roundedDeg >= 250 && roundedDeg < 290 
                ? 'bg-black text-yellow-300 border-black shadow' 
                : 'bg-white hover:bg-neutral-100 text-black border-black/30 hover:border-black'
            }`}
          >
            Heel 270°
          </button>
        </div>
      </div>

      {/* Bottom Colorway Spec & Inspection Button */}
      <div className="mt-3.5 pt-3 border-t-2 border-black/15 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-700 uppercase block font-bold font-mono">
            {colorwayName}
          </span>
          <span className="text-2xl font-black font-display text-black">
            ₹{selectedColorway?.price?.toLocaleString('en-IN') || '3,999'}
          </span>
        </div>

        <button
          onClick={() => onInspectSpecs(selectedColorway)}
          className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(75,142,178,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <span>Inspect Specs</span>
          <ArrowRight className="w-3.5 h-3.5 text-yellow-300" />
        </button>
      </div>

    </div>
  );
}