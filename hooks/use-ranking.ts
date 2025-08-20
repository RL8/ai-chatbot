'use client';

import { useState, useEffect } from 'react';

export type SortMode = 'release-date' | 'ranking';

interface RankingState {
  albumRankings: Map<string, number>; // albumId -> rank
  songRankings: Map<string, number>;  // songId -> rank
  isRankingMode: boolean;
  sortMode: SortMode;
}

const STORAGE_KEY = 'taylor-swift-rankings';

export function useRanking() {
  const [rankings, setRankings] = useState<RankingState>({
    albumRankings: new Map(),
    songRankings: new Map(),
    isRankingMode: false,
    sortMode: 'release-date'
  });

  // Load rankings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRankings(prev => ({
          ...prev,
          albumRankings: new Map(parsed.albumRankings || []),
          songRankings: new Map(parsed.songRankings || []),
          sortMode: parsed.sortMode || 'release-date'
        }));
      } catch (error) {
        console.error('Failed to load rankings:', error);
      }
    }
  }, []);

  // Save rankings to localStorage whenever they change
  useEffect(() => {
    const dataToStore = {
      albumRankings: Array.from(rankings.albumRankings.entries()),
      songRankings: Array.from(rankings.songRankings.entries()),
      sortMode: rankings.sortMode
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [rankings.albumRankings, rankings.songRankings, rankings.sortMode]);

  const toggleRankingMode = () => {
    setRankings(prev => ({ ...prev, isRankingMode: !prev.isRankingMode }));
  };

  const rankItem = (itemId: string, type: 'album' | 'song') => {
    setRankings(prev => {
      const rankingsMap = type === 'album' ? prev.albumRankings : prev.songRankings;
      const nextRank = rankingsMap.size + 1;
      const newRankingsMap = new Map(rankingsMap);
      newRankingsMap.set(itemId, nextRank);
      
      return {
        ...prev,
        [type === 'album' ? 'albumRankings' : 'songRankings']: newRankingsMap
      };
    });
  };

  const unrankItem = (itemId: string, type: 'album' | 'song') => {
    setRankings(prev => {
      const rankingsMap = type === 'album' ? prev.albumRankings : prev.songRankings;
      const newRankingsMap = new Map(rankingsMap);
      const removedRank = newRankingsMap.get(itemId);
      newRankingsMap.delete(itemId);
      
      // Reorder remaining rankings
      if (removedRank) {
        const reorderedMap = new Map();
        Array.from(newRankingsMap.entries())
          .sort(([, a], [, b]) => a - b)
          .forEach(([id, rank], index) => {
            reorderedMap.set(id, index + 1);
          });
        newRankingsMap.clear();
        reorderedMap.forEach((rank, id) => newRankingsMap.set(id, rank));
      }
      
      return {
        ...prev,
        [type === 'album' ? 'albumRankings' : 'songRankings']: newRankingsMap
      };
    });
  };

  const toggleRank = (itemId: string, type: 'album' | 'song') => {
    const rankingsMap = type === 'album' ? rankings.albumRankings : rankings.songRankings;
    if (rankingsMap.has(itemId)) {
      unrankItem(itemId, type);
    } else {
      rankItem(itemId, type);
    }
  };

  const getItemRank = (itemId: string, type: 'album' | 'song') => {
    const rankingsMap = type === 'album' ? rankings.albumRankings : rankings.songRankings;
    return rankingsMap.get(itemId);
  };

  const setSortMode = (mode: SortMode) => {
    setRankings(prev => ({ ...prev, sortMode: mode }));
  };

  const clearAllRankings = () => {
    setRankings(prev => ({
      ...prev,
      albumRankings: new Map(),
      songRankings: new Map()
    }));
  };

  return {
    rankings,
    isRankingMode: rankings.isRankingMode,
    sortMode: rankings.sortMode,
    toggleRankingMode,
    rankItem,
    unrankItem,
    toggleRank,
    getItemRank,
    setSortMode,
    clearAllRankings
  };
}
