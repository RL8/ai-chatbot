"use client";

import React from "react";
import { motion } from "framer-motion";
import { Album } from "@/types/music";
import { useMusicContext } from "@/context/MusicContext";
import { Card, CardContent } from "@/components/ui/card";

interface AlbumGridProps {
  albums: Album[];
  onAlbumClick?: (album: Album, index: number) => void;
}

export const AlbumGrid: React.FC<AlbumGridProps> = ({ albums, onAlbumClick }) => {
  const { selectAlbum } = useMusicContext();

  const handleAlbumClick = (album: Album, index: number) => {
    selectAlbum(album);
    onAlbumClick?.(album, index);
  };

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
      <motion.h2 
        className="mb-4 sm:mb-6 text-center text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        Albums
      </motion.h2>

      <motion.div 
        className="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {albums.map((album, index) => (
          <motion.div
            key={album.id}
            variants={albumVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className="cursor-pointer touch-target h-full"
              style={{
                borderColor: album.color,
                borderWidth: "2px",
              }}
              onClick={() => handleAlbumClick(album, index)}
            >
              <CardContent className="flex h-full flex-col justify-center p-3 sm:p-4 text-center">
                <h3 className="mb-1 text-sm sm:text-base font-semibold text-gray-900 dark:text-white text-truncate-2">
                  {album.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {album.releaseYear}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
