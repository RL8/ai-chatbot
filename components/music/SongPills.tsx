"use client";

import React from "react";
import { motion } from "framer-motion";
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

  // Animation variants for staggered song pills
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const pillVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }
    }
  };

  return (
    <div className="flex h-full flex-col mobile-container">
      <motion.h2 
        className="mb-4 text-center text-lg sm:text-xl font-bold text-gray-900 dark:text-white px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {albumName}
      </motion.h2>

      <div className="flex-1 scroll-vertical">
        <motion.div 
          className="wrap-content gap-3 px-5 pb-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {songs.map((song, index) => (
            <motion.button
              key={song.id}
              variants={pillVariants}
              className="inline-flex items-center rounded-full px-3 py-3 text-sm font-medium touch-target focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 content-visibility-auto"
              style={{
                border: `2px solid ${albumColor}`,
                backgroundColor: `${albumColor}10`,
                color: albumColor === "#FFFFFF" ? "#000000" : "inherit",
              }}
              onClick={() => handleSongClick(song, index)}
              aria-label={`Track ${song.trackNumber}: ${song.title}`}
              whileHover={{ 
                scale: 1.05,
                borderColor: albumColor,
                boxShadow: `0 4px 12px ${albumColor}40`
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
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
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
