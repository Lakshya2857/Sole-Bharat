import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal: Silky smooth, performant scroll-triggered animation component.
 * Uses IntersectionObserver to trigger entry animations as user scrolls down.
 * 
 * Animations:
 * - 'fade-up' (default): slides up 32px with fade
 * - 'fade-down': slides down 32px with fade
 * - 'fade-left': slides in from left 36px with fade
 * - 'fade-right': slides in from right 36px with fade
 * - 'scale-up': scales from 0.94 to 1.0 with fade
 * - 'fade': pure opacity fade
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 650,
  threshold = 0.04,
  rootMargin = '0px 0px 60px 0px',
  once = true,
  className = '',
  style = {},
}) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  // Initial transform offset based on animation type
  const getInitialTransform = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate3d(0, 36px, 0)';
      case 'fade-down':
        return 'translate3d(0, -36px, 0)';
      case 'fade-left':
        return 'translate3d(-40px, 0, 0)';
      case 'fade-right':
        return 'translate3d(40px, 0, 0)';
      case 'scale-up':
        return 'translate3d(0, 24px, 0) scale(0.93)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const animStyle = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };

  return (
    <div ref={domRef} className={className} style={animStyle}>
      {children}
    </div>
  );
}

