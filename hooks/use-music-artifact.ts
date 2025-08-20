'use client';

import { useCallback } from 'react';
import { useArtifact } from './use-artifact';

export function useMusicArtifact() {
  const { setArtifact } = useArtifact();

  const openMusicDiscography = useCallback(() => {
    setArtifact({
      documentId: `music-${Date.now()}`,
      title: 'Taylor Swift Discography',
      kind: 'music',
      content: '',
      isVisible: true,
      status: 'idle',
      boundingBox: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
    });
  }, [setArtifact]);

  const closeMusicDiscography = useCallback(() => {
    setArtifact((current) => ({
      ...current,
      isVisible: false,
    }));
  }, [setArtifact]);

  return {
    openMusicDiscography,
    closeMusicDiscography,
  };
}

