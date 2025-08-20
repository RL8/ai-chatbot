"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Album } from "@/types/music";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlbumTabsProps {
  albums: Album[];
  currentAlbumIndex: number;
  onAlbumClick: (album: Album, index: number) => void;
  className?: string;
}

export function AlbumTabs({ 
  albums, 
  currentAlbumIndex, 
  onAlbumClick, 
  className 
}: AlbumTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Scroll to specific album
  const scrollToAlbum = (index: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const albumElement = container.children[index] as HTMLElement;
    if (!albumElement) return;

    const containerWidth = container.clientWidth;
    const albumWidth = albumElement.offsetWidth;
    const albumLeft = albumElement.offsetLeft;
    const scrollLeft = albumLeft - (containerWidth / 2) + (albumWidth / 2);
    
    container.scrollTo({
      left: Math.max(0, scrollLeft),
      behavior: 'smooth'
    });
  };

  // Scroll by direction
  const scrollBy = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Auto-scroll to current album when it changes
  useEffect(() => {
    scrollToAlbum(currentAlbumIndex);
  }, [currentAlbumIndex]);

  // Check scroll position on mount and resize
  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Left Arrow */}
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background/80 backdrop-blur border border-border shadow-sm"
          onClick={() => scrollBy('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background/80 backdrop-blur border border-border shadow-sm"
          onClick={() => scrollBy('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-2 scroll-horizontal px-4 py-2"
        onScroll={checkScrollPosition}
        aria-label="Albums"
      >
        {albums.map((album, index) => (
          <button
            key={album.id}
            onClick={() => onAlbumClick(album, index)}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 touch-target",
              currentAlbumIndex === index
                ? "text-white shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            )}
            style={{
              backgroundColor: currentAlbumIndex === index ? album.color : 'transparent',
              border: currentAlbumIndex === index ? `2px solid ${album.color}` : '2px solid transparent'
            }}
            aria-current={currentAlbumIndex === index ? "page" : undefined}
          >
            {album.name}
          </button>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1 mt-2">
        {albums.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToAlbum(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentAlbumIndex === index
                ? "bg-primary"
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            )}
            aria-label={`Go to album ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
