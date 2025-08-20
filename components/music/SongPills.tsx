"use client";

import React from "react";
import { motion } from "framer-motion";
import { Song } from "@/types/music";
import { useMusicContext } from "@/context/MusicContext";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { useRanking } from "@/hooks/use-ranking";
import { SortToggle } from "./SortToggle";

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
  const { 
    isRankingMode, 
    toggleRankingMode, 
    toggleRank, 
    getItemRank, 
    sortMode, 
    setSortMode 
  } = useRanking();

  const handleSongClick = (song: Song, index: number) => {
    if (isRankingMode) {
      toggleRank(song.id, 'song');
    } else {
      selectSong(song);
      onSongClick?.(song, index);
    }
  };

  // Sort songs based on current sort mode
  const sortedSongs = React.useMemo(() => {
    if (sortMode === 'ranking') {
      // Sort by ranking first, then by track number for unranked
      return [...songs].sort((a, b) => {
        const rankA = getItemRank(a.id, 'song');
        const rankB = getItemRank(b.id, 'song');
        
        if (rankA && rankB) return rankA - rankB;
        if (rankA) return -1; // ranked items first
        if (rankB) return 1;
        return a.trackNumber - b.trackNumber; // unranked by track number
      });
    } else {
      // Sort by track number (default)
      return [...songs].sort((a, b) => a.trackNumber - b.trackNumber);
    }
  }, [songs, sortMode, getItemRank]);

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
      {/* Header with sort toggle and ranking mode */}
      <div className="flex items-center justify-between mb-4 px-4">
        <motion.h2 
          className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {albumName}
        </motion.h2>
        
        <div className="flex items-center gap-2">
          <SortToggle 
            sortMode={sortMode} 
            onSortModeChange={setSortMode}
          />
          <Button
            variant={isRankingMode ? "default" : "outline"}
            size="sm"
            onClick={toggleRankingMode}
            className="flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            {isRankingMode ? "Exit Ranking" : "Rank Songs"}
          </Button>
        </div>
      </div>

      {/* Ranking mode indicator */}
      {isRankingMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 mx-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 Tap songs to rank them. Tap again to remove ranking.
          </p>
        </motion.div>
      )}

      <div className="flex-1 scroll-vertical">
        <motion.div 
          className="wrap-content gap-3 px-5 pb-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedSongs.map((song, index) => {
            const rank = getItemRank(song.id, 'song');
            const isRanked = rank !== undefined;
            
            return (
              <motion.button
                key={song.id}
                variants={pillVariants}
                className={`inline-flex items-center rounded-full px-3 py-3 text-sm font-medium touch-target focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 content-visibility-auto relative transition-all duration-200 ${
                  isRankingMode 
                    ? isRanked 
                      ? 'ring-2 ring-blue-500 shadow-lg' 
                      : 'opacity-60'
                    : ''
                }`}
                style={{
                  border: `2px solid ${albumColor}`,
                  backgroundColor: `${albumColor}10`,
                  color: albumColor === "#FFFFFF" ? "#000000" : "inherit",
                  opacity: isRankingMode && !isRanked ? 0.6 : 1,
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
                {/* Ranking indicator */}
                {isRanked && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {rank}
                  </div>
                )}
                
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
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
