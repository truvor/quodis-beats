import { usePlayerContext } from "@/app/context/player-context";
import Image from "next/image";
import Link from "next/link";
import type { Beat } from "@/app/types/beat";

export default function BeatCard({
  beat,
}: {
  beat: Beat;
}) {

  const { id, isPlaying: globalIsPlaying, togglePlay } = usePlayerContext();
  const isPlaying = id === beat.id && globalIsPlaying;

  return (
    <div className="relative w-screen flex items-center justify-between max-w-[95vw] xl:max-w-2xl p-4 bg-white hover:bg-gray-100 group">
      <button
        className="absolute inset-0 z-10 cursor-pointer rounded"
        onClick={(e) => togglePlay(beat.id, e)}
        aria-label="Play beat"
      />

      <div className="relative z-0 flex items-center justify-center pointer-events-none">
        <Image
          src={beat.cover}
          alt="Beat Image"
          width={50}
          height={50}
          className="rounded-lg object-cover"
        />
        <img
          src={isPlaying ? "/pause.svg" : "/play.svg"}
          className="absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          alt="Play Icon"
          width={30}
          height={30}
        />
      </div>

      <div className="flex flex-col text-gray-600 w-full pl-2 pr-4 text-left">
        <span className="font-medium truncate">{beat.name}</span>
        <span className="text-xs pl-1">{beat.bpm}bpm</span>
      </div>

      <Link
        className="z-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href={`/admin/purchase/${beat.id}`}
      >
        ${beat.price}
      </Link>
    </div>
  );
}
