"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Artist, Album, Song, AppState } from "@/types/music";

interface MusicContextType {
  selectedArtist: Artist | null;
  selectedAlbum: Album | null;
  selectedSong: Song | null;
  selectArtist: (artist: Artist) => void;
  selectAlbum: (album: Album | null) => void;
  selectSong: (song: Song | null) => void;
  clearSelection: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
};

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const selectArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setSelectedAlbum(null);
    setSelectedSong(null);
  };

  const selectAlbum = (album: Album | null) => {
    setSelectedAlbum(album);
    setSelectedSong(null);
  };

  const selectSong = (song: Song | null) => {
    setSelectedSong(song);
  };

  const clearSelection = () => {
    setSelectedArtist(null);
    setSelectedAlbum(null);
    setSelectedSong(null);
  };

  const value: MusicContextType = {
    selectedArtist,
    selectedAlbum,
    selectedSong,
    selectArtist,
    selectAlbum,
    selectSong,
    clearSelection,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};
