import { usePlayerContext } from "@/app/context/player-context";
import Image from "next/image";
import Link from "next/link";
import BEATS from "@/app/data/beats.json";

export default function BeatCard({
  beat,
}: {
  beat: typeof BEATS[0];
}) {

  const { id, setId, isPlaying: globalIsPlaying, setIsPlaying, playerRef } = usePlayerContext();
  const isPlaying = id === beat.id && globalIsPlaying;

  const togglePlay = (e: React.MouseEvent) => {
    if (id === beat.id) {
      setIsPlaying(!globalIsPlaying);
      playerRef?.current?.togglePlay(e);
    } else {
      setId(beat.id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-screen flex items-center justify-between max-w-[95vws] xl:max-w-2xl p-4 bg-white hover:bg-gray-100 group">
      <button
        className="absolute inset-0 z-10 cursor-pointer rounded"
        onClick={togglePlay}
        aria-label="Play beat"
      />

      <div className="relative z-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/final_chapter_600x600.jpg"
          alt="Beat Image"
          width={50}
          height={50}
          className="rounded-lg object-cover w-[50px] h-[50px]"
        />
        <Image
          src={isPlaying ? "/pause.svg" : "/play.svg"}
          className="absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          alt="Play Icon"
          width={30}
          height={30}
        />
      </div>

      <p className="flex flex-col text-gray-600 w-full pl-2 pr-4 text-left">
        <span className="font-medium truncate">{beat.name}</span>
        <span className="text-xs pl-1">{beat.bpm}bpm</span>
      </p>

      <Link
        className="z-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href={`/admin/purchase/${beat.id}`}
      >
        ${beat.price}
      </Link>
    </div>
  );
}
