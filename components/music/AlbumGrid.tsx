"use client";

import React from "react";
import { motion } from "framer-motion";
import { Album } from "@/types/music";
import { useMusicContext } from "@/context/MusicContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { useRanking } from "@/hooks/use-ranking";
import { SortToggle } from "./SortToggle";

interface AlbumGridProps {
  albums: Album[];
  onAlbumClick?: (album: Album, index: number) => void;
}

export const AlbumGrid: React.FC<AlbumGridProps> = ({ albums, onAlbumClick }) => {
  const { selectAlbum } = useMusicContext();
  const {
    isRankingMode,
    toggleRankingMode,
    toggleRank,
    getItemRank,
    sortMode,
    setSortMode
  } = useRanking();

  const handleAlbumClick = (album: Album, index: number) => {
    if (isRankingMode) {
      toggleRank(album.id, 'album');
    } else {
      selectAlbum(album);
      onAlbumClick?.(album, index);
    }
  };

  // Sort albums based on current sort mode
  const sortedAlbums = React.useMemo(() => {
    if (sortMode === 'ranking') {
      // Sort by ranking first, then by release date for unranked
      return [...albums].sort((a, b) => {
        const rankA = getItemRank(a.id, 'album');
        const rankB = getItemRank(b.id, 'album');
<<<<<<< HEAD
        
=======

>>>>>>> feature/enhanced-music-animations
        if (rankA && rankB) return rankA - rankB;
        if (rankA) return -1; // ranked items first
        if (rankB) return 1;
        return a.releaseYear - b.releaseYear; // unranked by release date
      });
    } else {
      // Sort by release date (default)
      return [...albums].sort((a, b) => a.releaseYear - b.releaseYear);
    }
  }, [albums, sortMode, getItemRank]);

  // Animation variants for staggered album grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const albumVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
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
      <div className="flex items-center justify-between mb-4 sm:mb-6">
<<<<<<< HEAD
        <motion.h2 
=======
        <motion.h2
>>>>>>> feature/enhanced-music-animations
          className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          Albums
        </motion.h2>
<<<<<<< HEAD
        
        <div className="flex items-center gap-2">
          <SortToggle 
            sortMode={sortMode} 
=======

        <div className="flex items-center gap-2">
          <SortToggle
            sortMode={sortMode}
>>>>>>> feature/enhanced-music-animations
            onSortModeChange={setSortMode}
          />
          <Button
            variant={isRankingMode ? "default" : "outline"}
            size="sm"
            onClick={toggleRankingMode}
            className="flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            {isRankingMode ? "Exit Ranking" : "Rank Albums"}
          </Button>
        </div>
      </div>

      {/* Ranking mode indicator */}
      {isRankingMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 Tap albums to rank them. Tap again to remove ranking.
          </p>
        </motion.div>
      )}

      <motion.div 
        className="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sortedAlbums.map((album, index) => {
          const rank = getItemRank(album.id, 'album');
<<<<<<< HEAD
          const isRanked = rank !== undefined;
          
          return (
            <motion.div
              key={album.id}
              variants={albumVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`cursor-pointer touch-target h-full transition-all duration-200 ${
                  isRankingMode 
                    ? isRanked 
                      ? 'ring-2 ring-blue-500 shadow-lg' 
                      : 'opacity-60'
                    : ''
                }`}
                style={{
                  borderColor: album.color,
                  borderWidth: "2px",
                  opacity: isRankingMode && !isRanked ? 0.6 : 1,
                }}
                onClick={() => handleAlbumClick(album, index)}
              >
                <CardContent className="flex h-full flex-col justify-center p-3 sm:p-4 text-center relative">
                  {/* Ranking indicator */}
                  {isRanked && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {rank}
                    </div>
                  )}
                  
                  <h3 className="mb-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white text-truncate-2">
                    {album.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {album.releaseYear}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
=======
          return (
          <motion.div
            key={album.id}
            variants={albumVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`cursor-pointer touch-target h-full ${
                isRankingMode && rank ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                borderColor: album.color,
                borderWidth: "2px",
              }}
              onClick={() => handleAlbumClick(album, index)}
            >
              <CardContent className="flex h-full flex-col justify-center p-3 sm:p-4 text-center relative">
                {/* Ranking badge */}
                {rank && (
                  <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {rank}
                  </div>
                )}
                <h3 className="mb-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white text-truncate-2">
                  {album.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {album.releaseYear}
                </p>
              </CardContent>
            </Card>
          </motion.div>
>>>>>>> feature/enhanced-music-animations
          );
        })}
      </motion.div>
    </div>
  );
};
