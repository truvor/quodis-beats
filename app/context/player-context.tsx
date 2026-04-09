"use client";

import { createContext, useContext, useState, useRef, ReactNode, RefObject } from "react";
import type AudioPlayer from "react-h5-audio-player";

interface PlayerContextType {
  id: string | null;
  setId: (id: string | null | ((prev: string | null) => string | null)) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean | ((prev: boolean) => boolean)) => void;
  playerRef: RefObject<AudioPlayer | null>;
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

  return (
    <PlayerContext.Provider value={{ id, setId, isPlaying, setIsPlaying, playerRef }}>
      {children}
    </PlayerContext.Provider>
  );
}
