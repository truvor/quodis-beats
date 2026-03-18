"use client";

import { useRef, useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import BeatCard from "./beat-card";

const trackList = [
  {
    id: 0,
    url: "https://9ty5evfxd16kbu1f.public.blob.vercel-storage.com/GANG-DNjLaVlzP0QVzWmDeikbOd8LaAfNmB.mp3",
  },
  {
    id: 1,
    url: "https://9ty5evfxd16kbu1f.public.blob.vercel-storage.com/GOOD.mp3",
  },
];

function PlayerWrapper() {
  const [beatId, setBeatId] = useState(0);
  const player = useRef<AudioPlayer>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePlay = (id: number, e: React.MouseEvent) => {
    setBeatId(id);
    setIsPlaying(!isPlaying);
    player?.current?.togglePlay(e);
  };

  return (
    <>
      <div className="flex flex-col items-center mb-4">
        {Array(10)
          .fill(null)
          .map((_item, index) => (
            <BeatCard key={index} id={index} play={togglePlay} isPlaying={isPlaying} />
          ))}
      </div>
      {isMounted && (
        <AudioPlayer
          className="sticky bottom-0 z-20"
          src={trackList[beatId].url}
          showSkipControls
          autoPlayAfterSrcChange
          ref={player}
        />
      )}</>
  );
}

export default PlayerWrapper;
