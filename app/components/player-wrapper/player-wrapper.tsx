"use client";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function PlayerWrapper() {
  return (
    <AudioPlayer
      src="https://9ty5evfxd16kbu1f.public.blob.vercel-storage.com/GANG-DNjLaVlzP0QVzWmDeikbOd8LaAfNmB.mp3"
      showSkipControls
    />
  );
}

export default PlayerWrapper;
