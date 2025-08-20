"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Album, Song, Artist } from "@/types/music";
import { getTaylorSwiftArtist, getAllAlbums, getSongsByAlbum } from "@/lib/taylor-swift-data";
import { Button } from "@/components/ui/button";
import { AlbumGrid } from "./AlbumGrid";
import { SongPills } from "./SongPills";
import { ArtistCard } from "./ArtistCard";
import { SongDetails } from "./SongDetails";
import { HeaderComponent } from "./HeaderComponent";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { useMusicContext } from "@/context/MusicContext";

type ViewState = 'artist' | 'albums' | 'songs' | 'song-details';

interface DiscographyState {
  view: ViewState;
  selectedAlbum?: Album;
  selectedSong?: Song;
  currentAlbumIndex: number;
  currentSongIndex: number;
  isTransitioning: boolean;
  swipeDirection: 'left' | 'right' | null;
}

// Enhanced animation configurations
const springConfig = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 1,
};

const smoothSpringConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 35,
  mass: 0.8,
};

// View transition variants with spring physics
const viewVariants = {
  artist: {
    initial: { opacity: 0, scale: 0.95, y: 20, filter: "blur(4px)" },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: springConfig
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -20, 
      filter: "blur(4px)",
      transition: { ...springConfig, duration: 0.2 }
    }
  },
  albums: {
    initial: { opacity: 0, x: 50, scale: 0.98 },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { ...springConfig, staggerChildren: 0.1 }
    },
    exit: { 
      opacity: 0, 
      x: -50, 
      scale: 0.98,
      transition: { ...springConfig, duration: 0.2 }
    }
  },
  songs: {
    initial: (direction: 'left' | 'right' | null) => ({
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 30,
      scale: 0.95
    }),
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { ...smoothSpringConfig, staggerChildren: 0.05 }
    },
    exit: (direction: 'left' | 'right' | null) => ({
      opacity: 0,
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : -30,
      scale: 0.95,
      transition: { ...smoothSpringConfig, duration: 0.25 }
    })
  },
  songDetails: {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: springConfig
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      scale: 0.98,
      transition: { ...springConfig, duration: 0.2 }
    }
  }
};

