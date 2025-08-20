"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
}

export function TaylorSwiftDiscography() {
  const [artist, setArtist] = useState<Artist>(getTaylorSwiftArtist());
  const [albums, setAlbums] = useState<Album[]>(getAllAlbums());
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<DiscographyState>({
    view: 'artist',
    currentAlbumIndex: 0,
    currentSongIndex: 0
  });

  const { selectAlbum, selectSong } = useMusicContext();

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

  // Unified swipe navigation for album tabs
  const albumSwipeHandlers = useSwipeNavigation({
    onSwipeLeft: () => {
      if (state.view === 'songs' && state.currentAlbumIndex < albums.length - 1) {
        const nextIndex = state.currentAlbumIndex + 1;
        const nextAlbum = albums[nextIndex];
        handleAlbumClick(nextAlbum, nextIndex);
      }
    },
    onSwipeRight: () => {
      if (state.view === 'songs' && state.currentAlbumIndex > 0) {
        const prevIndex = state.currentAlbumIndex - 1;
        const prevAlbum = albums[prevIndex];
        handleAlbumClick(prevAlbum, prevIndex);
      }
    },
  });

  const handleAlbumClick = (album: Album, index?: number) => {
    const albumIndex = index ?? albums.findIndex(a => a.id === album.id);
    const albumSongs = getSongsByAlbum(album.id);
    
    setSongs(albumSongs);
    setState(prev => ({
      ...prev,
      view: 'songs',
      selectedAlbum: album,
      currentAlbumIndex: albumIndex,
      currentSongIndex: 0
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

  // Type-safe render functions with null checks
  const renderArtistView = () => (
    <motion.div
      key="artist"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col mobile-container"
    >
      <HeaderComponent
        title="Taylor Swift"
        actions={
          <Button 
            onClick={() => setState(prev => ({ ...prev, view: 'albums' }))}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            View Albums
          </Button>
        }
      />

      <div className="flex-1 p-4 flex items-center justify-center">
        <ArtistCard artist={artist} onSelect={handleArtistSelect} />
      </div>
    </motion.div>
  );

  const renderAlbumsView = () => (
    <motion.div
      key="albums"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col mobile-container"
    >
      <HeaderComponent
        title="Albums"
        showBack
        onBack={handleBack}
      />

      <div className="flex-1 p-4 scroll-vertical">
        <AlbumGrid albums={albums} onAlbumClick={handleAlbumClick} />
      </div>
    </motion.div>
  );

  const renderSongsView = () => {
    // Type safety check
    if (!state.selectedAlbum) {
      return (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No album selected</p>
        </div>
      );
    }

    return (
      <motion.div
        key="songs"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="h-full flex flex-col mobile-container"
      >
        <HeaderComponent
          title={state.selectedAlbum.name}
          showBack
          onBack={handleBack}
        />

        {/* Sticky Album tabs with swipe navigation */}
        <div 
          className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-gray-200 dark:border-gray-700"
          {...albumSwipeHandlers}
        >
          <div className="flex gap-2 scroll-horizontal px-4 py-2" aria-label="Albums">
            {albums.map((album, index) => (
              <button
                key={album.id}
                onClick={() => handleAlbumClick(album, index)}
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 touch-target",
                  state.currentAlbumIndex === index
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
                style={{
                  backgroundColor: state.currentAlbumIndex === index ? album.color : 'transparent'
                }}
                aria-current={state.currentAlbumIndex === index ? "page" : undefined}
              >
                {album.name}
              </button>
            ))}
          </div>
        </div>

        {/* Song pills container */}
        <div className="flex-1 scroll-vertical">
          <SongPills
            songs={songs}
            albumColor={state.selectedAlbum.color}
            albumName={state.selectedAlbum.name}
            onSongClick={handleSongClick}
          />
        </div>
      </motion.div>
    );
  };

  const renderSongDetailsView = () => {
    // Type safety checks
    if (!state.selectedSong || !state.selectedAlbum) {
      return (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No song selected</p>
        </div>
      );
    }

    return (
      <SongDetails
        song={state.selectedSong}
        album={state.selectedAlbum}
        songs={songs}
        currentSongIndex={state.currentSongIndex}
        onBack={handleBack}
        onSongClick={handleSongClick}
      />
    );
  };

  return (
    <div className="h-full w-full mobile-container">
      <AnimatePresence mode="wait">
        {state.view === 'artist' && renderArtistView()}
        {state.view === 'albums' && renderAlbumsView()}
        {state.view === 'songs' && renderSongsView()}
        {state.view === 'song-details' && renderSongDetailsView()}
      </AnimatePresence>
    </div>
  );
}
