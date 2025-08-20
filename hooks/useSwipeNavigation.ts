"use client";

import React, { useEffect, useRef, useState } from "react";

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeConfig {
  threshold?: number;
  preventDefaultTouchmoveEvent?: boolean;
  trackTouch?: boolean;
  trackMouse?: boolean;
  delta?: number;
}

export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
}: SwipeHandlers, config: SwipeConfig = {}) {
  const {
    threshold = 50,
    preventDefaultTouchmoveEvent = false,
    trackTouch = true,
    trackMouse = false,
    delta = 10,
  } = config;

  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setTouchStart({ x: clientX, y: clientY });
    setTouchEnd({ x: clientX, y: clientY });
    setIsSwiping(true);
  };

  const handleTouchMove = (e: TouchEvent | MouseEvent) => {
    if (!isSwiping) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setTouchEnd({ x: clientX, y: clientY });
    
    if (preventDefaultTouchmoveEvent) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if this is a valid swipe
    if (Math.max(absDeltaX, absDeltaY) > threshold) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > delta) {
          onSwipeLeft?.();
        } else if (deltaX < -delta) {
          onSwipeRight?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > delta) {
          onSwipeUp?.();
        } else if (deltaY < -delta) {
          onSwipeDown?.();
        }
      }
    }
    
    setIsSwiping(false);
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (trackTouch) {
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchmove', handleTouchMove, { passive: !preventDefaultTouchmoveEvent });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    if (trackMouse) {
      element.addEventListener('mousedown', handleTouchStart);
      element.addEventListener('mousemove', handleTouchMove);
      element.addEventListener('mouseup', handleTouchEnd);
    }

    return () => {
      if (trackTouch) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
      }

      if (trackMouse) {
        element.removeEventListener('mousedown', handleTouchStart);
        element.removeEventListener('mousemove', handleTouchMove);
        element.removeEventListener('mouseup', handleTouchEnd);
      }
    };
  }, [isSwiping, touchStart, touchEnd]);

  // Create properly typed event handlers
  const touchHandlers = trackTouch ? {
    onTouchStart: (e: React.TouchEvent) => handleTouchStart(e.nativeEvent),
    onTouchMove: (e: React.TouchEvent) => handleTouchMove(e.nativeEvent),
    onTouchEnd: () => handleTouchEnd(),
  } : {};

  const mouseHandlers = trackMouse ? {
    onMouseDown: (e: React.MouseEvent) => handleTouchStart(e.nativeEvent),
    onMouseMove: (e: React.MouseEvent) => handleTouchMove(e.nativeEvent),
    onMouseUp: () => handleTouchEnd(),
  } : {};

  return {
    // DOM-safe props that can be spread onto elements
    props: {
      ref: elementRef,
      ...touchHandlers,
      ...mouseHandlers,
    },
    // Data that should be accessed separately
    swipeData: {
      isSwiping,
      deltaX: touchStart.x - touchEnd.x,
      deltaY: touchStart.y - touchEnd.y,
    }
  };
}
