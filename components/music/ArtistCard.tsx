"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Artist } from "@/types/music";
import { useMusicContext } from "@/context/MusicContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, ChevronDown, ChevronUp } from "lucide-react";

interface ArtistCardProps {
  artist: Artist;
  onSelect?: (artist: Artist) => void;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectArtist } = useMusicContext();

  const handleExploreClick = () => {
    selectArtist(artist);
    onSelect?.(artist);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mobile-container">
      <CardContent className="p-4 sm:p-8">
        <div className="text-center">
          {/* Artist Image Placeholder */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Music className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>

          {/* Artist Name */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {artist.name}
          </h1>

          {/* Album Count */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
            {artist.albums.length} Albums • {artist.albums.reduce((total, album) => total + album.songs.length, 0)} Songs
          </p>

          {/* Expandable Details */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Discography Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <span className="font-medium">First Album:</span> {artist.albums[0]?.name} ({artist.albums[0]?.releaseYear})
                </div>
                <div>
                  <span className="font-medium">Latest Album:</span> {artist.albums[artist.albums.length - 1]?.name} ({artist.albums[artist.albums.length - 1]?.releaseYear})
                </div>
                <div>
                  <span className="font-medium">Career Span:</span> {artist.albums[artist.albums.length - 1]?.releaseYear - artist.albums[0]?.releaseYear} years
                </div>
                <div>
                  <span className="font-medium">Average Songs:</span> {Math.round(artist.albums.reduce((total, album) => total + album.songs.length, 0) / artist.albums.length)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show More
              </>
            )}
          </Button>

          {/* Explore Button */}
          <Button
            onClick={handleExploreClick}
            className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white touch-target"
          >
            Explore Discography
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
