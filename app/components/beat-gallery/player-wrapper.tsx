"use client";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import BEATS from "@/app/data/beats.json";
import { usePlayerContext } from "@/app/context/player-context";
import { RefObject, useState, useEffect } from "react";

export default function PlayerWrapper() {
  const { id: beatId, playerRef, setIsPlaying } = usePlayerContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!beatId || !isMounted) return null;

  return (
    <AudioPlayer
      className="sticky bottom-0 z-20"
      src={BEATS[Number(beatId)]?.url}
      showSkipControls
      autoPlay
      autoPlayAfterSrcChange
      ref={playerRef as RefObject<AudioPlayer | null>}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  );
}
