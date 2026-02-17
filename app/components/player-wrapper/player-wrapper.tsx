"use client";

import { useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import BeatCard from "./beat-card";

function PlayerWrapper() {
  const [beatUrl, setBeatUrl] = useState(
    "https://9ty5evfxd16kbu1f.public.blob.vercel-storage.com/GANG-DNjLaVlzP0QVzWmDeikbOd8LaAfNmB.mp3",
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useRef(null);

  const togglePlay = (url: string) => {
    setBeatUrl(
      "https://9ty5evfxd16kbu1f.public.blob.vercel-storage.com/GOOD.mp3",
    );
    setIsPlaying(!isPlaying);
    player?.current?.playAudioPromise();
  };

  return (
    <div className="flex flex-col items-center">
      {Array(10)
        .fill(null)
        .map((_item, index) => (
          <BeatCard key={index} play={togglePlay} />
        ))}
      <AudioPlayer
        className="sticky bottom-0"
        src={beatUrl}
        showSkipControls
        ref={player}
      />
    </div>
  );
}

export default PlayerWrapper;
