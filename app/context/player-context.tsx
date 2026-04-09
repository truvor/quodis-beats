"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface PlayerContextType {
  id: string | null;
  setId: (id: string | null | ((prev: string | null) => string | null)) => void;
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

  return (
    <PlayerContext.Provider value={{ id, setId }}>
      {children}
    </PlayerContext.Provider>
  );
}
