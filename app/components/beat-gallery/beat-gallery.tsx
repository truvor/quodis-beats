"use client";

import { useRef, useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import BeatCard from "./beat-card";
import BEATS from "@/app/data/beats.json";

function BeatGallery() {
  const [beatId, setBeatId] = useState(0);
  const player = useRef<AudioPlayer>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePlay = (id: number, e: React.MouseEvent) => {
    if (beatId === id) {
      setIsPlaying(!isPlaying);
      player?.current?.togglePlay(e);
    } else {
      setBeatId(id);
      setIsPlaying(true);
      player?.current?.playAudioPromise();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-4">
        {BEATS.map((beat) => (
          <BeatCard key={beat.id} beat={beat} play={togglePlay} isPlaying={beatId === beat.id && isPlaying} />
        ))}
      </div>
      {isMounted && (
        <AudioPlayer
          className="sticky bottom-0 z-20"
          src={BEATS[beatId]?.url}
          showSkipControls
          autoPlayAfterSrcChange
          ref={player}
        />
      )}</>
  );
}

export default BeatGallery;