export function TaylorSwiftDiscography() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<DiscographyState>({
    view: 'artist',
    currentAlbumIndex: 0,
    currentSongIndex: 0,
    isTransitioning: false,
    swipeDirection: null
  });

  const { selectAlbum, selectSong } = useMusicContext();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Spring values for swipe feedback
  const swipeX = useSpring(0, smoothSpringConfig);
  const swipeOpacity = useTransform(swipeX, [-100, 0, 100], [0.7, 1, 0.7]);

  // Lazy load music data when component mounts
  useEffect(() => {
    setArtist(getTaylorSwiftArtist());
    setAlbums(getAllAlbums());
  }, []);

  // Listen for natural language commands from the artifact system
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'music-command') {
        const command = event.data.command.toLowerCase();
        
        // Basic navigation commands
        if (command.includes('album') || command.includes('albums')) {
          setState(prev => ({ ...prev, view: 'albums' }));
        }
        if (command.includes('artist') || command.includes('taylor')) {
          setState(prev => ({ ...prev, view: 'artist' }));
        }
        if (command.includes('song') || command.includes('songs')) {
          // Navigate to songs if an album is selected, otherwise go to albums
          if (state.selectedAlbum) {
            setState(prev => ({ ...prev, view: 'songs' }));
          } else {
            setState(prev => ({ ...prev, view: 'albums' }));
          }
        }
        
        // Album-specific commands
        albums.forEach((album, index) => {
          if (command.includes(album.name.toLowerCase())) {
            handleAlbumClick(album, index);
          }
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [albums, state.selectedAlbum]);

  // Enhanced swipe navigation with visual feedback
  const albumSwipeHandlers = useSwipeNavigation({
    onSwipeLeft: () => {
      if (state.view === 'songs' && state.currentAlbumIndex < albums.length - 1 && !state.isTransitioning) {
        setState(prev => ({ ...prev, swipeDirection: 'left', isTransitioning: true }));
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
        
        const nextIndex = state.currentAlbumIndex + 1;
        const nextAlbum = albums[nextIndex];
        
        // Small delay for transition feedback
        setTimeout(() => {
          handleAlbumClick(nextAlbum, nextIndex, 'left');
        }, 100);
      }
    },
    onSwipeRight: () => {
      if (state.view === 'songs' && state.currentAlbumIndex > 0 && !state.isTransitioning) {
        setState(prev => ({ ...prev, swipeDirection: 'right', isTransitioning: true }));
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
        
        const prevIndex = state.currentAlbumIndex - 1;
        const prevAlbum = albums[prevIndex];
        
        // Small delay for transition feedback
        setTimeout(() => {
          handleAlbumClick(prevAlbum, prevIndex, 'right');
        }, 100);
      }
    },
  }, {
    threshold: 50,
    trackTouch: true,
    preventDefaultTouchmoveEvent: false,
  });

  // Enhanced swipe feedback with spring animation
  useEffect(() => {
    if (albumSwipeHandlers.swipeData?.isSwiping && state.view === 'songs') {
      const deltaX = albumSwipeHandlers.swipeData.deltaX;
      swipeX.set(-deltaX * 0.5); // Dampen the movement
    } else {
      swipeX.set(0);
    }
  }, [albumSwipeHandlers.swipeData, state.view, swipeX]);

  const handleAlbumClick = (album: Album, index?: number, direction?: 'left' | 'right') => {
    const albumIndex = index ?? albums.findIndex(a => a.id === album.id);
    const albumSongs = getSongsByAlbum(album.id);
    
    setSongs(albumSongs);
    setState(prev => ({
      ...prev,
      view: 'songs',
      selectedAlbum: album,
      currentAlbumIndex: albumIndex,
      currentSongIndex: 0,
      swipeDirection: direction || null,
      isTransitioning: false
    }));
    selectAlbum(album);
  };

  const handleSongClick = (song: Song, index: number) => {
    setState(prev => ({
      ...prev,
      view: 'song-details',
      selectedSong: song,
      currentSongIndex: index
    }));
    selectSong(song);
  };

  const handleBack = () => {
    if (state.view === 'song-details') {
      setState(prev => ({ ...prev, view: 'songs' }));
      selectSong(null);
    } else if (state.view === 'songs') {
      setState(prev => ({ ...prev, view: 'albums' }));
      selectAlbum(null);
    } else if (state.view === 'albums') {
      setState(prev => ({ ...prev, view: 'artist' }));
    }
  };

  const handleArtistSelect = (selectedArtist: Artist) => {
    setState(prev => ({ ...prev, view: 'albums' }));
  };

  // Type-safe render functions with enhanced animations
  const renderArtistView = () => (
    <motion.div
      key="artist"
      custom={state.swipeDirection}
      variants={shouldReduceMotion ? {} : viewVariants.artist}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full flex flex-col mobile-container"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
      >
        <HeaderComponent
          title="Taylor Swift"
          actions={
            <Button 
              onClick={() => setState(prev => ({ ...prev, view: 'albums' }))}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105 transition-transform"
            >
              View Albums
            </Button>
          }
        />
      </motion.div>

      <motion.div 
        className="flex-1 p-4 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...springConfig, delay: 0.2 }}
      >
        {artist ? <ArtistCard artist={artist} onSelect={handleArtistSelect} /> : <div>Loading...</div>}
      </motion.div>
    </motion.div>
  );

  const renderAlbumsView = () => (
    <motion.div
      key="albums"
      custom={state.swipeDirection}
      variants={shouldReduceMotion ? {} : viewVariants.albums}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full flex flex-col mobile-container"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
      >
        <HeaderComponent
          title="Albums"
          showBack
          onBack={handleBack}
        />
      </motion.div>

      <motion.div 
        className="flex-1 p-4 scroll-vertical"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.15 }}
      >
        <AlbumGrid albums={albums} onAlbumClick={handleAlbumClick} />
      </motion.div>
    </motion.div>
  );

  const renderSongsView = () => {
    // Type safety check
    if (!state.selectedAlbum) {
      return (
        <motion.div 
          className="h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-gray-500">No album selected</p>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={`songs-${state.selectedAlbum.id}`}
        custom={state.swipeDirection}
        variants={shouldReduceMotion ? {} : viewVariants.songs}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full flex flex-col mobile-container"
        style={{
          x: shouldReduceMotion ? 0 : swipeX,
          opacity: shouldReduceMotion ? 1 : swipeOpacity
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.1 }}
        >
          <HeaderComponent
            title={state.selectedAlbum.name}
            showBack
            onBack={handleBack}
          />
        </motion.div>

        {/* Enhanced sticky album tabs with animated indicator */}
        <motion.div 
          className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-gray-200 dark:border-gray-700"
          {...albumSwipeHandlers.props}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springConfig, delay: 0.15 }}
        >
          <div className="relative">
            <div className="flex gap-2 scroll-horizontal px-4 py-2" aria-label="Albums">
              {albums.map((album, index) => (
                <motion.button
                  key={album.id}
                  onClick={() => handleAlbumClick(album, index)}
                  className={cn(
                    "relative px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 touch-target overflow-hidden",
                    state.currentAlbumIndex === index
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                  style={{
                    backgroundColor: state.currentAlbumIndex === index ? album.color : 'transparent'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={smoothSpringConfig}
                  aria-current={state.currentAlbumIndex === index ? "page" : undefined}
                >
                  {/* Animated background for active tab */}
                  {state.currentAlbumIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: album.color }}
                      layoutId="activeTabBackground"
                      transition={smoothSpringConfig}
                    />
                  )}
                  
                  {/* Tab content */}
                  <span className="relative z-10">{album.name}</span>
                </motion.button>
              ))}
            </div>
            
            {/* Swipe direction indicators */}
            <AnimatePresence>
              {state.isTransitioning && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={cn(
                    "text-2xl",
                    state.swipeDirection === 'left' ? "animate-pulse" : "",
                    state.swipeDirection === 'right' ? "animate-pulse" : ""
                  )}>
                    {state.swipeDirection === 'left' ? '←' : state.swipeDirection === 'right' ? '→' : ''}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Enhanced song pills container with staggered animations */}
        <motion.div 
          className="flex-1 scroll-vertical"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...springConfig, delay: 0.2 }}
        >
          <SongPills
            songs={songs}
            albumColor={state.selectedAlbum.color}
            albumName={state.selectedAlbum.name}
            onSongClick={handleSongClick}
          />
        </motion.div>
      </motion.div>
    );
  };

  const renderSongDetailsView = () => {
    // Type safety checks
    if (!state.selectedSong || !state.selectedAlbum) {
      return (
        <motion.div 
          className="h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="text-gray-500">No song selected</p>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={`song-details-${state.selectedSong.id}`}
        custom={state.swipeDirection}
        variants={shouldReduceMotion ? {} : viewVariants.songDetails}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full w-full"
      >
        <SongDetails
          song={state.selectedSong}
          album={state.selectedAlbum}
          songs={songs}
          currentSongIndex={state.currentSongIndex}
          onBack={handleBack}
          onSongClick={handleSongClick}
        />
      </motion.div>
    );
  };

  return (
    <div className="h-full w-full mobile-container" ref={containerRef}>
      <AnimatePresence mode="wait" initial={false}>
        {state.view === 'artist' && renderArtistView()}
        {state.view === 'albums' && renderAlbumsView()}
        {state.view === 'songs' && renderSongsView()}
        {state.view === 'song-details' && renderSongDetailsView()}
      </AnimatePresence>
    </div>
  );
}
