"use client";

import { useSwipeable } from "react-swipeable";

interface SwipeNavigationConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  delta?: number;
  swipeDuration?: number;
  trackMouse?: boolean;
  preventDefaultTouchmoveEvent?: boolean;
  preventScrollOnSwipe?: boolean;
}

export const useSwipeNavigation = (config: SwipeNavigationConfig) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    delta = 50,
    swipeDuration = 300,
    trackMouse = false,
    preventDefaultTouchmoveEvent = false,
    preventScrollOnSwipe = true,
  } = config;

  return useSwipeable({
    onSwipedLeft: onSwipeLeft,
    onSwipedRight: onSwipeRight,
    onSwipedUp: onSwipeUp,
    onSwipedDown: onSwipeDown,
    delta,
    swipeDuration,
    trackMouse,
    preventDefaultTouchmoveEvent,
    preventScrollOnSwipe,
  });
};
