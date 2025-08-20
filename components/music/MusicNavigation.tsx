"use client";

import { Music, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMusicArtifact } from "@/hooks/use-music-artifact";

export function MusicNavigation() {
  const { openMusicDiscography } = useMusicArtifact();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Taylor Swift Discography
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore 12 albums • 163 songs
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Experience Taylor Swift's complete discography with interactive navigation, 
          swipe gestures, and beautiful album artwork.
        </p>
        
        <Button 
          onClick={openMusicDiscography}
          className="w-full flex items-center gap-2"
        >
          <span>Explore Discography</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
