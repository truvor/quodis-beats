"use client";

import { createContext, useContext, useState, useRef, ReactNode, RefObject } from "react";
import type AudioPlayer from "react-h5-audio-player";

interface PlayerContextType {
  id: string | null;
  setId: (id: string | null | ((prev: string | null) => string | null)) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean | ((prev: boolean) => boolean)) => void;
  playerRef: RefObject<AudioPlayer | null>;
  togglePlay: (beatId: string, e: React.MouseEvent) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playerRef = useRef<AudioPlayer>(null);

  const togglePlay = (beatId: string, e: React.MouseEvent) => {
    if (id === beatId) {
      setIsPlaying((prev) => !prev);
      playerRef?.current?.togglePlay(e);
    } else {
      setId(beatId);
      setIsPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider value={{ id, setId, isPlaying, setIsPlaying, playerRef, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
}
