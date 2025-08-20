"use client";

import React from "react";
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

  return (
    <div className="flex h-full flex-col mobile-container">
      <h2 className="mb-4 sm:mb-6 text-center text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        Albums
      </h2>

      <div className="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
        {albums.map((album, index) => (
          <Card
            key={album.id}
            className="cursor-pointer transition-all duration-300 hover:scale-105 touch-target"
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
        ))}
      </div>
    </div>
  );
};
