"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy } from "lucide-react";
import { SortMode } from "@/hooks/use-ranking";

interface SortToggleProps {
  sortMode: SortMode;
  onSortModeChange: (mode: SortMode) => void;
  className?: string;
}

export function SortToggle({ sortMode, onSortModeChange, className }: SortToggleProps) {
  const toggleSortMode = () => {
    const newMode = sortMode === 'release-date' ? 'ranking' : 'release-date';
    onSortModeChange(newMode);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleSortMode}
      className={className}
    >
      {sortMode === 'release-date' ? (
        <>
          <Calendar className="w-4 h-4 mr-2" />
          Sort: Release Date
        </>
      ) : (
        <>
          <Trophy className="w-4 h-4 mr-2" />
          Sort: My Ranking
        </>
      )}
    </Button>
  );
}
