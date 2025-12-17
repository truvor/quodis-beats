"use client";

import Link from "next/link";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function PlayerWrapper() {
  return (
    <>
      <AudioPlayer
        src="https://9ty5evfxd16kbu1f.public.blob.vercel-storage.com/GANG-DNjLaVlzP0QVzWmDeikbOd8LaAfNmB.mp3"
        showSkipControls
      />
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/admin/purchase"
      >
        Buy
      </Link>
    </>
  );
}

export default PlayerWrapper;
