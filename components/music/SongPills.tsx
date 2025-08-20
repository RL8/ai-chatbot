"use client";

import React from "react";
import { Song } from "@/types/music";
import { useMusicContext } from "@/context/MusicContext";

interface SongPillsProps {
  songs: Song[];
  albumColor: string;
  albumName: string;
  onSongClick?: (song: Song, index: number) => void;
}

export const SongPills: React.FC<SongPillsProps> = ({
  songs,
  albumColor,
  albumName,
  onSongClick,
}) => {
  const { selectSong } = useMusicContext();

  const handleSongClick = (song: Song, index: number) => {
    selectSong(song);
    onSongClick?.(song, index);
  };

  return (
    <div className="flex h-full flex-col mobile-container">
      <h2 className="mb-4 text-center text-lg sm:text-xl font-bold text-gray-900 dark:text-white px-4">
        {albumName}
      </h2>

      <div className="flex-1 scroll-vertical">
        <div className="wrap-content gap-3 px-5 pb-5">
          {songs.map((song, index) => (
            <button
              key={song.id}
              className="inline-flex items-center rounded-full px-3 py-3 text-sm font-medium transition-all duration-200 touch-target hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 content-visibility-auto"
              style={{
                border: `2px solid ${albumColor}`,
                backgroundColor: `${albumColor}10`,
                color: albumColor === "#FFFFFF" ? "#000000" : "inherit",
              }}
              onClick={() => handleSongClick(song, index)}
              aria-label={`Track ${song.trackNumber}: ${song.title}`}
            >
              <span
                className="mr-2 text-xs font-light flex-shrink-0"
                style={{ color: albumColor }}
              >
                {song.trackNumber}.
              </span>
              <span className="text-gray-900 dark:text-white truncate max-w-[120px] sm:max-w-[150px]">
                {song.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
