"use client";

import { useRef, useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import BeatCard from "./beat-card";
import BEATS from "@/app/data/beats.json";
import { usePlayerContext } from "@/app/context/player-context";

function BeatGallery() {
  const { id: beatId, setId } = usePlayerContext();

  const player = useRef<AudioPlayer>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePlay = (id: string | null, e: React.MouseEvent) => {
    if (beatId === id) {
      setIsPlaying(!isPlaying);
      player?.current?.togglePlay(e);
    } else {
      setId(id);
      setIsPlaying(_ => true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-4">
        {BEATS.map((beat) => (
          <BeatCard key={beat.id} beat={beat} play={togglePlay} isPlaying={beatId === beat.id && isPlaying} />
        ))}
      </div>
      {beatId && isMounted && (
        <AudioPlayer
          className="sticky bottom-0 z-20"
          src={BEATS[Number(beatId)]?.url}
          showSkipControls
          autoPlay
          autoPlayAfterSrcChange
          ref={player}
        />
      )}</>
  );
}

export default BeatGallery;
