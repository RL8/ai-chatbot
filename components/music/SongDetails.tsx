"use client";

import React from "react";
import { motion } from "framer-motion";
import { Song, Album } from "@/types/music";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Heart, Share2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { HeaderComponent } from "./HeaderComponent";

interface SongDetailsProps {
  song: Song;
  album: Album;
  songs: Song[];
  currentSongIndex: number;
  onBack: () => void;
  onSongClick: (song: Song, index: number) => void;
}

export const SongDetails: React.FC<SongDetailsProps> = ({
  song,
  album,
  songs,
  currentSongIndex,
  onBack,
  onSongClick,
}) => {
  const songSwipeHandlers = useSwipeNavigation({
    onSwipeLeft: () => {
      if (currentSongIndex < songs.length - 1) {
        const nextIndex = currentSongIndex + 1;
        onSongClick(songs[nextIndex], nextIndex);
      }
    },
    onSwipeRight: () => {
      if (currentSongIndex > 0) {
        const prevIndex = currentSongIndex - 1;
        onSongClick(songs[prevIndex], prevIndex);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full flex flex-col mobile-container"
      {...songSwipeHandlers}
    >
      <HeaderComponent
        title="Song Details"
        showBack
        onBack={onBack}
      />

      {/* Song tabs */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2 scroll-horizontal">
          {songs.map((songItem, index) => (
            <button
              key={songItem.id}
              onClick={() => onSongClick(songItem, index)}
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 touch-target",
                currentSongIndex === index
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
              style={{
                backgroundColor: currentSongIndex === index ? album.color : 'transparent'
              }}
            >
              {songItem.trackNumber}. {songItem.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 scroll-vertical">
        <Card className="h-full">
          <CardContent className="flex flex-col h-full p-6">
            {/* Song Header */}
            <div className="text-center mb-8">
              <div
                className="w-24 h-24 mx-auto mb-4 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: album.color }}
              >
                <Play className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {song.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {album.name} • Track {song.trackNumber}
              </p>
            </div>

            {/* Song Metadata */}
            <div className="space-y-6 flex-1">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {song.duration}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Track: {song.trackNumber} of {album.songs.length}
                </div>
              </div>

              {/* Album Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Album Information
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-400">
                  <div><span className="font-medium">Album:</span> {album.name}</div>
                  <div><span className="font-medium">Release Year:</span> {album.releaseYear}</div>
                  <div><span className="font-medium">Total Tracks:</span> {album.songs.length}</div>
                </div>
              </div>

              {/* Song Stats */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Song Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="font-medium">Position:</span> {song.trackNumber}/{album.songs.length}
                  </div>
                  <div>
                    <span className="font-medium">Album Era:</span> {album.releaseYear}
                  </div>
                </div>
              </div>

              {/* Placeholder for Lyrics */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Lyrics
                </h3>
                <div className="text-gray-600 dark:text-gray-400 italic">
                  <p>Lyrics would be displayed here...</p>
                  <p className="mt-2 text-sm">
                    (This is a placeholder. In a full implementation, lyrics would be fetched from a music API)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                size="lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Play Song
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
