"use client";

import Image from "next/image";
import { usePlayerContext } from "@/app/context/player-context";
import type { Beat } from "@/app/types/beat";

export default function PlayableCover({ beat }: { beat: Beat }) {
  const { id, isPlaying, togglePlay } = usePlayerContext();
  const trackIsPlaying = id === beat.id && isPlaying;

  return (
    <button
      className="relative shrink-0 group w-[200px] h-[200px] cursor-pointer rounded-lg"
      onClick={(e) => togglePlay(beat.id, e)}
      aria-label="Toggle play/pause beat"
    >
      <Image
        src={beat.cover}
        alt={beat.name || "Beat cover"}
        width={200}
        height={200}
        className="rounded-lg shadow-sm object-cover w-full h-full"
      />
      <img
        src={trackIsPlaying ? "/pause.svg" : "/play.svg"}
        className="absolute inset-0 m-auto z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        alt="Play Icon"
        width={60}
        height={60}
      />
    </button>
  );
}
